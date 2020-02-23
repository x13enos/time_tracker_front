import mutations from '@/store/mutations'

describe('cleanTasksStartTime', () => {
  const state = {
    tasks: {
      "1572123600": {
        "1": {
          id: 1,
          project: 2,
          description: "text",
          spentTime: 1.5,
          timeStart: "time"
        }
      }
    }
  }

  it('should clear time start for task', () => {
    mutations.cleanTasksStartTime(state)
    expect(state.tasks["1572123600"]["1"].timeStart).to.eq(null)
  })
});
