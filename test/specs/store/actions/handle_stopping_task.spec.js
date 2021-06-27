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

  it('should parse assigned date from task and create luxon\'s datetime', async () => {
    const dateTimeStub = sinon.stub(DateTime, 'fromObject');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(dateTimeStub.calledOnceWith({ year: '2021', month: '1', day: '1' })).to.be.true;
    sinon.restore()
  });


  it('should update selected date with the assigned date from task', async () => {
    const newDate = DateTime.local();
    sinon.stub(DateTime, 'fromObject').returns(newDate);
    const commitStub = sinon.stub(commitObject, 'commit');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(commitStub.args[0]).to.eql(['updateSelectedDate', newDate]);
    sinon.restore()
  });

  it('should call action getWeeklyTasks if assigned date is not included in current week', async () => {
    const newDate = DateTime.local();
    sinon.stub(DateTime, 'fromObject').returns(newDate);
    const dispatchStub = sinon.stub(commitObject, 'dispatch');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(dispatchStub.calledOnceWith('getWeeklyTasks', newDate)).to.be.true;
    sinon.restore()
  })

  it('should clean up the current task', async () => {
    const commitStub = sinon.stub(commitObject, 'commit');
    await actions.handleStoppingTask(commitObject, { assigned_date: '1/1/2021' });

    expect(commitStub.args[1]).to.eql(['updateCurrentTask', null]);
    sinon.restore()
  })

})
