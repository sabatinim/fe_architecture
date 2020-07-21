import * as React from "react";
import * as ReactDOM from "react-dom";
import TSConfirm from "./tsConfirmation/Confirm"
import JSConfirm from "./jsConfirmation/JSConfirm";
import {bridgeWith} from "./Bridge";
import {BoxConfiguration, BoxState, confirmKo, confirmOk} from "./tsConfirmation/domain/Confirm";
import {MyEvent, push} from "./eventBus/EventBus";
import {myJsHandler} from "./jsConfirmation/logic";

let boxState: BoxState = {title: "Title TS component", content: "Content TS component", confirmState: "to_confirm"}

let eventHandler = (e: MyEvent) => {
    console.log(e)
}
let boxConfig: BoxConfiguration =
    {
        box: boxState,
        confirmOk: confirmOk,
        confirmKo: confirmKo,
        push: push(eventHandler)
    }

let aComponent: JSX.Element = <TSConfirm box={boxConfig.box}
                                         confirmOk={boxConfig.confirmOk}
                                         confirmKo={boxConfig.confirmKo}
                                         push={push(eventHandler)}/>;

let jsComponent = <JSConfirm title="Title JS component"
                             content="Content JS component"
                             push={push(eventHandler)}/>;

let bridge: () => JSX.Element = bridgeWith(aComponent, jsComponent);

let App: React.FunctionComponent = () => {
    return <div className="App">
        {bridge()}
    </div>
}
type HtmlElement = HTMLElement | null;

let elementById: HtmlElement = document.getElementById("root");

ReactDOM.render(<App/>, elementById);