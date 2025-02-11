import { Schema } from 'mongoose';

export const StoreSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
});
