import { Injectable, Inject } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { lessonRepositry } from 'src/constants/entityRepositry';

@Injectable()
export class LessonService {
    constructor(
        @Inject(lessonRepositry)
        private LessonRepositry: typeof Lesson,
    ) {}

    createLesson(courseId:number,date:Date):Promise<Lesson>
    {
        return this.LessonRepositry.create({date,courseId})
    }
}
