import storeActions from '@/store/actions';
import BlockedDaysSearcher from "@/services/blocked_days_searcher";

describe("approveTimeReport", () => {
  const commitObject = {
    commit: (type, payload) => {},
    state: {
      unapprovedPeriods: [{
        from: '11/02/2020',
        id: 1,
        to: '12/02/2020'
      }],
      tasks: {}
    }
  }

  it('should call api for approving time report', async () => {
    const actions = Object.assign({}, storeActions)
    const mockedNuxtInstance = {
      app: { $config: { extensionEnabled: true } },
      $api: { approveTimeReport: () => {} }
    }
    const apiStub = sinon.stub(mockedNuxtInstance.$api, 'approveTimeReport')
    const boundAction = actions.approveTimeReport.bind(mockedNuxtInstance)

    await boundAction(commitObject, 1)
    expect(apiStub.calledOnceWith(1)).to.be.true
    sinon.restore()
  })

  it('should call mutation of removing period from store', async () => {
    const actions = Object.assign({}, storeActions)
    const mockedNuxtInstance = {
      app: { $config: { extensionEnabled: true } },
      $api: { approveTimeReport: () => {} }
    }
    const mutationStub = sinon.stub(commitObject, "commit")
    sinon.stub(mockedNuxtInstance.$api, 'approveTimeReport')
    const boundAction = actions.approveTimeReport.bind(mockedNuxtInstance)

    await boundAction(commitObject, 1)

    expect(mutationStub.calledOnceWith("removeUnapprovedTimePeriod", 1)).to.be.true
    sinon.restore()
  })

  context('when extension is enabled', () => {
    let boundAction;

    beforeEach(() => {
      const actions = Object.assign({}, storeActions)
      const mockedNuxtInstance = {
        app: { $config: { extensionEnabled: true } },
        $api: { approveTimeReport: () => {} }
      }
      boundAction = actions.approveTimeReport.bind(mockedNuxtInstance)
    });

    it('should commit blocked days if they were found', () => {
      commitObject.state = {
        unapprovedPeriods: [{
          from: '11/02/2020',
          id: 1,
          to: '12/02/2020'
        }],
        tasks: { '11/02/2020': {} }
      }
      const mutationStub = sinon.stub(commitObject, "commit")

      boundAction(commitObject, 1)
      expect(mutationStub.args[0]).to.eql(["updateBlockedDays", ["11/02/2020"]]);
      sinon.restore();
    });

    it('should not commit blocked days if they were not found', () => {
      commitObject.state = {
        unapprovedPeriods: [{
          from: '11/02/2020',
          id: 1,
          to: '12/02/2020'
        }],
        tasks: { '15/02/2020': {} }
      }
      const mutationStub = sinon.stub(commitObject, "commit")

      boundAction(commitObject, 1)
      expect(mutationStub.called).to.be.false;
      sinon.restore();
    });

  });
})
