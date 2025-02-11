import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.interface';

@Injectable()
export class StoreService {
  constructor(@InjectModel('Store') private readonly storeModel: Model<Store>) {}

  async create(createCatDto: any): Promise<Store> {
    const createdCat = new this.storeModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }
}
