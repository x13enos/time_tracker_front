import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const date = DateTime.local(2019, 10, 27);

const methods = {
  weekDays: (value) => { return [date] },
  getFormattedDateForWeek: (value) => { return "" }
}

it('should call method for selecting days of week', () => {
  const methodStub = sinon.stub(methods, "weekDays").returns([date])
  const wrapper = createWrapper(bar, { methods }, fakeStoreData())

  expect(methodStub.calledOnce).be.true

  methodStub.restore()
});

it('should return days of week', () => {
  const wrapper = createWrapper(bar, { methods }, fakeStoreData())

  expect(wrapper.vm.days).to.eql([date])
});
