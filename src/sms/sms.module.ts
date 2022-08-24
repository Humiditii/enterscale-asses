import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Contact,ContactSchema} from './entities/contact.entity';
import {QueueModule} from '../queue/queue.module';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
  imports: [
    MongooseModule.forFeature([{name:Contact.name, schema:ContactSchema}]),
    QueueModule
  ]
})
export class SmsModule {}
