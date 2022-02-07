class MSEventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, callBackFn, thisArg) {
    let handler = this.eventBus[eventName];
    if (!handler) {
      handler = [];
      this.eventBus[eventName] = handler;
    }
    this.eventBus[eventName].push({
      callBackFn,
      thisArg: thisArg ? thisArg : globalThis
    })
  }

  emit(eventName, ...payload) {
    const targetEvent = this.eventBus[eventName];
    if (targetEvent.length === 0) throw new Error('not found event');
    targetEvent.forEach(item => {
      item.callBackFn.apply(item.thisArg, payload);
    })
  }

  off(eventName, callBackFn) {
    const removeEvent = this.eventBus[eventName];
    if (!removeEvent.length === 0) throw new Error('not found event');

    const targetIndex = removeEvent.findIndex(item => item.callBackFn === callBackFn);
    if (targetIndex === -1) throw new Error('not found funciton');
    removeEvent.splice(targetIndex, 1);
  }
}

const eventBus = new MSEventBus();
const info = {
  name: 'miles',
  age: 30
}


const foo = function (a1, a2) {
  console.log('click1');
  console.log(a1, a2);
  console.log(this);
}
eventBus.on('click1', foo) // 註冊

eventBus.emit('click1', 'haha', 'qqq') // 調用

eventBus.off('click1', foo) // 刪除

