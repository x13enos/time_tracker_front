import createWrapper from '@/test/support/create_wrapper.js'
import localeSelector from '@/components/auth/locale_selector'

describe('changeLocale', () => {

  it('should keep locale inside the localStorage', () => {
    const $i18n = {
      locale: 'en'
    }
    localStorage.setItem('locale', 'en')
    const wrapper = createWrapper(localeSelector, { mocks: { $i18n }, stubs: ['gb-flag'] }, fakeStoreData())

    wrapper.vm.changeLocale('ru')
    expect(localStorage.getItem('locale')).to.eq('ru');
  });

  it('should set locale to i18n', () => {
    const $i18n = {
      locale: 'en'
    }
    const wrapper = createWrapper(localeSelector, { mocks: { $i18n }, stubs: ['gb-flag'] }, fakeStoreData())

    wrapper.vm.changeLocale('ru')
    expect(wrapper.vm.$i18n.locale).to.eq('ru');
  });

});
