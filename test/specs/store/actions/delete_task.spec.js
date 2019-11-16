import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }

const success_response = {
  success: () => { return true },
  data: 'data'
}
const fail_response = {
  success: () => { return false },
  errors: "errors"
}

actions.$api = { deleteTimeRecord: () => {} }

test("it should call api for deleting time record", async t => {
  const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(success_response)
  await actions.deleteTask(commitObject, { data: 1 })
  t.true(apiStub.calledOnce)
  t.deepEqual(apiStub.args[0], [{ data: 1 }])
  apiStub.restore()
})

test("it should commit data if response is success", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(success_response)
  await actions.deleteTask(commitObject, { id: 1 })
  t.deepEqual(commitStub.args[0], [ 'deleteTask', 1 ])
  apiStub.restore()
  commitStub.restore()
})

test("it should return response", async t => {
  const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(success_response)
  const response = await actions.deleteTask(commitObject, { data: 1 })
  t.deepEqual(response, success_response)
  apiStub.restore()
})

// async deleteTask ({ commit }, data) {
//   const response = await this.$api.deleteTimeRecord(data)
//   if (response.success()) {
//     commit('deleteTask', data.id)
//   }
//   return response;
// }
