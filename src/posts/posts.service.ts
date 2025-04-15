import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {
  }

  async create(post: CreatePostDto): Promise<Post> {
    const data = new this.postModel(post);
    return data.save();
  }

  async delete(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id).exec();
  }

  async getPostsNearby(lat: number, lng: number, radius: number): Promise<Post[]> {
    const posts = await this.postModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: radius,
        },
      },
    }).exec();

    return posts;
  }
}
