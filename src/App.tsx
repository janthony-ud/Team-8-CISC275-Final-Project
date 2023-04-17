import React from "react";
//import { Container } from "react-bootstrap";
//import { Row } from "react-bootstrap";
//import { Col } from "react-bootstrap";
//import { Button } from "react-bootstrap";

import "./App.css";
import { CentralList } from "./components/CentralList";
import YourList from "./components/UserList";

function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <p>Movie Rating App</p>
                    <p className="Header-names">
                        Team 8: Justin Anthony, Meghan Gamble, Brad Daughtery,
                        Jakeb Milburn, Ryan Sanchez
                    </p>
                </header>
                <hr></hr>
                <YourList></YourList>
                <CentralList />
                <hr></hr>
            </div>
        </>
    );
}

export default App;
