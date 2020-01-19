import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

it('should set interval id to component data', () => {
  const timeStub = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
  const wrapper = createWrapper(bar, {}, fakeStoreData())
  expect(wrapper.vm.intervalId).to.eq(77)

  intervalStub.restore()
  timeStub.restore()
});
