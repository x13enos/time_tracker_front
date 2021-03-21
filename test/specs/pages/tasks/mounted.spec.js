import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe('mounted', () => {
  const methods = {
    getWeeklyTasks: () => {},
    fetchActiveTimeRecord: () => {}
  }

  it('should fetch weekly tasks', async () => {
    const weekyTasksStub = sinon.stub(methods, 'getWeeklyTasks');
    const wrapper = await createWrapper(tasks, { methods }, fakeStoreData());

    expect(weekyTasksStub.calledOnce).to.be.true;
    sinon.restore();
  })

  it('should fetch active time record', async () => {
    const activeTimeRecordStub = sinon.stub(methods, 'fetchActiveTimeRecord');
    const wrapper = await createWrapper(tasks, { methods }, fakeStoreData());

    expect(activeTimeRecordStub.calledOnce).to.be.true;
    sinon.restore();
  })
});
