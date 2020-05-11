import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mutations from '@/store/mutations'

describe('updatePersonalInfo', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const state = {
    user: {
      id: null,
      name: null,
      email: null,
      locale: null,
      role: null,
      activeWorkspaceId: null
    }
  }

  const userInfo = {
    id: 100,
    name: 'John',
    email: 'john@gmail.com',
    locale: 'ru',
    role: "staff",
    active_workspace_id: 101
  }

  it('should update personal info', () => {
    Vuex.Store.prototype.$i18n = { locale: 'en' }
    const store = new Vuex.Store({ state, mutations })
    store.commit('updatePersonalInfo', userInfo)
    expect(state.user).to.eql({
      id: 100,
      name: 'John',
      email: 'john@gmail.com',
      locale: 'ru',
      role: 'staff',
      activeWorkspaceId: 101
    })
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
