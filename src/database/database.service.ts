import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Answer } from 'src/modules/answer/answer.entity';
import { Category } from 'src/modules/category/category.entity';
import { Course } from 'src/modules/course/course.entity';
import { CourseDay } from 'src/modules/courseDay/courseDay.entity';
import { Day } from 'src/modules/day/day.entity';
import { Hint } from 'src/modules/hint/hint.entity';
import { Lesson } from 'src/modules/lesson/lesson.entity';
import { Media } from 'src/modules/media/media.entity';
import { Question } from 'src/modules/question/question.entity';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { SelectedAnswer } from 'src/modules/slecectedAnswer/slecectedAnswer.entity';
import { Student } from 'src/modules/student/student.entity';
import { StudentCourse } from 'src/modules/studentCourse/studentCourseentity';
import { StudentQuiz } from 'src/modules/studentQuiz/studentQuiz.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '2838293yo',
        database: 'courses',
      });
      sequelize.addModels([
        Admin,
        Student,
        Category,
        Course,
        Day,
        CourseDay,
        Lesson,
        Media,
        Hint,
        StudentCourse,
        Quiz,
        Question,
        Answer,
        StudentQuiz,
        SelectedAnswer
      ]);
      await sequelize.sync({alter:true});
      return sequelize;
    },
  },
];
