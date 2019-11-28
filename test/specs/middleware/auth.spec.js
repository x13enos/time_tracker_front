import test from 'ava';
import Auth from '@/middleware/auth';

const context = {
  store: {
    state: { user: { email: "" } },
    dispatch: () => {}
  }
}

test("it should return if store has user email", t => {
  context.store.state.user.email = "john@example.com"
  const dispatchStub = sinon.stub(context.store, "dispatch")

  Auth(context)
  t.false(dispatchStub.called)

  dispatchStub.restore()
})

test("it should call action for fecthing user info if store has not user email", t => {
  context.store.state.user.email = null
  const dispatchStub = sinon.stub(context.store, "dispatch")

  Auth(context)
  t.true(dispatchStub.calledOnce)

  dispatchStub.restore()
})
