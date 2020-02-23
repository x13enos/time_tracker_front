import { DateTime } from 'luxon'
import mutations from '@/store/mutations'

describe('mutation: reinitTasksObject', () => {
  const state = {
    tasks: {
      '1572123600': {
        '1': {
          id: 1,
          project: 2,
          description: 'text',
          spentTime: 1.5,
          timeStart: 'time'
        }
      }
    }
  }

  const day = DateTime.local(2019, 10, 27)

  const timestamp = (i) => {
    return day.startOf("week").plus({ "days": i }).ts / 1000
  }


  it('should rebuild object for list of tasks base on passed date', () => {
    mutations.reinitTasksObject(state, day)
    expect(state.tasks).to.eql({
      [timestamp(0)]: {},
      [timestamp(1)]: {},
      [timestamp(2)]: {},
      [timestamp(3)]: {},
      [timestamp(4)]: {},
      [timestamp(5)]: {},
      [timestamp(6)]: {}
    })
  })
})
