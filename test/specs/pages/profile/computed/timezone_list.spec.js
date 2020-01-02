import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava';
import profile from '@/pages/profile'
import Constants from "@/services/constants";

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);

test("it should collect list of options for timezone select", t => {
  const wrapper = shallowMount(profile, { localVue, store })
  t.deepEqual(wrapper.vm.timezoneList[0], {
    text: "International Date Line West - GMT-12",
    value: "Etc/GMT+12"
  })
});
