import createWrapper from '@/test/support/create_wrapper.js';
import snackbar from '@/components/layout/snackbar';

describe('watched show', () => {

  it('should clean out the snack message if valus is false', async () => {
    const wrapper = createWrapper(snackbar, {}, fakeStoreData());
    await wrapper.setData({ show: true })
    const mutationStub = sinon.stub(wrapper.vm, 'updateSnack');
    await wrapper.setData({ show: false })
    expect(mutationStub.calledOnceWith({ message: '', color: '' })).to.be.true;
    sinon.restore()
  });
  
  it('should not clean out the snack message if valus is true', async () => {
    const wrapper = createWrapper(snackbar, {}, fakeStoreData());
    await wrapper.setData({ show: false })
    const mutationStub = sinon.stub(wrapper.vm, 'updateSnack');
    await wrapper.setData({ show: true })
    expect(mutationStub.called).to.be.false;
    sinon.restore()
  });

});

