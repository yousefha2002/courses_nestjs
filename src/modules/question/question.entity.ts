import { Column, Table, Model, DataType, ForeignKey,Scopes, BelongsTo, HasMany } from 'sequelize-typescript';
import { Quiz } from '../quiz/quiz.entity';
import { Answer } from '../answer/answer.entity';

@Table
@Scopes(() => ({
        withoutTimeStamps: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        },
    }))
export class Question extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    title: string;

    @ForeignKey(() => Quiz)
    @Column({ type: DataType.INTEGER })
    quziId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @HasMany(() => Answer)
    answers: Answer[];
}
