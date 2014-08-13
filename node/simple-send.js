
var amqp = require('amqplib');


amqp.connect('amqp://localhost').then(function(conn) {
  conn.createChannel().then(function(ch) {
    var q = 'hello';
    var msg = 'Hello World!';

    var ok = ch.assertQueue(q, {durable: false});
    
    return ok.then(function(_qok) {
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  })
  
});