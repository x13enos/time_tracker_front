import storeGetters from '@/store/getters'
import $appMethods from "@/services/global_methods";
import { DateTime } from 'luxon';

describe('totalTimeOfDailyTasks', () => {
  const getters = Object.assign({}, storeGetters)

  it('should return total time for tasks which were filtered by passed day', () => {
    const state = { tasks: {
       [$appMethods.systemFormatDate(DateTime.local(2019, 10, 27))]: [
         { spentTime: 1.25 },
         { spentTime: 0.75 }
       ]
    } }
    const getter = getters.totalTimeOfDailyTasks(state)

    expect(getter(DateTime.local(2019, 10, 27))).to.eq(2)
  })

  it('should return 0.0 if list of tasks are empty', () => {
    const state = { tasks: {
       [$appMethods.systemFormatDate(DateTime.local(2019, 10, 27))]: []
    } }
    const getter = getters.totalTimeOfDailyTasks(state)

    expect(getter(DateTime.local(2019, 10, 27))).to.eq(0)  })
});
