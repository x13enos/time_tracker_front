import createWrapper from '@/test/support/create_wrapper.js'
import datePanel from '@/components/tasks/date_panel'
import { DateTime } from 'luxon';

describe('changeDay', () => {
  const date = DateTime.local(2020, 4, 30);
  const propsData = {
    days: [],
    selectedDate: date
  }

  it('should emit new value of date', async () => {
    const wrapper = createWrapper(datePanel, { propsData }, fakeStoreData())
    wrapper.vm.selectedDate = date
    await wrapper.vm.changeDay(-7)
    expect(wrapper.emitted("update:selected-date")[0]).to.eql([DateTime.local(2020, 4, 23)])
  });

  it('should call action for fetching time records', async () => {
    const wrapper = createWrapper(datePanel, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "getWeeklyTasks").returns([])
    await wrapper.vm.changeDay(-7)

    expect(actionStub.calledOnceWith(wrapper.vm.selectedDate)).to.be.true;
    sinon.restore();
  });
});
