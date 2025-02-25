import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './schema/pet.schema';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<PetDocument>) {
  }

  async createPet(pet: Pet): Promise<Pet | null> {
    const data = new this.petModel(pet);
    return data.save();
  }
  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }
  async findOne(id: string): Promise<Pet | null> {
    return this.petModel.findById(id).exec();
  }
  async update(id: string, pet: Pet): Promise<Pet | null> {
    return this.petModel.findByIdAndUpdate(id, pet, { new: true }).exec();
  }
  async delete(id: string): Promise<Pet | null> {
    return this.petModel.findByIdAndDelete(id).exec();
  }
}
