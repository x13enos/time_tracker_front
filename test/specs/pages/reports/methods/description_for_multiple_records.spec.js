import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports';

describe("descriptionForMultipleRecords", () => {
  it('should return substring from first task and number of other', async () => {
    const wrapper = createWrapper(reports, {}, fakeStoreData())
    const tasks = [{ description: "EX-122 test task and his description" }, { project_name: "first_project" }]

    expect(wrapper.vm.descriptionForMultipleRecords(tasks)).to.eq(`EX-122 test task and... reports.more_tasks`)
  })
})
