import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type PostDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  user: string; //to do update

  @Prop({ required: true })
  post: string; //to do update

  @Prop({ required: true })
  discretion: string;

  @Prop({ type: Number, required: true })
  lat: number;

  @Prop({ type: Number, required: true })
  lng: number;

  @Prop({ required: true })
  price: string;
}

export const PostSchema = SchemaFactory.createForClass(Pet);
