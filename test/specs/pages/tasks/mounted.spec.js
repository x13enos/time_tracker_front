import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe('mounted', () => {

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
