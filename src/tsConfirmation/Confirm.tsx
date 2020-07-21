import * as React from "react"
import {useState} from "react"
import "./Confirm.css"
import {BoxConfiguration, BoxState} from "./domain/Confirm";

let Confirm: React.FunctionComponent<BoxConfiguration> = (props: BoxConfiguration) => {
    const initialState:BoxState = {title:props.box.title,content:props.box.content,confirmState:"to_confirm"}
    const [confirmState, setState] = useState(initialState);

    let onClickOk = ()=>{
        props.push({msg: "Clicked OK"})

        setState(props.confirmOk(confirmState))
    }

    let onClickKo = ()=>{
        props.push({msg: "Clicked Cancel"})

        setState(props.confirmKo(confirmState))
    }

    return <div className="confirm-wrapper confirm-visible">
        <div className="confirm-container">
            <div className="confirm-title-container">
                <span>{confirmState.title}</span>
            </div>
            <div className="confirm-content-container">
                <p>{confirmState.content}</p>
            </div>
            <div className="confirm-buttons-container">
                <button className="confirm-cancel" onClick={onClickKo}>Cancel</button>
                <button className="confirm-ok" onClick={onClickOk}>Okay</button>
            </div>
        </div>
    </div>
}

//Make Confirm public
export default Confirm

