import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    RabbitMQModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
