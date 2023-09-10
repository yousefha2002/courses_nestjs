import { IsNotEmpty, Min } from "class-validator";

export class QuizBasic { 
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    @Min(1)
    duration:number

    @IsNotEmpty()
    @Min(1)
    numberOfQuistion:number

    @IsNotEmpty()
    courseId:number
}