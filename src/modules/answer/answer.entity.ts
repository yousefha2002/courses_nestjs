import { Column, Table, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Question } from '../question/question.entity';
import { SelectedAnswer } from '../slecectedAnswer/slecectedAnswer.entity';

@Table
export class Answer extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    title: string;

    @ForeignKey(() => Question)
    @Column({ type: DataType.INTEGER })
    questionId: number;

    @BelongsTo(() => Question)
    question: Question;

    @Column({defaultValue:false})
    isCorrect:boolean

    @HasMany(() => SelectedAnswer)
    selectedAnswers: SelectedAnswer[];
}
