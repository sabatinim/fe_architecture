type ToConfirm = "to_confirm"
type Confirmed = "confirmed"
type NotConfirmed = "not_confirmed"

export type BoxState = {
    title: string
    content: string
    confirmState?: Confirmed | NotConfirmed | ToConfirm
}

function confirmedBoxStateWith(title: string, content: string):BoxState {
    return {title: title, content: content, confirmState: "confirmed"};
}

function notConfirmedBoxStateWith(title: string, content: string):BoxState {
    return {title: title, content: content, confirmState: "not_confirmed"};
}

export let confirmOk = (from:BoxState):BoxState => {
    switch (from.confirmState) {
        case "to_confirm":return  confirmedBoxStateWith(from.title, "You have confirmed!!!")
        case "confirmed": return  confirmedBoxStateWith(from.title, "You have confirmed yet!!!")
    }
    return  from
}

export let confirmKo = (from:BoxState):BoxState => {
    switch (from.confirmState) {
        case "to_confirm": return  notConfirmedBoxStateWith(from.title, "You don't have confirmed!!!")
        case "not_confirmed": return   notConfirmedBoxStateWith(from.title, "You don't have confirmed yet!!!")
    }
    return from
}