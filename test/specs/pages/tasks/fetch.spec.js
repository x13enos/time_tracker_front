import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe("fetch", () => {
  const app = {
    $api: {
      allTags: () => { return { data: ["First"] } },
      allProjects: () => { return { data: ["First"] } },
      allTimeRecords: () => { return { data: [{
        id: 1,
        project: { id: 2 },
        description: "Test",
        timeStart: "today",
        spentTime: 0.5
      }] } }
    },
    store: {
      commit: (name, data) => {},
      state: { user: {} }
    }
  }

  it('should call method for fetching projects', async () => {
    const commitApi = sinon.stub(app.$api, 'allProjects').returns({ data: ["First"] })

    const wrapper = createWrapper(tasks, {}, fakeStoreData())
    await wrapper.vm.$options.fetch({ app })

    expect(commitApi.calledOnce).to.be.true

    sinon.restore();
  })

  it('should call method for fetching tags', async () => {
    const commitApi = sinon.stub(app.$api, 'allTags').returns({ data: ["First"] })

    const wrapper = createWrapper(tasks, {}, fakeStoreData())
    await wrapper.vm.$options.fetch({ app })
    expect(commitApi.calledOnce).to.be.true

    sinon.restore();
  })

})
