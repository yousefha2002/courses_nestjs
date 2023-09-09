import { Module } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: courseRepositry,
      useValue: Course,
    },
    CourseService
  ],
  imports:[CategoryModule]
})
export class CourseModule {}
