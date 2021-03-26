import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'
import { DateTime } from 'luxon'

describe('destroyed', () => {

  it('should set interval id to component data', () => {
    const timeStub = sinon.useFakeTimers();
    const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77);
    const clearIntervalStub = sinon.stub(timeStub, 'clearInterval');
    createWrapper(tasks, {}, fakeStoreData()).destroy();

    expect(clearIntervalStub.args[0]).to.eql([77]);
    sinon.restore();
  });

});
