import { Injectable, Inject } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuestionBasic } from './dto';
import { QuizService } from '../quiz/quiz.service';

@Injectable()
export class QuestionService {
    constructor(
        @Inject(questionRepositry)
        private QuestionRepositry: typeof Question,

        private quizService : QuizService
    ) {}

    async createQuestion(dto:QuestionBasic):Promise<{message:string}>
    {
        await this.quizService.checkQuiz(dto.quziId)
        await this.QuestionRepositry.create({...dto})
        return {message:"question has been created"}
    }   
}