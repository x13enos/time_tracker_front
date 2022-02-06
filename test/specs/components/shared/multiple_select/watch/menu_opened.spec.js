import createWrapper from '@/test/support/create_wrapper.js'
import MultipleSelect from '@/components/shared/multiple_select'

describe('menuOpened', () => {
  const propsData = {
    value: [1, 3],
    items: [
      { value: 1, name: "first tag" },
      { value: 2, name: "second tag" },
      { value: 3, name: "third tag" }
    ]
  }

  it('should emit "update" in case of closening menu', async () => {
    const wrapper = createWrapper(MultipleSelect, { propsData }, fakeStoreData())

    await wrapper.setData({ menuOpened: true })
    await wrapper.setData({ menuOpened: false })
    expect(wrapper.emitted('update').length).to.eq(1)
  });
});
