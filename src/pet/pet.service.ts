import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './schema/pet.schema';
import { CreatePetDto } from './dto/create.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<PetDocument>) {
  }

  async create(pet: CreatePetDto): Promise<Pet | null> {
    const data = new this.petModel(pet);
    return data.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: Pet[],
    page: number,
    total: number,
    totalPages: number
  }> {
    const skip = (page - 1) * limit;
    const total = await this.petModel.countDocuments();
    const data = await this.petModel.find().skip(skip).limit(limit).exec();
    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Pet | null> {
    return this.petModel.findById(id).exec();
  }

  async update(id: string, pet: CreatePetDto): Promise<Pet | null> {
    return this.petModel.findByIdAndUpdate(id, pet, { new: true }).exec();
  }

  async delete(id: string): Promise<Pet | null> {
    const pet = await this.petModel.findById(id);
    if (!pet) return null;

    const filePath = path.join(__dirname, '../../uploads', path.basename(pet.photos[0]));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.petModel.findByIdAndDelete(id).exec();
  }
}
