import { PartialType } from '@nestjs/mapped-types';
import { CreateRailSurveyDto } from './create-rail-survey.dto';

export class UpdateRailSurveyDto extends PartialType(CreateRailSurveyDto) {}
