export type MyEvent = {
    msg:string
}

export let push = (handle:(e:MyEvent) => void )=> (e:MyEvent)=> handle(e)


