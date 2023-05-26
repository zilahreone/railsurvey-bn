import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UsePipes, ValidationPipe } from '@nestjs/common';
import { RailSurveyService } from './rail-survey.service';
import { CreateRailSurveyDto } from './dto/create-rail-survey.dto';
import { UpdateRailSurveyDto } from './dto/update-rail-survey.dto';
import { UploadFiles } from './upload-files.decorator';
import { RailSurvey } from './entities/rail-survey.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

const validateConfig = {
  whitelist: true, forbidNonWhitelisted: true, stopAtFirstError: false, transform: true
}

@Controller('/api/rail-survey')
export class RailSurveyController {
  constructor(
    private readonly railSurveyService: RailSurveyService,
    private readonly usersService: UsersService
  ) {}


  @Post()
  @UploadFiles()
  @UsePipes(new ValidationPipe(validateConfig))
  async create(@Body() createRailSurveyDto: CreateRailSurveyDto) {
    const user = new User();
    const getUser = await this.usersService.findOne('0acde7d7-27f3-4bbd-9a8c-577c9e771a5e');
    // console.log(createRailSurveyDto.form);
    const railSurvey = new RailSurvey();
    railSurvey.generalSurvey = createRailSurveyDto.form.generalSurvey;
    railSurvey.railDamageSurvey = createRailSurveyDto.form.railDamageSurvey;
    railSurvey.trackDamageSurvey = createRailSurveyDto.form.trackDamageSurvey;
    railSurvey.maintenanceRate = createRailSurveyDto.form.maintenanceRate
    railSurvey.signature = createRailSurveyDto.form.signature
    // railSurvey.createdBy = createRailSurveyDto.form.createdBy

    return this.railSurveyService.create(createRailSurveyDto);
  }

  @Get()
  findAll() {
    return this.railSurveyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.railSurveyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRailSurveyDto: UpdateRailSurveyDto) {
    return this.railSurveyService.update(+id, updateRailSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.railSurveyService.remove(+id);
  }
}
