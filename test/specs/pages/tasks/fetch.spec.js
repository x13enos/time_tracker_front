import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe("fetch", () => {
  it('should call method for fetching projects', async () => {
    const app = {
      $api: {
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

    const commitStub = sinon.stub(app.store, 'commit')

    const wrapper = createWrapper(tasks, {}, fakeStoreData())
    await wrapper.vm.$options.fetch({ app })
    expect(commitStub.calledOnce).to.be.true
    expect(commitStub.args[0]).to.eql(['updateProjects', ["First"]])

    commitStub.restore();
  })

})
