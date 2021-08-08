import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('mounted', () => {

  describe("fetch projects", () => {
    const mocks = {
      $api: {
        allProjects: () => ({ data: [{ name: 'Project', id: 11 }] }),
        getUsersByCurrentWorkspace: () => ({ data: [{ name: 'John', id: 11 }] })
      }
    }  

    it("should call the endpoint for getting projects", async () => {
      const endpointStub = sinon.stub(mocks.$api, 'allProjects').returns({ data: [{ name: 'Project', id: 11 }] })
      const wrapper = await createWrapper(Projects, { mocks }, fakeStoreData())
      
      await wrapper.vm.$nextTick();
      expect(endpointStub.calledOnce).to.be.true
      sinon.restore()
    });
  
    it('should keep projects from recieved data if request was successful', async () => {
      const wrapper = await createWrapper(Projects, { mocks }, fakeStoreData())
  
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.projects).to.eql([{ name: 'Project', id: 11 }])
      sinon.restore()
    })
  })

  describe("fetch users", () => {
    const mocks = {
      $api: {
        allProjects: () => ({ data: [{ name: 'Project', id: 11 }] }),
        getUsersByCurrentWorkspace: () => ({ data: [{ name: 'John', id: 11 }] })
      }
    }  

    it("should call the endpoint for getting users", async () => {
      const endpointStub = sinon.stub(mocks.$api, 'getUsersByCurrentWorkspace').returns({ data: [{ name: 'John', id: 11 }] });
      const wrapper = await createWrapper(Projects, { mocks }, fakeStoreData());
  
      await wrapper.vm.$nextTick();
      expect(endpointStub.called).to.be.true;
      sinon.restore();
    });

    it('should keep users from recieved data if request was successful', async () => {
      const wrapper = await createWrapper(Projects, { mocks }, fakeStoreData())
  
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])
      sinon.restore()
    })
  });
});
