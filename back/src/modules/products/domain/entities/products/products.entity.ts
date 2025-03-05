import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {v4 as uuidv4} from "uuid"

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    // @Prop({ type: String, default: () => uuidv4(), unique: true })
    // id: string;
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: [Types.ObjectId], ref: 'Category', required: true })
  categoryIds: Types.ObjectId[];

  @Prop({ type: String, required: false })
  imageUrl?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
