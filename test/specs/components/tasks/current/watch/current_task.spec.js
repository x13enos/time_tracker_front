import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

 describe('currentTask', () => {
   const day = DateTime.local();
   const propsData = { day }

   describe('currentTask was received', () => {
     const currentTaskData = {
       id: 15,
       description: "First",
       project: 1,
       tagIds: [],
       assignedDate: '19/03/2021',
       spentTime: 0.75
     }

     it('should assign data from current task to component\'s data', () => {
       const store = fakeStoreData();
       const wrapper = createWrapper(currentTask, { propsData }, store);

       wrapper.vm.$options.watch.currentTask.call(wrapper.vm, currentTaskData);
       wrapper.vm.$nextTick(() => {
         expect(wrapper.vm.description).to.eq('First');
         expect(wrapper.vm.project).to.eq(1);
         expect(wrapper.vm.tagIds).to.eql([]);
         expect(wrapper.vm.assignedDate).to.eq('19/03/2021');
         expect(wrapper.vm.spentTime).to.eq('0.75');
       });
     });

     it('should launch timer', () => {
       const store = fakeStoreData();
       const wrapper = createWrapper(currentTask, { propsData }, store);
       const startMethodStub = sinon.stub(wrapper.vm, 'start');

       wrapper.vm.$options.watch.currentTask.call(wrapper.vm, currentTaskData);
       expect(startMethodStub.calledOnce).to.be.true;
       sinon.restore();
     });
   });

   describe('currentTask is null', () => {
     it('should clear timer', () => {
       const store = fakeStoreData();
       const wrapper = createWrapper(currentTask, { propsData }, store);
       const clearTimerStub = sinon.stub(wrapper.vm, 'clearIntervalId');

       wrapper.vm.$options.watch.currentTask.call(wrapper.vm, null);
       expect(clearTimerStub.calledOnce).to.be.true;
       sinon.restore();
     });

     it('should clear components data', () => {
       const store = fakeStoreData();
       const wrapper = createWrapper(currentTask, { propsData }, store);
       Object.assign(wrapper.vm, {
         description: "First",
         project: 1,
         tagIds: [1, 2],
         assignedDate: '19/03/2021',
         spentTime: '0.75'
       })

       wrapper.vm.$options.watch.currentTask.call(wrapper.vm, null);
       wrapper.vm.$nextTick(() => {
         expect(wrapper.vm.description).to.be.null;
         expect(wrapper.vm.project).to.be.null;
         expect(wrapper.vm.tagIds).to.eql([]);
         expect(wrapper.vm.assignedDate).to.be.null;
         expect(wrapper.vm.spentTime).to.be.null;
       });
     });
   });
 });
