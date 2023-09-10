import { Injectable, Inject } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { lessonRepositry } from 'src/constants/entityRepositry';
import { LessonBasic } from './dto';

@Injectable()
export class LessonService {
    constructor(
        @Inject(lessonRepositry)
        private LessonRepositry: typeof Lesson,
    ) {}

    createLesson(courseId:number,date:Date,transaction:any):Promise<Lesson>
    {
        return this.LessonRepositry.create({date,courseId},{transaction})
    }

    async updateLesson(dto:LessonBasic):Promise<{message:string}>
    {
        const {title,id,link} = dto
        await this.LessonRepositry.update({title,link},{where:{id}})
        return {message:"lesson has been updated"}
    }
}
