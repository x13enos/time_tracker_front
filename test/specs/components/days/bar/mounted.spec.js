import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const methods = {
  weekDays: () => { return [] },
  getWeeklyTasks: () => { return [] },
  setTheRightTab: () => {},
  currentDateInTimeZone: () => { return "date" }
}
const date = DateTime.local(2019, 10, 27);

describe("mounted", () => {
  it('should call action for fetching weekly time records', () => {
    const actionStub = sinon.stub(methods, "getWeeklyTasks")
    const wrapper = createWrapper(bar, { methods }, fakeStoreData())

    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql(["date"])

    sinon.restore();
  });


  it('should call method for selecting right tab', async () => {
    const tabChooserStub = sinon.stub(methods, "setTheRightTab")
    const wrapper = await createWrapper(bar, { methods }, fakeStoreData())

    expect(tabChooserStub.calledOnce).to.be.true

    sinon.restore();
  });
})
