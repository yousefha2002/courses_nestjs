import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { quizRepositry } from 'src/constants/entityRepositry';
import { Quiz } from './quiz.entity';
import { QuizBasic } from './dto';
import { CourseService } from '../course/course.service';

@Injectable()
export class QuizService {
    constructor(
        @Inject(quizRepositry)
        private QuizRepositry: typeof Quiz,

        private courseService : CourseService
    ) {}

    async createQuiz(dto:QuizBasic):Promise<{message:string}>
    {
        await this.courseService.checkCourse(dto.courseId)
        await this.QuizRepositry.create({...dto})
        return {message:"quiz has been created"}
    }

    async checkQuiz(id:number)
    {
        const quiz = await this.QuizRepositry.findByPk(id)
        if(!quiz)
        {
            throw new BadRequestException('quiz is not found')
        }
        return quiz ;
    }
}
