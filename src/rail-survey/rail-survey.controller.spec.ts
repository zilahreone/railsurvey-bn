import { Test, TestingModule } from '@nestjs/testing';
import { RailSurveyController } from './rail-survey.controller';
import { RailSurveyService } from './rail-survey.service';

describe('RailSurveyController', () => {
  let controller: RailSurveyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RailSurveyController],
      providers: [RailSurveyService],
    }).compile();

    controller = module.get<RailSurveyController>(RailSurveyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
