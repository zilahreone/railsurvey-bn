import { Injectable } from '@nestjs/common';
import { CreateRailSurveyDto } from './dto/create-rail-survey.dto';
import { UpdateRailSurveyDto } from './dto/update-rail-survey.dto';

@Injectable()
export class RailSurveyService {
  create(createRailSurveyDto: CreateRailSurveyDto) {
    return 'This action adds a new railSurvey';
  }

  findAll() {
    return `This action returns all railSurvey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} railSurvey`;
  }

  update(id: number, updateRailSurveyDto: UpdateRailSurveyDto) {
    return `This action updates a #${id} railSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} railSurvey`;
  }
}
