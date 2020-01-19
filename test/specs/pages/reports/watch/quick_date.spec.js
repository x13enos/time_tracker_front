import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'
import { DateTime } from 'luxon';

const mocks = { $api: { allTimeRecords: () => {
  return { success: () => { return false } }
} } }
const time = DateTime.local()

it('should call method for setting dates for current week', async () => {
  const stubTime = sinon.stub(DateTime, 'fromObject').returns(time)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "this_week" });

  expect(methodSpy.calledOnce).to.be.true
  expect(methodSpy.args[0]).to.eql(['week', time])

  methodSpy.restore()
  stubTime.restore()
})

it('should call method for setting dates for last week', async () => {
  const stubTime = sinon.stub(DateTime, 'fromObject').returns(time)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "last_week" });

  expect(methodSpy.calledOnce).to.be.true
  expect(methodSpy.args[0]).to.eql(['week', time.minus({days: 7})])

  methodSpy.restore()
  stubTime.restore()
})

it('should call method for setting dates for current month', async () => {
  const stubTime = sinon.stub(DateTime, 'fromObject').returns(time)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "this_month" });

  expect(methodSpy.calledOnce).to.be.true
  expect(methodSpy.args[0]).to.eql(['month', time])

  methodSpy.restore()
  stubTime.restore()
})

it('should call method for setting dates for last month', async () => {
  const stubTime = sinon.stub(DateTime, 'fromObject').returns(time)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "last_month" });

  expect(methodSpy.calledOnce).to.be.true
  expect(methodSpy.args[0]).to.eql(['month', time.minus({month: 1})])

  methodSpy.restore()
  stubTime.restore()
})
