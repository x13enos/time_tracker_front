import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe("mounted", () => {
  const methods = {
    weekDays: () => { return [] },
    getWeeklyTasks: () => { return [] },
    setTheRightTab: () => {}
  }
  const date = DateTime.local(2019, 10, 27);
  const propsData = {
    selectedDate: date,
    currentDate: date,
  }


  it('should call action for fetching weekly time records', () => {
    sinon.stub(DateTime, "local").returns(date)
    const actionStub = sinon.stub(methods, "getWeeklyTasks")
    const wrapper = createWrapper(daysBar, { methods, propsData }, fakeStoreData())

    expect(actionStub.calledOnceWith(date)).to.be.true

    sinon.restore();
  });

  it('should call method for selecting right tab', async () => {
    const tabChooserStub = sinon.stub(methods, "setTheRightTab")
    const wrapper = await createWrapper(daysBar, { methods, propsData }, fakeStoreData())

    expect(tabChooserStub.calledOnce).to.be.true

    sinon.restore();
  });
})
