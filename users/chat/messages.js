const messages = [];

const addMessage = (data) => {
  messages.push(data);
  //only store 20 messages per channel
  //THIS IS NOT WORKING
  if (
    messages.filter((message) => message.channel === data.channel).length > 20
  ) {
    const oldestInChannel = messages
      .filter((message) => message.channel === data.channel)
      .reduce((r, o) => (o.date < r.date ? o : r));
    messages.splice(
      messages.findIndex(
        (message) =>
          message.channel === data.channel &&
          message.time === oldestInChannel.time
      ),
      1
    );
  }
};

const getChannelMessages = (channel) =>
  messages.filter((message) => message.channel === channel);

export { addMessage, getChannelMessages };
