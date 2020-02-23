import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations'

describe('updatePersonalInfo', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const state = {
    user: {
      name: null,
      email: null,
      timezone: null
    }
  }

  const userInfo = {
    name: 'John',
    email: 'john@gmail.com',
    timezone: 'Athens',
    locale: 'ru'
  }

  it('should update personal info', () => {
    Vuex.Store.prototype.$i18n = { locale: 'en' }
    const store = new Vuex.Store({ state, mutations })
    store.commit('updatePersonalInfo', userInfo)
    expect(state.user).to.eql(userInfo)
    delete Vuex.Store.prototype.$i18n
  })

  it('should set current user locale', () => {
    Vuex.Store.prototype.$i18n = { locale: 'en' }
    const store = new Vuex.Store({ state, mutations })
    store.commit('updatePersonalInfo', userInfo)
    expect(store.$i18n.locale).to.eq('ru')
    delete Vuex.Store.prototype.$i18n
  })
})
