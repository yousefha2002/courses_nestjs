import { Module } from '@nestjs/common';
import { selectedAnswerRepositry } from 'src/constants/entityRepositry';
import { SelectedAnswer } from './slecectedAnswer.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: selectedAnswerRepositry,
      useValue: SelectedAnswer,
    },
  ],
})
export class SelectedAnswerModule {}
