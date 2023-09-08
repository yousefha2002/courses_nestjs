import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Answer } from '../answer/answer.entity';
import { StudentQuiz } from '../studentQuiz/studentQuiz.entity';

@Table
export class SelectedAnswer extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Answer)
    @Column({ type: DataType.INTEGER })
    answerId: number;

    @BelongsTo(() => Answer)
    question: Answer;

    @ForeignKey(() => StudentQuiz)
    @Column({ type: DataType.INTEGER })
    submissiveQuizId: number;

    @BelongsTo(() => StudentQuiz)
    submissiveQuiz: StudentQuiz;
}