import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day, days: [] }

const taskData = {
  project: 1,
  description: "test",
  spentTime: '0.50',
  assignedDate: "1572123600",
  tagIds: []
}

describe('start', () => {
  it('should change spent time on 0.01 each 36 seconds', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    Object.assign(wrapper.vm, taskData);
    const clock = sinon.useFakeTimers();

    wrapper.vm.start();
    clock.tick(37000);
    expect(wrapper.vm.spentTime).to.eq('0.51');
    sinon.restore();
  });

  it('should save spentTime each 36 seconds', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    Object.assign(wrapper.vm, taskData);
    const mutationStub = sinon.stub(wrapper.vm, "updateTaskSpentTime");
    const clock = sinon.useFakeTimers();

    wrapper.vm.start();
    clock.tick(37000);
    expect(mutationStub.calledOnceWith('0.51')).to.be.true
    sinon.restore();
  });

  it('should not change spentTime each 35 seconds', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    Object.assign(wrapper.vm, taskData);
    const clock = sinon.useFakeTimers();

    wrapper.vm.start();
    clock.tick(35000);
    expect(wrapper.vm.spentTime).to.eq('0.50');
    sinon.restore();
  });

  it('should call mutation keepActiveTaskIntervalId', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    Object.assign(wrapper.vm, taskData);
    const methodStub = sinon.stub(wrapper.vm, 'keepActiveTaskIntervalId')
    const timer = sinon.useFakeTimers()
    sinon.stub(timer, 'setInterval').returns(101)

    wrapper.vm.start();
    expect(methodStub.calledOnceWith(101)).to.be.true;
    sinon.restore();
  });
});
