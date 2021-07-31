import createWrapper from '@/test/support/create_wrapper.js'
import datePanel from '@/components/tasks/date_panel'
import { DateTime } from 'luxon';

describe('changeDay', () => {
  const selectedDate = DateTime.local(2020, 4, 30);
  const storeDate = fakeStoreData();
  storeDate.state.selectedDate = selectedDate;

  it('should call mutation for updating selected date', async () => {
    const wrapper = createWrapper(datePanel, {}, storeDate)
    const mutationStub = sinon.stub(wrapper.vm, "updateSelectedDate").returns([])

    await wrapper.vm.changeDay(-7)
    expect(mutationStub.calledOnceWith(selectedDate.plus({ days: -7 }))).to.be.true;
    sinon.restore();
  });

  it('should call action for fetching time records', async () => {
    const wrapper = createWrapper(datePanel, {}, storeDate)
    const actionStub = sinon.stub(wrapper.vm, "getWeeklyTasks").returns([])
    
    await wrapper.vm.changeDay(-7)
    expect(actionStub.calledOnceWith(wrapper.vm.selectedDate)).to.be.true;
    sinon.restore();
  });
});
