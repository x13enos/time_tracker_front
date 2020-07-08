import storeGetters from '@/store/getters'
import $appMethods from "@/services/global_methods";
import { DateTime } from 'luxon';

describe('dayIsBlocked', () => {
  const getters = Object.assign({}, storeGetters)

  it('should return true if day was blocked', () => {
    const state = {
      blockedDays: [
        $appMethods.systemFormatDate(DateTime.local(2019, 10, 27)),
        $appMethods.systemFormatDate(DateTime.local(2019, 10, 28))
      ]
    }
    const getter = getters.dayIsBlocked(state)
    const mockedNuxtInstance = { $config: { extensionEnabled: true } }
    const boundGetter = getter.bind(mockedNuxtInstance)

    expect(boundGetter('10/27/2019')).to.be.true
  })

  it("should return false if day wasn't blocked", () => {
    const state = {
      blockedDays: [
        $appMethods.systemFormatDate(DateTime.local(2019, 10, 27)),
        $appMethods.systemFormatDate(DateTime.local(2019, 10, 28))
      ]
    }
    const getter = getters.dayIsBlocked(state)
    const mockedNuxtInstance = { $config: { extensionEnabled: true } }
    const boundGetter = getter.bind(mockedNuxtInstance)

    expect(boundGetter('10/30/2019')).to.be.false
  })
});
