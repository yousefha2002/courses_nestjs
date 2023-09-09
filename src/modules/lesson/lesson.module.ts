import { Module } from '@nestjs/common';
import { lessonRepositry } from 'src/constants/entityRepositry';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: lessonRepositry,
      useValue: Lesson,
    },
    LessonService
  ],
  exports:[LessonService]
})
export class LessonModule {}
