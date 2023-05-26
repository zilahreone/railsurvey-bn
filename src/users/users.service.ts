import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(users: User): Promise<User> {
    return await this.userRepository.save(users);
  }

  async findAll(offset: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: offset,
      take: 20,
      // relations: {
      //   rail: true
      // }
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id},
      relations: {
        survey: true
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: id });
  }
}
