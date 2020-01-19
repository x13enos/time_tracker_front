import createWrapper from '@/test/support/create_wrapper.js'
import snackbar from '@/components/layout/snackbar'

it('should call mutation for cleaning snack info is show is false', () => {
  const wrapper = createWrapper(snackbar, {}, fakeStoreData())
  const mutationSpy = sinon.spy(wrapper.vm, "updateSnack")
  wrapper.vm.show = true

  wrapper.vm.show = false
  expect(mutationSpy.calledOnce).to.be.true
  expect(mutationSpy.args[0]).to.eql([{
    message: "",
    color: ""
  }])

  mutationSpy.restore()
});

it('should not call mutation for cleaning snack info is show is true', () => {
  const wrapper = createWrapper(snackbar, {}, fakeStoreData())
  wrapper.vm.show = false
  const mutationSpy = sinon.spy(wrapper.vm, "updateSnack")

  wrapper.vm.show = true
  expect(mutationSpy.called).to.be.false

  mutationSpy.restore()
});
