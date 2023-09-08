import {Column,Table,Model,ForeignKey,BelongsTo, HasMany,} from 'sequelize-typescript';
import { Student } from '../student/student.entity';
import { Quiz } from '../quiz/quiz.entity';
import { SelectedAnswer } from '../slecectedAnswer/slecectedAnswer.entity';

@Table
export class StudentQuiz extends Model {
    @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Quiz)
    @Column
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @ForeignKey(() => Student)
    @Column
    studentId: number;

    @BelongsTo(() => Student)
    student: Student;

    @HasMany(() => SelectedAnswer)
    selectedAnswers: SelectedAnswer[];
}