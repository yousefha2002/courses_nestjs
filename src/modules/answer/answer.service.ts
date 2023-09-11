import { Injectable,Inject} from '@nestjs/common';
import { Answer } from './Answer.entity';
import { answerRepositry } from 'src/constants/entityRepositry';

@Injectable()
export class AnswerService {
    constructor(
        @Inject(answerRepositry)
        private AnswerRepository : typeof Answer,
    ){}

    createAnswer(answer:{title:string,questionId:number,isCorrect:boolean}):Promise<Answer>
    {
        return this.AnswerRepository.create({...answer})
    }
}