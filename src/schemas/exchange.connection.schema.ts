import { Exchange } from './exchange.schema';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {User} from './user.schema';

export type ExchangeConnectionDocument = ExchangeConnection & mongoose.Document;


@Schema()
export class ExchangeConnection {
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Exchange'})
    exchange: Exchange;

    @Prop()
    apiKey : string;

    @Prop()
    secretKey : string;


}

export const ExchangeConnectionSchema = SchemaFactory.createForClass(ExchangeConnection);
