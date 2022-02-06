import createWrapper from '@/test/support/create_wrapper.js'
import ProjectSelect from '@/components/tasks/inputs/project_select'

describe('project', () => {

  it('should emit project', async () => {
    const wrapper = createWrapper(ProjectSelect, {}, fakeStoreData())
    await wrapper.setData({ project: 2 })

    expect(wrapper.emitted('update')[0]).to.eql([2])
  });

});
