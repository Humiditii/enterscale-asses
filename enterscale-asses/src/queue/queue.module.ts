import { Module } from "@nestjs/common";
import {BullModule} from '@nestjs/bull';
import {QueueService} from './queue.service';


@Module({
    imports:[BullModule.registerQueue({name:'sms_a'}, {name:'sms_b'})],
    providers:[QueueService],
    exports:[QueueService]
})
export class QueueModule {}