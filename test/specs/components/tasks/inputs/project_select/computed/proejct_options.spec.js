import createWrapper from '@/test/support/create_wrapper.js'
import ProjectSelect from '@/components/tasks/inputs/project_select'

describe('projectsOptions', () => {

  it('should return list of options for select', () => {
    const propsData = { value: 2 }
    const storeData = fakeStoreData();
    storeData.state.projects = [{ id: 1, name: 'First' }, { id: 2, name: 'Second' }]
    const wrapper = createWrapper(ProjectSelect, { propsData }, storeData)

    expect(wrapper.vm.projectsOptions).to.eql([
      { value: 1, name: 'First' },
      { value: 2, name: 'Second' }
    ])
  });
});
