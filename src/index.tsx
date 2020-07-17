import * as React from "react";
import * as ReactDOM from "react-dom";
import Confirm from "./tsConfirmation/Confirm"
import JSConfirm from "./jsConfirmation/JSConfirm";

import {bridgeWith} from "./Bridge";

let aComponent:JSX.Element = <Confirm title="Component A title"
                       content="Component A content"/>;

let anotherComponent = <JSConfirm title="Title JS component" content="Content JS component"/>;

let bridge: () => JSX.Element = bridgeWith(aComponent,anotherComponent);

let App: React.FunctionComponent = () => {
    return <div className="App">
         {bridge()}
    </div>
}
type HtmlElement = HTMLElement | null;

let elementById: HtmlElement = document.getElementById("root");

ReactDOM.render(<App />, elementById);