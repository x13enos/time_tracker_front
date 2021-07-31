import createWrapper from '@/test/support/create_wrapper.js'
import DescriptionInput from '@/components/tasks/inputs/description'

describe('updateDescription', () => {

  it('should emit description', () => {
    const wrapper = createWrapper(DescriptionInput, { description: null }, fakeStoreData())

    wrapper.vm.updateDescription({ target: { value: 'text' } })
    expect(wrapper.emitted("update")[0]).to.eql(['text'])
  });

});
