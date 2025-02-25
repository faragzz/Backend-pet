import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: [String], default: [] })
  photos: string[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);
