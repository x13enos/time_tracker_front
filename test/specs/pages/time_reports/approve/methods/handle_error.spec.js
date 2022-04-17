import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportApprove from '@/pages/time_reports/approve';

describe('handleError', () => {
  
  const successResponse = {
    success: () => { return true }
  }

  it('should change errors message', async () => {
    const $api = { approveTimeReport: () => { return successResponse } }
    const $route = { query: { token: "2222", workspace_id: 1, period_id: 2 } }
    const wrapper = createWrapper(TimeReportApprove, { mocks: { $route, $api } }, fakeStoreData())
    
    wrapper.vm.handleError({ errors: { base: ['Data error'] }, dates: ["2021-10-28", "2021-10-29"] })
    const message = `Data error <a href='/tasks?date=2021-10-28' class="red--text">2021-10-28</a>, <a href='/tasks?date=2021-10-29' class="red--text">2021-10-29</a>`
    expect(wrapper.vm.errorMessages).to.eq(message)
  });

});