import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('taskHasTheSameAttributes', () => {
  const taskData = {
    id: 125,
    project: 1,
    description: "test",
    spentTime: '0.5',
    tagIds: [1]
  }
  const propsData = { activeDay: false, task: taskData, dayIsBlocked: false }

  it('should return true if all filled data is the same as in task', function(){
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.project = 1
    wrapper.vm.description = "test"
    wrapper.vm.spentTime = '0.5'
    wrapper.vm.tagIds = [1]

    expect(wrapper.vm.taskHasTheSameAttributes()).to.be.true
  });

  it('should return false if project is another than in the task', function(){
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.project = 2
    wrapper.vm.description = "test"
    wrapper.vm.spentTime = '0.50'
    wrapper.vm.tagIds = [1]

    expect(wrapper.vm.taskHasTheSameAttributes()).to.be.false
  });

  it('should return false if description is another than in the task', function(){
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.project = 1
    wrapper.vm.description = "test-1"
    wrapper.vm.spentTime = '0.50'
    wrapper.vm.tagIds = [1]

    expect(wrapper.vm.taskHasTheSameAttributes()).to.be.false
  });

  it('should return false if spentTime is another than in the task', function(){
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.project = 1
    wrapper.vm.description = "test"
    wrapper.vm.spentTime = '0.51'
    wrapper.vm.tagIds = [1]

    expect(wrapper.vm.taskHasTheSameAttributes()).to.be.false
  });

  it('should return false if number of tags is another than in the task', function(){
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.project = 1
    wrapper.vm.description = "test"
    wrapper.vm.spentTime = '0.50'
    wrapper.vm.tagIds = [1, 2]

    expect(wrapper.vm.taskHasTheSameAttributes()).to.be.false
  });

});
