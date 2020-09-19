import * as React from "react";
import * as ReactDOM from "react-dom";
import TSConfirm from "./tsConfirmation/Confirm"
import JSConfirm from "./jsConfirmation/JSConfirm";
import {bridgeWith} from "./Bridge";
import {BoxConfiguration} from "./tsConfirmation/domain/Confirm";
import {MyEvent, push} from "./eventBus/EventBus";

//TS react component configuration
const eventHandler = (e: MyEvent) => console.log(e)

const boxConfig: BoxConfiguration = {
    box: {title: "Title TS component", content: "Content TS component", confirmState: "to_confirm"},
    push: push(eventHandler)
}

let aComponent: JSX.Element = <TSConfirm box={boxConfig.box}
                                         push={push(eventHandler)}/>;

//Javascript react component configuration
export const myJsHandler = (e:any) => console.log(e)

let jsComponent = <JSConfirm title="Title JS component"
                             content="Content JS component"
                             push={push(myJsHandler)}/>;

let bridge: () => JSX.Element = bridgeWith(aComponent, jsComponent);

let App: React.FunctionComponent = () => {
    return <div className="App">
        {bridge()}
    </div>
}
type HtmlElement = HTMLElement | null;

let elementById: HtmlElement = document.getElementById("root");

ReactDOM.render(<App/>, elementById);