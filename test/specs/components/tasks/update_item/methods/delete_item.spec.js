import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('deleteItem', () => {

  const taskData = {
    id: 125,
    project: 1,
    description: "test",
    spentTime: '0.50',
    assignedDate: "1572123600",
    tagIds: []
  }

  const propsData = { activeDay: false, task: taskData }

  it('should change dialog flag', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())

    wrapper.vm.deleteItem()
    expect(wrapper.vm.dialog).to.be.false
  });


  it('should call action for deleting time record', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'deleteTask')
    wrapper.vm.deleteItem()

    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql([{ assignedDate: "1572123600", id: 125 }])

    actionStub.restore()
  });

});
