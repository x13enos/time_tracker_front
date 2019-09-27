import authMiddleware from '@/middleware/auth'
import test from 'ava'

test('it should redirect to sign in page if user is not authorized', t => {
  const store = { getters: { userAuthorized: false } }
  const functionArguments = { store, redirect: () => {} }
  const redirectSpy = sinon.spy(functionArguments, "redirect")

  authMiddleware(functionArguments)
  t.true(redirectSpy.calledOnce)
  t.deepEqual(redirectSpy.args[0], ['/auth/sign-in'])
  redirectSpy.restore()
});

test('it should not redirect to sign in page if user was authorized', t => {
  const store = { getters: { userAuthorized: true } }
  const functionArguments = { store, redirect: () => {} }
  const redirectSpy = sinon.spy(functionArguments, "redirect")

  authMiddleware(functionArguments)
  t.false(redirectSpy.called)
  redirectSpy.restore()
});
