import createWrapper from '@/test/support/create_wrapper.js'
import ProjectSelect from '@/components/tasks/inputs/project_select'

describe('selectProject', () => {

  it('should emit selected project id', () => {
    const wrapper = createWrapper(ProjectSelect, { project: null }, fakeStoreData())

    wrapper.vm.selectProject(44)
    expect(wrapper.emitted("update")[0]).to.eql([44])
  });

});
