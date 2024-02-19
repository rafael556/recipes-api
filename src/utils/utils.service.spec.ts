import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import * as uuidValidate from 'uuid-validate';

describe('Utils Service', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid uuid', () => {
    const uuid = service.generateUUID();
    expect(uuidValidate(uuid, 4)).toBe(true);
  });
});
