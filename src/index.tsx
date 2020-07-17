import * as React from "react";
import * as ReactDOM from "react-dom";
import TSConfirm from "./tsConfirmation/Confirm"
import JSConfirm from "./jsConfirmation/JSConfirm";
import {bridgeWith} from "./Bridge";

let aComponent:JSX.Element = <TSConfirm title="Title TS component"
                       content="Content TS component"/>;

let jsComponent = <JSConfirm title="Title JS component" content="Content JS component"/>;

let bridge: () => JSX.Element = bridgeWith(aComponent,jsComponent);

let App: React.FunctionComponent = () => {
    return <div className="App">
         {bridge()}
    </div>
}
type HtmlElement = HTMLElement | null;

let elementById: HtmlElement = document.getElementById("root");

ReactDOM.render(<App />, elementById);