import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { SmsService } from './sms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {Response} from 'express'; 

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('contact'))
  async uploadData(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ):Promise<Response>{
      await this.smsService.uploadFile(file)
      return res.status(200).json({
        message: 'File uploaded!',
        statusCode:200
      })
  }

  @Get('send')
  async sendSms(
    @Res() res: Response
  ){
    await this.smsService.sendSms()
    return res.status(200).json({ok:200})
  }
}
