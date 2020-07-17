import * as React from "react"
import {logic} from "./logic";

export const JSConfirm = (props)=>
         <div className="confirm-wrapper confirm-visible">
            <div className="confirm-container-old">
                <div className="confirm-title-container">
                    <span>{props.title}</span>
                </div>
                <div className="confirm-content-container">
                    <p>{props.content}Content JS component</p>
                </div>
                <div className="confirm-buttons-container">
                    <button className="confirm-cancel" onClick={() => logic("KO")} >Cancel</button>
                    <button className="confirm-ok" onClick={() => logic("OK")}>Okay</button>
                </div>
            </div>
        </div>

export default JSConfirm

