import test from 'ava';
import mutations from '@/store/mutations'

const state = {
  snack: {
    message: "",
    color: ""
  }
}

test("it should update snack data", t => {
  mutations.updateSnack(state, { message: "test", color: "white" })
  t.deepEqual(state.snack, { message: "test", color: "white" })
})
