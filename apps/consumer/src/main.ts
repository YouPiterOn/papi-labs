import amqp from 'amqplib';
import { createClient } from 'graphql-ws';

const RABBITMQ_URL = 'amqp://localhost:5672';
const QUEUE_NAME = 'book_queue';
const GRAPHQL_WS_URL = 'ws://localhost:3000/graphql';

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

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
      { noAck: false }
    );
  } catch (err) {
    console.error('Failed to start RabbitMQ Consumer:', err);
  }

  try {
    const client = createClient({
      url: GRAPHQL_WS_URL,
      webSocketImpl: WebSocket,
    });

    client.subscribe(
      {
        query: `
          subscription {
            authorCreated {
              id
              name
              country {
                id
                name
              }
            }
          }
        `,
      },
      {
        next: (data) => console.log('Author created:', JSON.stringify(data)),
        error: (err) => console.error('Subscription error:', err),
        complete: () => console.log('Subscription complete'),
      }
    );
  } catch(err) {
    console.error('Failed to start GraphQL Subscription:', err);
  }
}

startConsumer();
