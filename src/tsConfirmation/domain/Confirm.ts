import {MyEvent} from "../../eventBus/EventBus";

type ToConfirm = "to_confirm"
type Confirmed = "confirmed"
type NotConfirmed = "not_confirmed"

export type BoxState = {
    title: string
    content: string
    confirmState: Confirmed | NotConfirmed | ToConfirm
}

export type BoxConfiguration = {
    box:BoxState
    push:(e:MyEvent) => void
}