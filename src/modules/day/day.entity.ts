import {
  Column,
  Table,
  Model,
  DataType,
  BelongsToMany,
  Scopes
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { CourseDay } from '../courseDay/courseDay.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class Day extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  updatedAt: Date;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @BelongsToMany(() => Course, () => CourseDay)
  courses: Course[];
}
