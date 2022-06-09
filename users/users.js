const users = {};

const addUser = (nickname, socketId) => {
  users[nickname] = socketId;
};

const removeUser = (nickname) => {
  if (users.hasOwnProperty(nickname)) {
    delete users[nickname];
  }
};

export { users, addUser, removeUser };
