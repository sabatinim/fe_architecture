export type MyEvent = { msg:string }
export const push = (handle:(e:MyEvent) => void )=> (e:MyEvent)=> handle(e)