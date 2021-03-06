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
      timezone: null,
      role: null,
      activeWorkspaceId: null,
      telegramToken: null,
      telegramActive: null,
      notificationSettings: [],
      workspaces: []
    }
  }

  const userInfo = {
    id: 100,
    name: 'John',
    email: 'john@gmail.com',
    locale: 'ru',
    timezone: 'Europe/Kiev',
    role: "staff",
    active_workspace_id: 101,
    unapproved_periods: [1, 2, 3],
    telegram_token: "token",
    telegram_active: true,
    notification_settings: ["email_approve_period"],
    workspaces: [ { id: 1, name: "first workspace" } ]
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
      timezone: 'Europe/Kiev',
      role: 'staff',
      activeWorkspaceId: 101,
      telegramToken: 'token',
      telegramActive: true,
      notificationSettings: ["email_approve_period"],
      workspaces: [ { id: 1, name: "first workspace" } ]
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

  it('should update list of unapproving periods', () => {
    Vuex.Store.prototype.$i18n = { locale: 'en' }
    const store = new Vuex.Store({ state, mutations })
    store.commit('updatePersonalInfo', userInfo)
    expect(store.state.unapprovedPeriods).to.eql([1, 2, 3])
    delete Vuex.Store.prototype.$i18n
  })

  it('should keep user locale into localStorage', () => {
    Vuex.Store.prototype.$i18n = { locale: 'en' }
    localStorage.setItem("locale", 'en')
    const store = new Vuex.Store({ state, mutations })

    store.commit('updatePersonalInfo', userInfo)
    expect(localStorage.getItem("locale")).to.eq('ru')
    delete Vuex.Store.prototype.$i18n
  })
})
