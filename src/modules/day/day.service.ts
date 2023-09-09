import { Injectable, Inject } from '@nestjs/common';
import { dayRepositry } from 'src/constants/entityRepositry';
import { Day } from './day.entity';

@Injectable()
export class DayService {
    constructor(
        @Inject(dayRepositry)
        private DayRepositry: typeof Day,
    ) {}

    getAllDays():Promise<Day[]>
    {
        return this.DayRepositry.scope('withoutTimeStamps').findAll()
    }
}
