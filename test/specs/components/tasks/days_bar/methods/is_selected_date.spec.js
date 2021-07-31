import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('isSelectedDate', () => {
  const date = DateTime.local(2019, 10, 27);
  const storeDate = fakeStoreData();
  storeDate.state.selectedDate = date;
  storeDate.state.currentDate = date;

  it('should return true if passed day the same as selected', () => {
    const wrapper = createWrapper(daysBar, {}, storeDate)
    const formatterStub = sinon.stub(wrapper.vm, "getFormattedDateForTab")
    formatterStub.withArgs(date).returns("10-27-2019")

    expect(wrapper.vm.isSelectedDate(date)).to.be.true
    sinon.restore()
  });

  it('should return false if passed day does not same as selected', () => {
    const wrapper = createWrapper(daysBar, {}, storeDate)
    const formatterStub = sinon.stub(wrapper.vm, "getFormattedDateForTab")
    const anotherDate = DateTime.local(2019, 10, 28);
    formatterStub.withArgs(date).returns("10-27-2019")
    formatterStub.withArgs(anotherDate).returns("10-28-2019")


    expect(wrapper.vm.isSelectedDate(anotherDate)).to.be.false
    sinon.restore()
  });
});
