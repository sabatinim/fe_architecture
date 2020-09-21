import * as React from "react"
import {useState} from "react"
import "./Confirm.css"
import {BoxConfiguration, BoxState} from "./domain/Confirm";

let Confirm: React.FunctionComponent<BoxConfiguration> = (props: BoxConfiguration) => {
    const initialState:BoxState = {title:props.box.title,content:props.box.content,confirmState:props.box.confirmState}
    const [confirmState] = useState(initialState);

    let onClickOk = ()=>{
        props.push({msg: "Clicked OK"})
        alert("Ok Clicked and OK event fired!")
    }

    let onClickKo = ()=>{
        props.push({msg: "Clicked Cancel"})
        alert("Cancel Clicked and Cancel event fired!")
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