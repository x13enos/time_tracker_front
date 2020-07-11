import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: '0.50',
  assignedDate: "1572123600",
  tagIds: []
}
const propsData = { activeDay: false, task: taskData, dayIsBlocked: false }

it('should call mutation keepActiveTaskIntervalId', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  const mutationStub = sinon.stub(wrapper.vm, "keepActiveTaskIntervalId")
  const timer = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timer, 'setInterval').returns(101)

  wrapper.vm.start()
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([101])

  timer.restore()
  intervalStub.restore()
  mutationStub.restore()
});

it('should change spent time on 0.01 each 36 seconds', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  expect(wrapper.vm.spentTime).to.eq('0.51')

  clock.restore();
});

it('should pass updated time to parent each 36 seconds', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  const mutationStub = sinon.stub(wrapper.vm, "updateTaskSpentTime")
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([{
    assignedDate: "1572123600",
    spentTime: 0.51,
    id: 125
  }])

  clock.restore();
  mutationStub.restore();
});

it('should not change spent time on 0.01 each 35 seconds', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(35000);

  expect(wrapper.vm.spentTime).to.eq('0.50')

  clock.restore();
});

it('should set btnStartFocused as false', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  sinon.stub(wrapper.vm, "keepActiveTaskIntervalId")
  wrapper.vm.btnStartFocused = true

  wrapper.vm.start()
  expect(wrapper.vm.btnStartFocused).to.be.false
});
