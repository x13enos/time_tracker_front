import storeGetters from '@/store/getters'
import $appMethods from "@/services/global_methods";
import { DateTime } from 'luxon';

describe('totalTimeOfWeeklyTasks', () => {
  const getters = Object.assign({}, storeGetters)

  it('should return total time for tasks', () => {
    const state = { tasks: {
       [$appMethods.systemFormatDate(DateTime.local(2019, 10, 27))]: {
         356: { spentTime: 1.25 },
         555: { spentTime: 0.75 }
       },
       [$appMethods.systemFormatDate(DateTime.local(2019, 10, 28))]: {
         56: { spentTime: 2.15 },
         4555: { spentTime: 3.75 }
       }
    } }
    expect(getters.totalTimeOfWeeklyTasks(state)).to.eq(7.9)
  })
});
