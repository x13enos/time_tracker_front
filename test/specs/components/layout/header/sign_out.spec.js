import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import header from '@/components/layout/header'

const $api = {
  signOut: () => { return {} }
}

it('should call api method for sign out ', async () => {
  const actionSpy = sinon.spy($api, "signOut")
  const wrapper = createWrapper(header,
    { mocks: { $api }, stubs: { NuxtLink: RouterLinkStub } },
    fakeStoreData()
  )

  await wrapper.vm.signOut()
  expect(actionSpy.calledOnce).to.be.true

  actionSpy.restore()
});

it('should redirect to sign in page', async () => {
  const wrapper = createWrapper(header,
    { mocks: { $api }, stubs: { NuxtLink: RouterLinkStub } },
    fakeStoreData()
  )
  const routerStub = sinon.stub(wrapper.vm.$router, "push")

  await wrapper.vm.signOut()
  expect(routerStub.calledOnce).to.be.true
  expect(routerStub.args[0]).to.eql(["/auth/sign-in"])

  routerStub.restore()
});
