import createWrapper from '@/test/support/create_wrapper.js'
import userForm from '@/components/admin/users/user_form'

describe('update', () => {

  const mocks = {
    $api: {
      updateUserData: () => {}
    }
  }

  const propsData = {
    user: {
      id: 1,
      role: "staff",
      name: "John Doe"
    }
  }

  it('should call api endpoint and send data to that', function(){
    const endpointStub = sinon.stub(mocks.$api, 'updateUserData').returns({ data: {} });
    const wrapper = createWrapper(userForm, { propsData, mocks }, fakeStoreData());
    wrapper.vm.form.role = 'admin';

    wrapper.vm.update();
    expect(endpointStub.calledOnceWith(1, { role: 'admin' }))
    sinon.restore();
  });

  it('should emit response data', async function(){
    sinon.stub(mocks.$api, 'updateUserData').returns({ data: { id: 2} });
    const wrapper = createWrapper(userForm, { propsData, mocks }, fakeStoreData());

    await wrapper.vm.update();
    expect(wrapper.emitted("updateUserData")[0]).to.eql([{ id: 2 }])
    sinon.restore();
  });

  it('should show snack', async function(){
    sinon.stub(mocks.$api, 'updateUserData').returns({ data: { id: 2} });
    const wrapper = createWrapper(userForm, { propsData, mocks }, fakeStoreData());
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack');
    sinon.stub(wrapper.vm, '$t').withArgs("users.details_were_updated").returns('success');

    await wrapper.vm.update();
    expect(snackStub.calledOnceWith({ message: 'success', color: 'green' }))
    sinon.restore();
  });

  it('should close dialog with form', async function(){
    sinon.stub(mocks.$api, 'updateUserData').returns({ data: { id: 2} });
    const wrapper = createWrapper(userForm, { propsData, mocks }, fakeStoreData());
    wrapper.vm.dialog = true;

    await wrapper.vm.update();
    expect(wrapper.vm.dialog).to.be.false;
    sinon.restore();
  });

})


// async update() {
//   const response = await this.$api.updateUserData(this.user.id, { role: this.form.role })
//   if(response.data) {
//     this.$emit('updateUserData', response.data)
//     this.updateSnack({ message: this.$t("users.details_were_updated"), color: "green" })
//     this.dialog = false;
//   }
// }
