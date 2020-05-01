import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('containsEmptyData', () => {
  const propsData = {
    day: DateTime.local(),
    activeDay: false
  }

  it('should return true if projects numbers is 1 and description is empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = ""
    wrapper.vm.project = "1"

    expect(wrapper.vm.containsEmptyData()).to.be.true
  });

  it('should return true if project was not selected and description is empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }, { id: 2, name: "project2" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = ""
    wrapper.vm.project = ""

    expect(wrapper.vm.containsEmptyData()).to.be.true
  });

  it('should return false if number of projects is 1 and description is not empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = "test"

    expect(wrapper.vm.containsEmptyData()).to.be.false
  });

  it('should return false if project was selected and description is not empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }, { id: 2, name: "project2" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = "test"
    wrapper.vm.project = "2"

    expect(wrapper.vm.containsEmptyData()).to.be.false
  });
});
