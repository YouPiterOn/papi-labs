import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [BookModule, AuthorModule, RabbitMQModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
