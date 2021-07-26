import createWrapper from '@/test/support/create_wrapper.js';
import dateSelect from '@/components/tasks/date_select';

describe('updateValue', () => {
  const storeDate = fakeStoreData();

  it('should call the mutation and pass the reversed splitted value', async () => {
    const wrapper = createWrapper(dateSelect, {}, storeDate);
    const mutationStub = sinon.stub(wrapper.vm, "updateSelectedDate");

    await wrapper.vm.updateValue('2021-1-1');
    expect(mutationStub.calledOnceWith(['1', '1', '2021'])).to.be.true;
    sinon.restore();
  });

  it('should set date menu value as false', async () => {
    const wrapper = createWrapper(dateSelect, {}, storeDate);
    wrapper.vm.dateMenu = true;

    await wrapper.vm.updateValue('2021-1-1');
    expect(wrapper.vm.dateMenu).to.be.false;
  });
});
