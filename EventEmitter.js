class EventEmitter {
    constructor() {
      this.events = []  // events{event:[func1,func2]}
    }
   
    on(event, fn) {
      // 判断是否已经有event了
      if(typeof fn !== 'function') {
        throw new Error('fn must be a function')
        return
      }
   /*   if(event in this.events){  // this.events.hasOwnProperty(event)
        this.events[event].push(fn)
      }else{
        this.events[event] = [fn]
      } */
      (this.events.hasOwnProperty(event)? this.events[event] : this.events[event]=[]).push(fn)
    }
    
    emit(event,...args) {
      if(event in this.events) {
        for( let fn of this.events[event] ){  // 别用错for...in了
          fn(...args)
        }
      }else {
        throw new Error('I can not find this event')
      }
    }
    
    off(event, fn) {
      if(typeof fn !== 'function') {
        throw new Error('fn must be a function')
        return
      }
      
      if(event in this.events) {
        let index = this.events[event].indexOf(fn) // 一个函数多次监听事件，只删除一次
        this.events[event].splice(index,1)
      }else {
        throw new Error('I can not find this event')
      }
    }
  }