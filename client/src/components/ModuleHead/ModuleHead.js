
import React from "react";
import "./ModuleHead.css";
// import logo from '../../logo.svg';

const ModuleHead = (props) => {
    return (
        <header className="App-header flex-container">
            <div className="headerLeft">
                <p>
                    Add a book
                </p>
            </div>
            <div className="headerMiddle">
                <h1 className="App-title">mE.dition</h1>
            </div>
            <div className="headerRight">
                <p>
                    Search Library {props.count}
                </p>
            </div>
        </header>
    );
};

export default ModuleHead;

