import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/tags/form'

describe('submit', () => {

  it('should call create method if this tag is new', function(){
    const propsData = { tag: {} }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "create")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call update method if this tag is exists', function(){
    const propsData = { tag: { id: 2 } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "update")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

})
