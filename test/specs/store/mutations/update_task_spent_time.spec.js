import mutations from '@/store/mutations'

describe('mutation: updateTaskSpentTime', () => {
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

  it("should update tasks's spent time", () => {
    mutations.updateTaskSpentTime(state, { assignedDate: '1572123600', spentTime: 2.5, id: 1 })
    expect(state.tasks['1572123600']['1']).to.eql(
      {
        id: 1,
        project: 2,
        description: 'text',
        spentTime: 2.5,
        timeStart: 'time'
      }
    )
  })
})
