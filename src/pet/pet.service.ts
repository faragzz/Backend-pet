import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './schema/pet.schema';
import { CreatePetDto } from './dto/create';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<PetDocument>) {
  }

  async create(pet: CreatePetDto, file: Express.Multer.File): Promise<Pet & {
    message: string,
    filePath: string
  } | null> {
    const data = new this.petModel(pet);
    await data.save();
    return {
      ...data.toObject(),
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
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
