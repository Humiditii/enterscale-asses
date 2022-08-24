import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import {QueueType} from './interface/enum.interface';


@Injectable()
export class QueueService {
    constructor(
        @InjectQueue(QueueType.SMS_A) private sms_a_Queue:Queue,
        @InjectQueue(QueueType.SMS_B) private sms_b_Queue:Queue,
        ){}

    async addJob(queue:QueueType, payload:{}):Promise<void>{
        switch (queue) {
            case QueueType.SMS_A: await this.sms_a_Queue.add(payload,{removeOnComplete:true, attempts:3});break        
            case QueueType.SMS_B: await this.sms_b_Queue.add(payload,{removeOnComplete:true, attempts:3});break
        }
    }
}