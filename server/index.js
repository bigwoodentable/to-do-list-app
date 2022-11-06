const server = require('./server');
const log = require('./logger');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  log('Server listening on port', PORT);
});
