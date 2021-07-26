import actions from '@/store/actions';
import { DateTime } from 'luxon';

describe("updateSelectedDate", () => {
  let commitObject;

  before(() => {
    commitObject = {
      commit: (type, payload) => {},
      dispatch: (type, payload) => {},
      getters: { weekDays: [] }
    }
  });

  it('should create luxon\'s datetime from passed date', async () => {
    const dateTimeStub = sinon.stub(DateTime, 'fromObject');
    await actions.updateSelectedDate(commitObject, ['1', '1', '2021']);

    expect(dateTimeStub.calledOnceWith({ year: '2021', month: '1', day: '1' })).to.be.true;
    sinon.restore()
  });

  it('should update selected date with the assigned date from task', async () => {
    const newDate = DateTime.local();
    sinon.stub(DateTime, 'fromObject').returns(newDate);
    const commitStub = sinon.stub(commitObject, 'commit');
    await actions.updateSelectedDate(commitObject, ['1', '1', '2021']);

    expect(commitStub.args[0]).to.eql(['updateSelectedDate', newDate]);
    sinon.restore()
  });

  it('should call action getWeeklyTasks if assigned date is not included in current week', async () => {
    const newDate = DateTime.local();
    sinon.stub(DateTime, 'fromObject').returns(newDate);
    const dispatchStub = sinon.stub(commitObject, 'dispatch');
    await actions.updateSelectedDate(commitObject, ['1', '1', '2021']);

    expect(dispatchStub.calledOnceWith('getWeeklyTasks', newDate)).to.be.true;
    sinon.restore()
  })

})
