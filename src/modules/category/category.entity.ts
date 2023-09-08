import { Column, Table, Model, DataType, HasMany ,Scopes} from 'sequelize-typescript';
import { Course } from '../course/course.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
}))
export class Category extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @HasMany(() => Course)
  courses: Course[];
}
