import mutations from '@/store/mutations'

describe('updateTask', () => {
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

  const data = {
    id: 1,
    project_id: 14,
    description: 'another text',
    spent_time: 2.5,
    time_start: 'day',
    assigned_date: '1572123600'
  }

  it('should add updated task to the list', () => {
    mutations.updateTask(state, data)
    expect(state.tasks['1572123600']['1']).to.eql(
      {
        id: 1,
        project: 14,
        description: 'another text',
        spentTime: 2.5,
        timeStart: 'day',
        assignedDate: '1572123600'
      }
    )
  })
})
