var amqp = require('amqplib');

amqp.connect('amqp://napsao-nix-dev-busca-rabbitmq-1.dev.vmcommerce.intra').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    
    var ok = ch.assertQueue('hello', {durable: false});
    ch.prefetch(1);
    
    ok = ok.then(function(_qok) {
        return ch.consume('hello', function(msg) {
        console.log(" [x] Received '%s'", msg.content.toString());
        ch.ack(msg);
      }, {noAck: false});
    });
    
    return ok.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).then(null, console.warn);