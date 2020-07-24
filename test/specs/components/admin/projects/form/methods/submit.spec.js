import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('submit', () => {

  it('should call create method if this project is new', function(){
    const propsData = { project: {} }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "create")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call update method if this project is exists', function(){
    const propsData = { project: { id: 2 } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "update")

    wrapper.vm.submit()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

})
