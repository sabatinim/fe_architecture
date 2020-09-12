import * as React from "react"

export const JSConfirm = (props) => {

    function onOkclick() {
        props.push({msg: "Clicked OK"})
        alert("Ok Clicked and OK event fired!")
    }
    function onCancelclick() {
        props.push({msg: "Clicked KO"})
        alert("Cancel Clicked and Cancel event fired!")
    }

    return <div className="confirm-wrapper confirm-visible">
        <div className="confirm-container-old">
            <div className="confirm-title-container">
                <span>{props.title}</span>
            </div>
            <div className="confirm-content-container">
                <p>{props.content}Content JS component</p>
            </div>
            <div className="confirm-buttons-container">
                <button className="confirm-cancel" onClick={onCancelclick}>Cancel</button>
                <button className="confirm-ok" onClick={onOkclick}>Okay</button>
            </div>
        </div>
    </div>
}
export default JSConfirm

