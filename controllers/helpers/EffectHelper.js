export default class EffectHelper {
  static deleteEffectMods = async (db, id) => {
    let query = `DELETE FROM effect_ac WHERE effect_id = ${id};`;
    query += `DELETE FROM effect_action WHERE effect_id = ${id};`;
    await db.query(query);
  };

  static deleteOldEffect = async (
    db,
    QueryTypes,
    specialType,
    specialId,
    Effect,
    effects
  ) => {
    //CLEANUP: DELETE ALL EFFECTS FOR THIS ability_id THAT ARE NOT IN THE CURRENT LIST
    //find all effect_id(s) for this ability_id in ability_effect table
    let query = `SELECT effect_id FROM ${specialType}_effect WHERE ${specialType}_id = ${specialId}`;
    const specialEffectResult = await db.query(query, {
      type: QueryTypes.SELECT,
    });
    let effect_ids_to_delete_arr = [];

    specialEffectResult.map((specialEffect) => {
      if (
        !effects.find((effect) => effect.effect_id === specialEffect.effect_id)
      ) {
        effect_ids_to_delete_arr.push(specialEffect.effect_id);
        //delete effect mods
        this.deleteEffectMods(db, specialEffect.effect_id);
      }
    });
    if (effect_ids_to_delete_arr.length > 0)
      Effect.destroy({ where: { effect_id: effect_ids_to_delete_arr } });
  };

  static saveEffect = async (db, specialType, specialId, Effect, effect) => {
    try {
      const [record, created] = await Effect.upsert(
        effect, // Record to upsert
        { returning: true } // Return upserted record
      );
      const effectId = created ? record.null : effect.effect_id;

      let query = "";

      //add record into special_effect relationship table
      query = `INSERT INTO ${specialType}_effect (${specialType}_id, effect_id) VALUES (${specialId}, ${effectId})`;
      await db.query(query);

      //delete all effects mods
      await this.deleteEffectMods(db, effectId);

      query = "";
      effect.effect_acs.map(async (effect_ac, i) => {
        query += `INSERT INTO effect_ac (effect_ac_index, effect_id, value) 
      VALUES (${i}, ${effectId}, ${effect_ac.value ?? 0});`;
      });

      effect.effect_actions.map(async (effect_action, i) => {
        query += `INSERT INTO effect_action (effect_action_index, effect_id, action_penalty_const_value,action_bonus_const_value) 
      VALUES (${i}, ${effectId}, ${
          effect_action.action_penalty_const_value ?? 0
        }, ${effect_action.action_bonus_const_value ?? 0});`;
      });

      await db.query(query);
    } catch (error) {
      console.log(error.message);
    }
  };
}
