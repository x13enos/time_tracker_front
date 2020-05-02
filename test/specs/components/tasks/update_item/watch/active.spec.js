import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('active', () => {

  const propsData = {
    task: { timeStart: null },
    activeDay: false
  }

  it('should call "start" method if value is true', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const startMethodStub = sinon.stub(wrapper.vm, "start")

    await wrapper.setProps({ task: { timeStart: new Date } })

    expect(startMethodStub.calledOnce).to.be.true

    startMethodStub.restore()
  });

  it('should not call "start" method if value is false', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const startMethodStub = sinon.stub(wrapper.vm, "start")

    await wrapper.setProps({ task: { timeStart: null } })

    expect(startMethodStub.called).to.be.false

    startMethodStub.restore()
  });

});
