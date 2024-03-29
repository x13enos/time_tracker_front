import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

 describe('mounted', () => {

   it('should select project if it is only one in list', () => {
     const store = fakeStoreData()
     store.state.projects = [{ id: 15, name: "First" }]
     const wrapper = createWrapper(task, {}, store)

     expect(wrapper.vm.project).to.eq(15)
   });
 });
