import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('mounted', () => {

  const methods = {
    fetchTags: () => {}
  }

  it("should fetch tags", () => {
    const methodStub = sinon.stub(methods, 'fetchTags')
    createWrapper(Tags, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

});
