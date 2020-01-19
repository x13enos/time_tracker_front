import createWrapper from '@/test/support/create_wrapper.js'

import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

it("should use user's timezone", async () => {
  const store = fakeStoreData()
  store.state.user.timezone = "Europe/Kiev"
  const date = DateTime.local()
  const dateTimeStub = sinon.stub(DateTime, 'fromObject').returns(date)
  const wrapper = await createWrapper(bar, {}, store)

  expect(dateTimeStub.called).to.be.true
  expect(dateTimeStub.args[0]).to.eql([{ zone: "Europe/Kiev" }])
  dateTimeStub.restore()
});
