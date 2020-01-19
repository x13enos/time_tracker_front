import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const methods = {
  weekDays: () => { return [] },
  setTheRightTab: () => {}
}
const date = DateTime.local(2019, 10, 27);

it('should call method for selecting right tab', () => {
  const tabChooserStub = sinon.stub(methods, "setTheRightTab")
  const wrapper = createWrapper(bar, { methods }, fakeStoreData())

  expect(tabChooserStub.calledOnce).to.be.true

  tabChooserStub.restore()
});
