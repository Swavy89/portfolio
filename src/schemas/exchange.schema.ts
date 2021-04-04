import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';


export type ExchangeDocument = Exchange & Document;


@Schema()
export class Exchange {
    
    @Prop()
    name: string;

    @Prop()
    apiUrl: string;

    @Prop()
    logoUrl: string;

}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
