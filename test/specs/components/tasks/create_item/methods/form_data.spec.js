import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('formData', () => {

  const newData = {
    project: 1,
    description: "test",
    spentTime: "0.50",
    tagIds: [1]
  }

  it('should return task\'s data', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData())
    Object.assign(wrapper.vm, newData)
    expect(wrapper.vm.formData(true)).to.eql(Object.assign(newData, { active: true }))
    expect(wrapper.vm.formData(false)).to.eql(Object.assign(newData, { active: false }))
  });

});
