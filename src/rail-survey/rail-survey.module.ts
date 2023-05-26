import { Module } from '@nestjs/common';
import { RailSurveyService } from './rail-survey.service';
import { RailSurveyController } from './rail-survey.controller';

@Module({
  controllers: [RailSurveyController],
  providers: [RailSurveyService]
})
export class RailSurveyModule {}
