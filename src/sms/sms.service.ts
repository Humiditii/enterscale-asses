import { HttpException, Injectable } from '@nestjs/common';
import {parse,Parser} from 'csv-parse';
import {Readable} from 'stream';
import { InjectModel } from '@nestjs/mongoose';
import {Contact, ContactDocument} from './entities/contact.entity';
import { Model } from 'mongoose';
import {QueueService} from '../queue/queue.service';
import {QueueType} from '../queue/interface/enum.interface';

@Injectable()
export class SmsService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>,
    private readonly queueService:QueueService
  ){}
  private readonly ISE:string = 'Internal server error!'

  // accepts csv file and parse it
  async uploadFile(file:any):Promise<void>{
    try {
    // create read stream 
    // process 
    // insert
    const contacts:Array<Partial<Contact>> = []

    const model = this.contactModel

    Readable.from(file.buffer)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        // console.log(row);
        const new_contact:Partial<Contact>= {}
        const keys = ['company_id', 'company_name', 'firstname', 'surname', 'address', 'postal_code', 'phone']
        for (const key of keys) {
          new_contact[key]=row[keys.indexOf(key)+1]
        }
        contacts.push(new_contact)
      })
      .on("end", function () {
        model.insertMany(contacts)
        console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });

    } catch (error) {
      throw new HttpException(error?.message ? error.message : this.ISE, error?.status?error.status:500)
    }
  }

  async sendSms():Promise<void>{
    try {
      // group numbers
      // add to sms queue 
      const phones:{phone:string, _id:string}[] = await this.contactModel.find().select('phone')

      const mid_point:number = Math.floor(phones.length/2)

      phones.slice(0,mid_point).map( async ({phone}) => await this.queueService.addJob(QueueType.SMS_A, {phone:phone}) )

      phones.slice(mid_point).map( async ({phone}) => await this.queueService.addJob(QueueType.SMS_B, {phone:phone}) )

    } catch (error) {
      throw new HttpException(error?.message ? error.message : this.ISE, error?.status?error.status:500)
    }
  }

  async clearDb():Promise<void>{
    try {
      await this.contactModel.deleteMany()
    } catch (error) {
      throw new HttpException(error?.message ? error.message : this.ISE, error?.status?error.status:500)
    }
  }
}
