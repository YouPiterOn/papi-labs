import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost:5672';
const QUEUE_NAME = 'book_queue';

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {
      durable: true,
    });

    console.log(`Waiting for messages in ${QUEUE_NAME}`);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log(`Received: ${content}`);

          channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  } catch (err) {
    console.error('Failed to start consumer:', err);
  }
}

startConsumer();
