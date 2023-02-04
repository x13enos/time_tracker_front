import actions from '@/store/actions';
import { DateTime } from 'luxon';

describe("handleStoppingTask", () => {
  let commitObject;

  before(() => {
    commitObject = {
      commit: (type, payload) => {},
      dispatch: (type, payload) => {},
      getters: { weekDays: [] }
    }
  });

  it('should call method for updating selected date', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(dispatchStub.calledOnceWith('updateSelectedDate', ['1', '1', '2021'])).to.be.true;
    sinon.restore()
  });

  it('should clean up the current task', async () => {
    const commitStub = sinon.stub(commitObject, 'commit');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(commitStub.calledOnceWith('updateCurrentTask', null)).to.be.true;
    sinon.restore()
  })

})
