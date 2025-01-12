module.exports = {
  clients: [],
  events: [],
  addClient(client) {
    this.clients.push(client);
    const response = client.response;
    const headers = {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
    };
    response.writeHead(200, headers);
    const facts = this.events.filter(
        (event) => event.matchId === client.matchId,
    );
    const data = `data: ${JSON.stringify(facts)}\n\n`;

    response.write(data);
  },
  removeClient(client) {
    const index = this.clients.indexOf(client);
    if (index > -1) {
      this.clients.splice(index, 1);
    }
  },
  notify(event) {
    this.events.push(event);
    this.clients.forEach(
        (client) =>
          client.matchId === event.matchId &&
        client.response.write(`data: ${JSON.stringify(event)}\n\n`),
    );
  },
};
