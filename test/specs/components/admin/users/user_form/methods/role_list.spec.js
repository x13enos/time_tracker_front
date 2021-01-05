import createWrapper from '@/test/support/create_wrapper.js'
import userForm from '@/components/admin/users/user_form'

describe('roleList', () => {

  const propsData = {
    user: {
      id: 1,
      role: "staff",
      name: "John Doe"
    }
  }

  it('should return list of locales', function(){
    const wrapper = createWrapper(userForm, { propsData }, fakeStoreData());
    const localeStub = sinon.stub(wrapper.vm, '$t');
    localeStub.withArgs("users.roles.staff").returns("Staff");
    localeStub.withArgs("users.roles.admin").returns("Admin");
    expect(wrapper.vm.roleList()).to.eql([
      { text: "Staff", value: "staff" },
      { text: "Admin", value: "admin" },
    ])
  });

})
