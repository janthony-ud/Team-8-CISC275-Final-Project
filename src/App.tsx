import React from "react";
//import { Container } from "react-bootstrap";
//import { Row } from "react-bootstrap";
//import { Col } from "react-bootstrap";
//import { Button } from "react-bootstrap";

import "./App.css";
import { CentralList } from "./components/CentralList";
import YourList from "./components/UserList";
import { UserDropdown } from "./components/UserDropdown";

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
                <div>
                    <UserDropdown
                        options={["user", "admin", "super"]}
                    ></UserDropdown>
                </div>
                <hr></hr>
                <YourList></YourList>
                <CentralList />
                <hr></hr>
            </div>
        </>
    );
}

export default App;
