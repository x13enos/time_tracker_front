import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports';

describe("selectValueForMultipleRecords", () => {

  it('should return number of uniq values if them more than one', async () => {
    const wrapper = createWrapper(reports, {}, fakeStoreData())
    const tasks = [{ project_name: "first_project" }, { project_name: "second_project" }]

    expect(wrapper.vm.selectValueForMultipleRecords(tasks, "project_name")).to.eq(2)
  })

  it('should return value if all of tasks have that one', async () => {
    const wrapper = createWrapper(reports, {}, fakeStoreData())
    const tasks = [{ project_name: "first_project" }, { project_name: "first_project" }]

    expect(wrapper.vm.selectValueForMultipleRecords(tasks, "project_name")).to.eq("first_project")
  })

})
