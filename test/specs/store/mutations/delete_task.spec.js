import mutations from '@/store/mutations'

describe('deleteTask', () => {
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

  it('should delete task from list', () => {
    mutations.deleteTask(state, { assignedDate: '1572123600', id: '1' })
    expect(state.tasks['1572123600']['1']).to.be.undefined
  })
})
