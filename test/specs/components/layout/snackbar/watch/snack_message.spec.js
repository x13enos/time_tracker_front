import createWrapper from '@/test/support/create_wrapper.js';
import Snackbar from '@/components/layout/snackbar';

describe('watched snack_message', () => {

  it('should set show value as true if message is present', async () => {
    const store = fakeStoreData();
    const wrapper = createWrapper(Snackbar, {}, store);
    wrapper.vm.show = false;
    store.state.snack.message = "test message";
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.show).to.be.true;
  });
  
  it('should not set show value as true if message is empty', async () => {
    const localThis = { show: true };
    Snackbar.watch["snack.message"].call(localThis, '');
    expect(localThis.show).to.be.false;
  });

  it('should write the timeout id to the variable if the message is present', async () => {
    const localThis = { show: true, timeoutId: null };
    Snackbar.watch["snack.message"].call(localThis, 'message');
    expect(localThis.timeoutId).to.not.be.null;
  });

  it('should clean up the snack data in 4 seconds', async () => {
    const store = fakeStoreData();
    const clock = sinon.useFakeTimers();
    const wrapper = createWrapper(Snackbar, {}, store);
    const cleanStub = sinon.stub(wrapper.vm, 'clean');
    store.state.snack.message = "test message";
    await wrapper.vm.$nextTick;
    clock.tick(5000);

    expect(cleanStub.calledOnce).to.be.true;
    sinon.restore();
  });
});

