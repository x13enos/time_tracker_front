import mutations from '@/store/mutations'

describe("mutation: updateTasks", () => {
  const state = {
    tasks: []
  }

  const data = [{
    id: 1,
    project_id: 2,
    description: 'text',
    spent_time: 1.5,
    time_start: 'time'
  }]

  it('should update list of tasks', () => {
    mutations.updateTasks(state, data)
    expect(state.tasks).to.eql([{
      id: 1,
      project: 2,
      description: 'text',
      spentTime: 1.5,
      timeStart: 'time'
    }])
  })
})
