import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';


export type ContactDocument = Contact & Document;

@Schema()
export class Contact {

    @Prop({required: true})
    company_id:string

    @Prop()
    company_name:string

    @Prop()
    firstname:string

    @Prop()
    surname:string

    @Prop()
    address:string

    @Prop()
    postal_code:string

    @Prop()
    phone:string

}

export const ContactSchema = SchemaFactory.createForClass(Contact);