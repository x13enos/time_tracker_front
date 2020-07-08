import storeMutations from '@/store/mutations'
import $appMethods from "@/services/global_methods";

describe('mutation: updateTasks', () => {
  const state = {
    tasks: {
      '1572123600': {}
    },
    blockedDays: []
  }

  const data = {
    time_records: [{
        id: 1,
        project_id: 2,
        description: 'text',
        spent_time: 1.5,
        time_start: 'time',
        assigned_date: '1572123600',
        tag_ids: [1, 2]
    }],
    blocked_days: [1, 2, 3]
  }


  it('should update list of tasks', () => {
    const mutations = Object.assign({}, storeMutations)
    mutations.$appMethods = $appMethods
    const mockedNuxtInstance = { app: { $config: { extensionEnabled: false } } }
    const boundMutation = mutations.updateTasks.bind(mockedNuxtInstance)
    boundMutation(state, data)
    expect(state.tasks['1572123600']['1']).to.eql({
      id: 1,
      project: 2,
      description: 'text',
      spentTime: 1.5,
      timeStart: 'time',
      assignedDate: '1572123600',
      tagIds: [1, 2]
    })
  })

  it('should update list of blocked days if extension was enabled', () => {
    const mutations = Object.assign({}, storeMutations)
    const mockedNuxtInstance = { app: { $config: { extensionEnabled: true } } }
    const boundMutation = mutations.updateTasks.bind(mockedNuxtInstance)
    boundMutation(state, data)

    expect(state.blockedDays).to.eql([1,2,3])
    sinon.restore()
  })
})
