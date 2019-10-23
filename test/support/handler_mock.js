import * as Handler from '@/services/api/handler';

function HandlerMock(){
  let handlerStub

  function FakeHandler(){ this.perform = (actionName, data=null) => {} }

  this.performStub = null

  this.stub = function(responseData){
    handlerStub = sinon.stub(Handler, 'default').callsFake((args) => {
      const handlerInstance = new FakeHandler(args)
      this.performStub = sinon.stub(handlerInstance, "perform").returns(responseData)
      return handlerInstance
    })
    return this.performStub
  }

  this.restore = function(){
    handlerStub.restore()
    this.performStub.restore()
  }

}

export default HandlerMock
