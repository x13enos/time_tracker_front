import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

it('should call action for checking on pending tasks', () => {
  const wrapper = createWrapper(tasks, {}, fakeStoreData())

  const actionStub = sinon.stub(wrapper.vm, "checkOnPendingTasks")
  const next = sinon.stub

  tasks.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
  expect(actionStub.calledOnce).to.be.true

  actionStub.restore()
})
