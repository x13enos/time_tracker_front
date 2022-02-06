import createWrapper from '@/test/support/create_wrapper.js'
import ProjectSelect from '@/components/tasks/inputs/project_select'

describe('projectName', () => {

  it('should return name of project', () => {
    const propsData = { value: 2 }
    const storeData = fakeStoreData();
    storeData.state.projects = [{ id: 1, name: 'First' }, { id: 2, name: 'Second' }]
    const wrapper = createWrapper(ProjectSelect, { propsData }, storeData)

    expect(wrapper.vm.projectName).to.eq('Second')
  });

  it('should return undefined if project doesn\'t exist', () => {
    const storeData = fakeStoreData();
    storeData.state.projects = [{ id: 1, name: 'First' }, { id: 2, name: 'Second' }]
    const wrapper = createWrapper(ProjectSelect, { value: null }, storeData)

    expect(wrapper.vm.projectName).to.be.null;
  });

});
