import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe('mounted', () => {

  it('should update selected date if it was passed in the URL params', async () => {
    const storeData = fakeStoreData();
    const actionStub = sinon.stub();
    const $route = { query: { date: '2021-10-28' } };
    storeData.actions = {
      updateSelectedDate: actionStub,
      getWeeklyTasks: () => {},
      fetchActiveTimeRecord: () => {}
    }

    const wrapper = await createWrapper(tasks, { mocks: { $route } }, storeData);
    await wrapper.vm.$nextTick();
    expect(actionStub.calledOnce).to.be.true;
    expect(actionStub.args[0][1]).to.eql(['28', '10', '2021'])
    sinon.restore();
  })

  it('should fetch weekly tasks', async () => {
    const storeData = fakeStoreData();
    const actionStub = sinon.stub();
    storeData.actions = { 
      getWeeklyTasks: actionStub,
      fetchActiveTimeRecord: () => {}
    }

    const wrapper = await createWrapper(tasks, {}, storeData);
    await wrapper.vm.$nextTick();
    expect(actionStub.calledOnce).to.be.true;
    sinon.restore();
  })

  it('should fetch active time record', async () => {
    const storeData = fakeStoreData();
    const actionStub = sinon.stub();
    storeData.actions = { 
      getWeeklyTasks: () => {},
      fetchActiveTimeRecord: actionStub
    }

    const wrapper = await createWrapper(tasks, {}, storeData);
    await wrapper.vm.$nextTick();
    expect(actionStub.calledOnce).to.be.true;
    sinon.restore();
  })
});
