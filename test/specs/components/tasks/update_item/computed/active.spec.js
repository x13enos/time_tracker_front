import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const propsData = {
  task: { timeStart: 'now', tagIds: [] },
  activeDay: false,
  dayIsBlocked: false
}

it('should call method isEmpty and passed timeStart argument', () => {
  const $appMethods = { isEmpty: (value) => { return true } }
  const isEmptyStub = sinon.stub($appMethods, 'isEmpty')

  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  expect(isEmptyStub.calledOnce).to.be.true
  expect(isEmptyStub.args[0]).to.eql(['now'])

  isEmptyStub.restore()
});

it('should return true if passed timeStart is not empty', () => {
  const $appMethods = { isEmpty: (value) => { return false } }

  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  expect(wrapper.vm.active).to.be.true
});

it('should return false if passed timeStart is empty', () => {
  const $appMethods = { isEmpty: (value) => { return true } }

  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  expect(wrapper.vm.active).to.be.false
});
