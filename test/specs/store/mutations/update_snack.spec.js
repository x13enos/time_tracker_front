import mutations from '@/store/mutations'

const state = {
  snack: {
    message: '',
    color: ''
  }
}

it('should update snack data', () => {
  mutations.updateSnack(state, { message: 'test', color: 'white' })
  expect(state.snack).to.eql({ message: 'test', color: 'white' })
})
