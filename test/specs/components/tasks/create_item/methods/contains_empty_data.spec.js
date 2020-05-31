import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('containsEmptyData', () => {
  const propsData = {
    day: DateTime.local(),
    activeDay: false,
    dayIsBlocked: false
  }

  it('should return true if projects numbers is 1, description is empty and tagIds is empty as well', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = ""
    wrapper.vm.project = "1"
    wrapper.vm.tagIds = []

    expect(wrapper.vm.containsEmptyData()).to.be.true
  });

  it('should return true if project was not selected, description is empty and tagIds as well', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }, { id: 2, name: "project2" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = ""
    wrapper.vm.project = ""
    wrapper.vm.tagIds = []

    expect(wrapper.vm.containsEmptyData()).to.be.true
  });

  it('should return false if description is not empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = "test"
    wrapper.vm.tagIds = []

    expect(wrapper.vm.containsEmptyData()).to.be.false
  });

  it('should return false if tagIds is not empty', () => {
    const data = fakeStoreData()
    data.state.projects = [{ id: 1, name: "project" }]
    const wrapper = createWrapper(task, { propsData }, data)
    wrapper.vm.description = ""
    wrapper.vm.tagIds = [1]

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
