import Auth from '@/middleware/auth';

describe('auth', () => {

const context = {
  store: {
    state: { user: { email: "" } },
    dispatch: () => {}
  },
  redirect: () => {}
}

  it('should return if store has user email', () => {
    context.store.state.user.email = "john@example.com";
    const dispatchStub = sinon.stub(context.store, "dispatch");

    Auth(context);
    expect(dispatchStub.called).to.be.false;
    sinon.restore();
  })

  it('should call action for fetching user info if store has not user email', () => {
    context.store.state.user.email = null;
    const dispatchStub = sinon.stub(context.store, "dispatch").resolves();

    Auth(context);
    expect(dispatchStub.calledOnce).to.be.true;
    sinon.restore();
  })

  it('should redirect user to the auth page in case of getting error during the fetching user data', async () => {
    context.store.state.user.email = null;
    sinon.stub(context.store, "dispatch").rejects({ body: "error"});
    const redirectStub = sinon.stub(context, 'redirect');

    await Auth(context);
    expect(redirectStub.calledOnceWith('/auth/sign-in')).to.be.true;
    sinon.restore();
  })
});
