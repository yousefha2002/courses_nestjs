import { Injectable, Inject } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuestionBasic } from './dto';
import { QuizService } from '../quiz/quiz.service';
import { AnswerService } from '../answer/answer.service';
import { Sequelize } from 'sequelize';

@Injectable()
export class QuestionService {
    constructor(
        @Inject(questionRepositry)
        private QuestionRepositry: typeof Question,

        private readonly quizService : QuizService,
        private readonly answerService : AnswerService,

        @Inject('SEQUELIZE')
        private sequelize : Sequelize
    ) {}

    async createQuestion(dto:QuestionBasic):Promise<{message:string}>
    {
        const {answers} = dto
        await this.quizService.checkQuiz(dto.quziId)
        const transaction = await this.sequelize.transaction()
        try{
            const question = await this.QuestionRepositry.create({...dto}, { transaction })
            Promise.all(
                answers.map(answer=>
                    {
                        return this.answerService.createAnswer({...answer,questionId:question.id})
                    })
            )
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();    
            throw error;
        }
        return {message:"question has been created"}
    }   
}