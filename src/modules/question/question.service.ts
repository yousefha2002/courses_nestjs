import { Injectable, Inject,BadRequestException } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuestionBasic } from './dto';
import { QuizService } from '../quiz/quiz.service';
import { AnswerService } from '../answer/answer.service';
import { Sequelize } from 'sequelize';
import { Answer } from '../answer/answer.entity';
import { StudentService } from '../student/studend.service';

@Injectable()
export class QuestionService {
    constructor(
        @Inject(questionRepositry)
        private QuestionRepositry: typeof Question,

        private readonly quizService : QuizService,
        private readonly answerService : AnswerService,
        private readonly studentService : StudentService,

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

    async getQuizQuestions(quizId:number,userId:number)
    {
        const [quiz,student] = await Promise.all([
            this.quizService.getQuiz(quizId,userId),
            this.studentService.findStudent(userId)
        ])
        const hasTakenQuiz = await quiz.$has('student', student);
        if (hasTakenQuiz) {
            throw new BadRequestException('Student has already taken this quiz');
        }
        const questions = await this.QuestionRepositry.scope('withoutTimeStamps').findAll({
            where:{quziId:quizId},
            order: this.sequelize.random() ,
            limit:quiz.numberOfQuistion,
            include:[
                {
                    model:Answer.scope('withoutTimeStamps'),
                    order: this.sequelize.random()
                }
            ]
        })
        await quiz.$add('student',student);
        return questions;
    }
}