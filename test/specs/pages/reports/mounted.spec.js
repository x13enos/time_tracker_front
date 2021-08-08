import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe('mounted', () => {

  let mocks;

  beforeEach(() => {
    mocks = { $api: {
      allTags: () => { return { data: [] } },
      getUsersByCurrentWorkspace: () => ({ data: [] })
    } }
  })

  it('should set user id from store', async () => {

    const store = fakeStoreData();
    store.state.user.id = 'Vx2f9sdf';
    const wrapper = await createWrapper(reports, { mocks }, store);

    expect(wrapper.vm.filters.userId).to.eq('Vx2f9sdf');
  })

  it('should call method for fetching users if user is admin', async () => {
    const store = fakeStoreData();
    store.getters = {
      isManager: () => true
    }
    const endpointStub = sinon.stub(mocks.$api, 'getUsersByCurrentWorkspace').returns({ data: [] });
    const wrapper = await createWrapper(reports, { mocks }, store);

    await wrapper.vm.$nextTick();
    expect(endpointStub.called).to.be.true;
    sinon.restore();
  })

  it('should not call method for fetching users if user is not admin', async () => {
    const store = fakeStoreData()
    store.getters = {
      isManager: () => false
    }
    const endpointStub = sinon.stub(mocks.$api, 'getUsersByCurrentWorkspace').returns({ data: [] });
    await createWrapper(reports, { mocks }, store)

    expect(endpointStub.calledOnce).to.be.false
    sinon.restore()
  })
})
