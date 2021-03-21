import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day }

describe('create', () => {

  it('should call action addTack', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

    wrapper.vm.create()
    expect(actionStub.calledOnceWith({ params: { description: "text" }, day })).to.be.true
    sinon.restore()
  });

})
