import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { Question } from '../question/question.entity';
import { Student } from '../student/student.entity';
import { StudentQuiz } from '../studentQuiz/studentQuiz.entity';

@Table
export class Quiz extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  numberOfQuistion: number;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => Student, () => StudentQuiz)
  students: Student[];
}