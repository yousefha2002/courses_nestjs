import { Module } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CategoryModule } from '../category/category.module';
import { DayModule } from '../day/day.module';
import { LessonModule } from '../lesson/lesson.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: courseRepositry,
      useValue: Course,
    },
    CourseService
  ],
  imports:[CategoryModule,DayModule,LessonModule,DatabaseModule]
})
export class CourseModule {}
