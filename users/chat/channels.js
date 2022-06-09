const channels = [
  {
    id: 1,
    name: "general",
    users: [],
  },
  {
    id: 2,
    name: "test 1",
    users: [],
  },
  {
    id: 3,
    name: "test 2",
    users: [],
  },
];

const addUserToChannel = (channel, nickname) => {
  channels
    .filter((c) => c.name === channel)
    .map((c) => {
      c.users.push(nickname);

      return c;
    });
};

export { channels, addUserToChannel };
