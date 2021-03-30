import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day, days: [] }

describe('update', () => {

  it('shouldn\'t update time record if it\'s a new one', async () => {
    const storeData = fakeStoreData();
    storeData.state.currentTask = null;
    const wrapper = createWrapper(currentTask, { propsData }, storeData)
    const actionStub = sinon.stub(wrapper.vm, "updateTask")

    await wrapper.vm.update()
    expect(actionStub.called).to.be.false;
    sinon.restore()
  });

  context('if current task is present', () => {
    const storeData = fakeStoreData();
    storeData.state.currentTask = {
      id: 15
    }

    it('should call action for updating task and pass time record\'s data', async () => {
      const wrapper = createWrapper(currentTask, { propsData }, storeData);
      const actionStub = sinon.stub(wrapper.vm, "updateTask");
      sinon.stub(wrapper.vm, "formData").returns({ description: "text" });

      await wrapper.vm.update();
      expect(actionStub.calledOnceWith({
        description: "text",
        id: 15
      })).to.be.true;
      sinon.restore();
    });

    it('should add active param if that was passed', async () => {
      const wrapper = createWrapper(currentTask, { propsData }, storeData);
      const actionStub = sinon.stub(wrapper.vm, "updateTask");
      sinon.stub(wrapper.vm, "formData").returns({ description: "text" });

      await wrapper.vm.update(false);
      expect(actionStub.calledOnceWith({
        description: "text",
        id: 15,
        active: false
      })).to.be.true;
      sinon.restore();
    });

  });

})


// async update(active = undefined) {
//   if (!this.currentTask) { return }
//
//   const params = this.formData()
//   params.id = this.currentTask.id;
//   if (typeof active !== 'undefined')
//     params.active = active
//
//   await this.updateTask(params)
// },
