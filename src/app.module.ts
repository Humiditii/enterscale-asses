import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsModule } from './sms/sms.module';
import {QueueType} from './queue/interface/enum.interface';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    SmsModule, 
    MongooseModule.forRoot(process.env.ORMONGO_URL || 'mongodb://localhost:27017/enterscale-api'),
    BullModule.registerQueue(
      {
        name:QueueType.SMS_A,
        processors:[join(__dirname,'queue','processors', 'sms_a.processor.js')]
      },
      {
        name:QueueType.SMS_B,
        processors:[join(__dirname,'queue','processors', 'sms_b.processor.js')]
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
