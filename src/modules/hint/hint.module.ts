import { Module } from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { HintController } from './hint.controller';
import { HintService } from './hint.service';
import { CourseModule } from '../course/course.module';
import { StudentCourseModule } from '../studentCourse/studentCourse.module';

@Module({
  controllers: [HintController],
  providers: [
    {
      provide: hintRepositry,
      useValue: Hint,
    },
    HintService
  ],
  imports:[CourseModule,StudentCourseModule]
})
export class HintModule {}
