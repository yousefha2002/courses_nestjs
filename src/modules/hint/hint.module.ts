import { Module } from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { HintController } from './hint.controller';
import { HintService } from './hint.service';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [HintController],
  providers: [
    {
      provide: hintRepositry,
      useValue: Hint,
    },
    HintService
  ],
  imports:[CourseModule]
})
export class HintModule {}
