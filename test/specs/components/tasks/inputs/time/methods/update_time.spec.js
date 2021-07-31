import createWrapper from '@/test/support/create_wrapper.js'
import TimeInput from '@/components/tasks/inputs/time'

describe('updateTime', () => {

  it('should emit spent time and remove any non-digit values', () => {
    const wrapper = createWrapper(TimeInput, { spentTime: null }, fakeStoreData())

    wrapper.vm.updateTime({ target: { value: 'text12-text23' } })
    expect(wrapper.emitted("update")[0]).to.eql(['12.23'])
  });

  it('should emit spent time and use only 4 last digits for formatting time', () => {
    const wrapper = createWrapper(TimeInput, { spentTime: null }, fakeStoreData())

    wrapper.vm.updateTime({ target: { value: '51035' } })
    expect(wrapper.emitted("update")[0]).to.eql(['10.35'])
  });

  it('should emit spent time and format passed digits as decimal part if they only two of them', () => {
    const wrapper = createWrapper(TimeInput, { spentTime: null }, fakeStoreData())

    wrapper.vm.updateTime({ target: { value: '12' } })
    expect(wrapper.emitted("update")[0]).to.eql(['0.12'])
  });

  it('should emit spent time and format string 03 to 0.3', () => {
    const wrapper = createWrapper(TimeInput, { spentTime: null }, fakeStoreData())

    wrapper.vm.updateTime({ target: { value: '03' } })
    expect(wrapper.emitted("update")[0]).to.eql(['0.3'])
  });

  it('should emit spent time and correct parsed only one passed digit', () => {
    const wrapper = createWrapper(TimeInput, { spentTime: null }, fakeStoreData())

    wrapper.vm.updateTime({ target: { value: '2' } })
    expect(wrapper.emitted("update")[0]).to.eql(['0.2'])
  });

});
