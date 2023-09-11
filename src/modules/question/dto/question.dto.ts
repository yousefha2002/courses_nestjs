import { IsNotEmpty } from "class-validator";

export class QuestionBasic {
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    quziId:number
}