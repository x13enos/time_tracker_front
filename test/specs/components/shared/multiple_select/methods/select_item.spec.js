import createWrapper from '@/test/support/create_wrapper.js'
import MultipleSelect from '@/components/shared/multiple_select'

describe('selectItem', () => {
  it('should remove item from list if it is existed', () => {
    const propsData = {
      value: [1, 3],
      items: [
        { value: 1, name: "first tag" },
        { value: 2, name: "second tag" },
        { value: 3, name: "third tag" }
      ]
    }

    const storeData = fakeStoreData()
    const wrapper = createWrapper(MultipleSelect, { propsData }, storeData)
    wrapper.vm.selectItem(1)

    expect(wrapper.emitted("input")[0][0]).to.eql([3])
  });

  it('should add item to list and emitted this', () => {
    const propsData = {
      value: [1],
      items: [
        { value: 1, name: "first tag" },
        { value: 2, name: "second tag" },
        { value: 3, name: "third tag" }
      ]
    }

    const storeData = fakeStoreData()
    const wrapper = createWrapper(MultipleSelect, { propsData }, storeData)
    wrapper.vm.selectItem(3)

    expect(wrapper.emitted("input")[0][0]).to.eql([1, 3])
  });
});
