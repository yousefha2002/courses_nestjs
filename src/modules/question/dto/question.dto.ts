import { ArrayMaxSize, ArrayMinSize, IsNotEmpty } from "class-validator";

export class QuestionBasic {
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    quziId:number

    @IsNotEmpty()
    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    answers: {
        isCorrect: boolean;
        title: string;
    }[];
}