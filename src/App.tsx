import React from "react";
//import { Container } from "react-bootstrap";
//import { Row } from "react-bootstrap";
//import { Col } from "react-bootstrap";
//import { Button } from "react-bootstrap";

import "./App.css";
import { CentralList } from "./components/CentralList";

function App(): JSX.Element {
    return (
        <>
            <header className="App-header">
                <p>Movie Rating App</p>
            </header>
            <div className="App">
                <header className="App-header">
                    <p>Movie Rating App</p>
                </header>
                <hr></hr>
                <CentralList />
                <hr></hr>
            </div>
        </>
    );
}

export default App;
