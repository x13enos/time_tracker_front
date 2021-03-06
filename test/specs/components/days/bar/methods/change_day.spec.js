import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon';

describe('changeDay', () => {
  const date = DateTime.local(2019, 10, 27);

  it('should set the new current date', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    wrapper.vm.selectedDate = date
    wrapper.vm.changeDay(-7)
    expect(wrapper.vm.selectedDate).to.eql(DateTime.local(2019, 10, 20))
  });

  it('should call method for cleaning tab', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    wrapper.vm.changeDay(-7)
    expect(wrapper.vm.tab).to.be.null
  });

  it('should call action for fetching time records', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "getWeeklyTasks").returns([])
    wrapper.vm.changeDay(-7)

    expect(actionStub.calledOnce).to.be.true;
    expect(actionStub.args[0]).to.eql([wrapper.vm.selectedDate])

    sinon.restore();
  });
});
