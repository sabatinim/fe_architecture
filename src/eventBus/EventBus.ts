export class MyOtherEvent implements MyEvent {
    msg: string;
    constructor(msg:string) {
        this.msg = msg
    }
}

export interface MyEvent{
    msg:string
}

export let push = (handle:(e:MyEvent) => void )=> (e:MyEvent)=>{
    handle(e)
}

