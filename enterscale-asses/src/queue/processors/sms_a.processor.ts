import { Job, DoneCallback } from 'bull';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import { Logger } from '@nestjs/common';


const httpService = new HttpService()

const logger = new Logger(SmsA.name)

export default async function SmsA(job:Job<any>){

    const endpoint:string = 'some sort http server';
    const message:string = 'sms for A group';

    logger.log(job.data)
    // await httpService.axiosRef.post(endpoint,{message,receiver:job.data}) // note this won't work because, therre is no valid endpoint to make an http request
   
}