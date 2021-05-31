import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let controller: RegisterController;
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    service = module.get<RegisterService>(RegisterService);
  });

  it('should return something', async () => {
    const user = { name: 'Banana', email: 'banana.com' };
    jest.spyOn(service, 'register').mockImplementation(() => user);
    expect(await controller.register(user)).toBe(user);
  });
});
