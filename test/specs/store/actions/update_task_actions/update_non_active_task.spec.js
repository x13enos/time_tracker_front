import actions from '@/store/actions';

describe("updateNonActiveTask", () => {
  const commitObject = {
    commit: (type, payload) => {},
    dispatch: (type, payload) => {},
  }

  const successResponse = {
    success: () => { return true },
    data: 'data'
  }
  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { updateTimeRecord: () => {} }
  })

  it('should call api for updating time record', async () => {
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateNonActiveTask(commitObject, { params: "params" })
    expect(apiStub.calledOnceWith({ params: "params" })).to.be.true
    sinon.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateNonActiveTask(commitObject, { params: "params" })
    expect(commitStub.args[0]).to.eql(['updateTask', 'data' ])
    sinon.restore()
  })

  it('should call action for stopping other tasks if active param is true', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch')
    sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateNonActiveTask(commitObject, { active: true })
    expect(dispatchStub.calledOnceWith('stopOtherTasks')).to.be.true;
    sinon.restore()
  })

  it('should call commit for updating current task if active param is true', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateNonActiveTask(commitObject, { active: true })
    expect(commitStub.args[0]).to.eql(['updateCurrentTask', 'data' ]) // commitStub would be called twice for updating currentTask and task in list
    sinon.restore()
  })

  it('should return response', async () => {
    sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)
    const response = await actions.updateNonActiveTask(commitObject, { params: "data" })
    expect(response).to.eql(successResponse)
    sinon.restore()
  })

})

// async updateNonActiveTask ({ commit, dispatch }, params) {
//   const response = await this.$api.updateTimeRecord(params)
//   if (params.active === true) {
//     await dispatch('stopOtherTasks')
//     commit('updateCurrentTask', response.data)
//   }
//   commit('updateNonActiveTask', response.data)
//   return response;
// },