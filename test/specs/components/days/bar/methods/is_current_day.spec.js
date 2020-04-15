import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const date = DateTime.local(2019, 10, 27);

describe('isCurrentDay', () => {
  it('should return true if passed day the same as current', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    const formatterStub = sinon.stub(wrapper.vm, "getFormattedDateForTab")
    formatterStub.withArgs(date).returns("10-27-2019")
    wrapper.vm.currentDate = date

    expect(wrapper.vm.isCurrentDay(date)).to.be.true
    sinon.restore()
  });

  it('should return false if passed day does not same as current', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    const formatterStub = sinon.stub(wrapper.vm, "getFormattedDateForTab")
    wrapper.vm.currentDate = date
    const anotherDate = DateTime.local(2019, 10, 28);
    formatterStub.withArgs(date).returns("10-27-2019")
    formatterStub.withArgs(anotherDate).returns("10-28-2019")


    expect(wrapper.vm.isCurrentDay(anotherDate)).to.be.false
    sinon.restore()
  });
});
