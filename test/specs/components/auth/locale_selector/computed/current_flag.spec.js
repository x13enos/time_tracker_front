import createWrapper from '@/test/support/create_wrapper.js'
import localeSelector from '@/components/auth/locale_selector'

describe('currentFlag', () => {

  it('should return current flag based on the value of i18n locale', () => {
    const $i18n = {
      locale: 'ru'
    }
    const wrapper = createWrapper(localeSelector, { mocks: { $i18n }, stubs: ['gb-flag'] }, fakeStoreData())

    expect(wrapper.vm.currentFlag).eq('ru');
    sinon.restore()
  });

  it('should return default gb flag if locale was not set for I18n', () => {
    const $i18n = {
      locale: undefined
    }
    const wrapper = createWrapper(localeSelector, { mocks: { $i18n }, stubs: ['gb-flag'] }, fakeStoreData())

    expect(wrapper.vm.currentFlag).eq('gb');
    sinon.restore()
  });

});
