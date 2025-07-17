import { Injectable } from "@nestjs/common";

@Injectable()
export class DeadLetterQueue {
  post(message: any) {
    console.log(`Dead Letter: ${JSON.stringify(message)}`)
  }
}