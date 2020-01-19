import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'

it('should set interval id to component data', () => {
  const timeStub = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
  const clearIntervalStub = sinon.stub(timeStub, 'clearInterval')
  createWrapper(bar, {}, fakeStoreData()).destroy()

  expect(clearIntervalStub.args[0]).to.eql([77])

  clearIntervalStub.restore()
  intervalStub.restore()
  timeStub.restore()
});
