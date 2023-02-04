import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe('filters', () => {
  const mocks = { $api: {
    allTimeRecords: () => { return { success: () => { return false } } },
    allTags: () => { return { data: [] } }
  } }

  it('should call method for fetching tasks if from and to dates were chose', async () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

    await wrapper.setData({ filters: {
      fromDate: '2019-10-21',
      toDate: '2019-10-22'
    } })

    expect(methodSpy.calledOnce).to.be.true

    sinon.restore()
  })

  it('should not call method for fetching tasks if fromDate is empty', async () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

    await wrapper.setData({ filters: {
      fromDate: null,
      toDate: '2019-10-22'
    } })

    expect(methodSpy.called).to.be.false

    sinon.restore()
  })

  it('should not call method for fetching tasks if toDate is empty', async () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

    await wrapper.setData({ filters: {
      fromDate: '2019-10-22',
      toDate: null
    } })

    expect(methodSpy.called).to.be.false

    sinon.restore()
  })
})
