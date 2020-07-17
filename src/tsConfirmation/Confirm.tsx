import * as React from "react"
import {useState} from "react"
import "./Confirm.css"
import {BoxState, confirmKo, confirmOk} from "./domain/Confirm";

let Confirm: React.FunctionComponent<BoxState> = (props: BoxState) => {
    const initialState:BoxState = {title:props.title,content:props.content,confirmState:"to_confirm"}
    const [confirmState, setState] = useState(initialState);

    return <div className="confirm-wrapper confirm-visible">
        <div className="confirm-container">
            <div className="confirm-title-container">
                <span>{confirmState.title}</span>
            </div>
            <div className="confirm-content-container">
                <p>{confirmState.content}</p>
            </div>
            <div className="confirm-buttons-container">
                <button className="confirm-cancel" onClick={() => setState(confirmKo(confirmState))} >Cancel</button>

                <button className="confirm-ok" onClick={() => setState(confirmOk(confirmState))}>Okay</button>
            </div>
        </div>
    </div>
}

//Make Confirm public
export default Confirm

