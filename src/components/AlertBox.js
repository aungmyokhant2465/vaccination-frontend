import React from "react";
import '../styles/alertBox.css'

const AlertBox = ({ show, hide, confirm }) => {
    
    return (
        <section>
            <div className={ !show? "alert-content hide": 'alert-content show'}>
                <div>
                    <h3>Confirmation</h3>
                </div>
                <div>
                    <span>
                        Are you sure?
                    </span>
                </div>
                <div>
                    <button onClick={hide}>Cancel</button>
                    <button onClick={confirm}>Confirm</button>
                </div>
            </div>
        </section>
    )
}

export default AlertBox