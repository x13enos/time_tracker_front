import createWrapper from '@/test/support/create_wrapper.js';
import snackbar from '@/components/layout/snackbar';

describe('watched snack_message', () => {

  it('should set show value as true if message is present', async () => {
    const store = fakeStoreData();
    const wrapper = createWrapper(snackbar, {}, store);
    wrapper.vm.show = false;
    store.state.snack.message = "test message";
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.show).to.be.true;
  });
  
  it('should not set show value as true if message is empty', async () => {
    const store = fakeStoreData();
    const wrapper = createWrapper(snackbar, {}, store);
    store.state.snack.message = "test message";
    wrapper.vm.show = false;
    store.state.snack.message = "";
    await wrapper.vm.$nextTick;
    expect(wrapper.vm.show).to.be.false;
  });

});

