import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('updateAttribute', () => {
  const propsData = { task: { tagIds: [] }, activeDay: false, dayIsBlocked: false }

  it('should set value for passed attribute', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData());
    sinon.stub(wrapper.vm, 'onlyUpdate');
    wrapper.vm.description = null;

    wrapper.vm.updateAttribute('text', 'description');
    expect(wrapper.vm.description).to.eq('text');
    sinon.restore();
  });

  it('should call onlyUpdate method', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData());
    const methodStub = sinon.stub(wrapper.vm, 'onlyUpdate');

    wrapper.vm.updateAttribute('text', 'description');
    expect(methodStub.calledOnce).to.be.true;
    sinon.restore();
  });

})
