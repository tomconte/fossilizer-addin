var httpProxy = require('http-proxy');
var fs = require('fs');

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 8545
  },
  ssl: {
    key: fs.readFileSync('node_modules/gulp-webserver/ssl/dev-key.pem', 'utf8'),
    cert: fs.readFileSync('node_modules/gulp-webserver/ssl/dev-cert.pem', 'utf8')
  }
}).listen(8546);
