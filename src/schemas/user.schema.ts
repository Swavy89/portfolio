import { ExchangeConnection } from './exchange.connection.schema';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
// import {Document} from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;


@Schema()
export class User {
    
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExchangeConnection' }] })
    exchangeConnections: ExchangeConnection[];

}

export const UserSchema = SchemaFactory.createForClass(User);


// Decorators são utilizados pelo Schemafactory para extrapolar um schema através da class com recurso a reflection
// Podemos definir schema manualmente como fazemos no nodejs
