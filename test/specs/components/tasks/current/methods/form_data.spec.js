import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day, days: [] }

describe('formData', () => {

  it('should return form data for creating/updating task', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    Object.assign(wrapper.vm, {
      description: 'text',
      project: 1,
      tagIds: [1, 2],
      spentTime: '0.255'
    });

    expect(wrapper.vm.formData(false)).to.eql({
      project: 1,
      description: 'text',
      spentTime: '0.26',
      active: false,
      tagIds: [1, 2]
    })
  });

})
