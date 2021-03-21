
import mutations from '@/store/mutations'

describe('updateCurrentTask', () => {
  const state = {
    currentTask: null
  }

  const data = {
    id: 1,
    project_id: 14,
    description: 'another text',
    spent_time: 2.5,
    time_start: 'day',
    assigned_date: '1572123600',
    tag_ids: [1]
  }

  it('should update data for current task', () => {
    mutations.updateCurrentTask(state, data)
    expect(state.currentTask).to.eql({
      id: 1,
      project: 14,
      description: 'another text',
      spentTime: 2.5,
      timeStart: 'day',
      assignedDate: '1572123600',
      tagIds: [1]
    })
  })
})
