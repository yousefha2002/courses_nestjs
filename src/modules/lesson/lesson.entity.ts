import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Scopes
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class Lesson extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  link: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;
}
