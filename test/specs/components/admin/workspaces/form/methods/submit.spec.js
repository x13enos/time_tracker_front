import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/workspaces/form'

describe('submit', () => {

  it('should call create method if this workspace is new', function(){
    const propsData = { workspace: {} }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "create")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call update method if this workspace is exists', function(){
    const propsData = { workspace: { id: 2 } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "update")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

})
