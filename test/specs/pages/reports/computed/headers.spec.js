import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test("it should return the right headers with total amount", async t => {
  const wrapper = shallowMount(reports, { localVue, store })

  wrapper.vm.totalAmount = 110.25

  t.deepEqual(wrapper.vm.headers, [
    { text: 'Project', value: 'node.project.name' },
    { text: 'Date', value: 'node.assignedDate' },
    { text: 'Employee', value: 'node.user.name' },
    { text: 'Description', value: 'node.description' },
    { text: `Amount(110.25)`, value: 'node.spentTime' }
  ])

})
