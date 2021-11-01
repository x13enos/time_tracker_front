import createWrapper from '@/test/support/create_wrapper.js';
import Snackbar from '@/components/layout/snackbar';

describe('clean', () => {

  it('should clean up the content of the snackbar', async () => {
    const wrapper = createWrapper(Snackbar, {}, fakeStoreData());
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack');

    wrapper.vm.clean();
    expect(snackStub.calledOnceWith({ htmlContent: '', message: '', color: '' })).to.be.true;
    sinon.restore();
  });

});


