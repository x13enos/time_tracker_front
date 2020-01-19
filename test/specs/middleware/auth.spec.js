import Auth from '@/middleware/auth';

const context = {
  store: {
    state: { user: { email: "" } },
    dispatch: () => {}
  }
}

it('should return if store has user email', () => {
  context.store.state.user.email = "john@example.com"
  const dispatchStub = sinon.stub(context.store, "dispatch")

  Auth(context)
  expect(dispatchStub.called).to.be.false

  dispatchStub.restore()
})

it('should call action for fecthing user info if store has not user email', () => {
  context.store.state.user.email = null
  const dispatchStub = sinon.stub(context.store, "dispatch")

  Auth(context)
  expect(dispatchStub.calledOnce).to.be.true

  dispatchStub.restore()
})
