import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe("mounted", () => {
  const methods = {
    getWeeklyTasks: () => { return [] }
  }

  it('should call action for fetching weekly time records', () => {
    const selectedDate = DateTime.local(2019, 10, 27);
    sinon.stub(DateTime, "local").returns(selectedDate)
    const storeData = fakeStoreData();
    Object.assign(storeData.state, 
      { selectedDate, currentDate: selectedDate }
    )
    const actionStub = sinon.stub(methods, "getWeeklyTasks")
    const wrapper = createWrapper(daysBar, { methods }, storeData)

    expect(actionStub.calledOnceWith(selectedDate)).to.be.true

    sinon.restore();
  });
})
