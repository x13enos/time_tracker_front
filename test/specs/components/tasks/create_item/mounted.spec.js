import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

 describe('mounted', () => {
   const day = DateTime.local();
   const propsData = { activeDay: false, day, dayIsBlocked: false }

   it('should select project if it is only one in list', () => {
     const store = fakeStoreData()
     store.state.projects = [{ id: 15, name: "First" }]
     const wrapper = createWrapper(task, { propsData }, store)

     expect(wrapper.vm.project).to.eq(15)
   });
 });
