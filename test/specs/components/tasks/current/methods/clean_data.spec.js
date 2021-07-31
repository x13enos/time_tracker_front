import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'

describe('cleanUpData', () => {

  it('should clean up component\'s data', () => {
    const wrapper = createWrapper(currentTask, {}, fakeStoreData())
    Object.assign(wrapper.vm, {
      project: 1,
      tagIds: ['discussion'],
      description: 'text',
      spentTime: '1.05',
      assignedDate: 'today'
    });

    wrapper.vm.cleanUpData()
    expect(wrapper.vm.project).to.be.null;
    expect(wrapper.vm.tagIds).to.be.empty;
    expect(wrapper.vm.description).to.be.null;
    expect(wrapper.vm.spentTime).to.be.null;
    expect(wrapper.vm.assignedDate).to.be.null;
  });

})
