import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('cleanUpData', () => {

  const newData = {
    project: 1,
    description: "test",
    spentTime: "0.50",
    tagIds: [1]
  }

  it('should clean up form\'s data', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    Object.assign(wrapper.vm, newData);
    wrapper.vm.cleanUpData();
    expect(wrapper.vm.project).to.be.null;
    expect(wrapper.vm.tagIds).to.be.eql([]);
    expect(wrapper.vm.description).to.be.null;
    expect(wrapper.vm.spentTime).to.be.null;
  });

});