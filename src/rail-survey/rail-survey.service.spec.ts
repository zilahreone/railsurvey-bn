import { Test, TestingModule } from '@nestjs/testing';
import { RailSurveyService } from './rail-survey.service';

describe('RailSurveyService', () => {
  let service: RailSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RailSurveyService],
    }).compile();

    service = module.get<RailSurveyService>(RailSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
