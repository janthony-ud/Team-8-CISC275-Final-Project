import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
//import { Container } from "react-bootstrap";
//import { Row } from "react-bootstrap";
//import { Col } from "react-bootstrap";
//import { Button } from "react-bootstrap";

import "./App.css";
import { CentralList } from "./components/CentralList";
import YourList from "./components/UserList";
import { UserDropdown } from "./components/UserDropdown";

function App(): JSX.Element {
    const [visibleuser, setVisibleuser] = useState<boolean>(false);
    const [visiblead, setVisiblead] = useState<boolean>(false);
    const [visiblesuper, setVisiblesuper] = useState<boolean>(false);

    function flipVisibilityuser(): void {
        setVisibleuser(!visibleuser);
    }
    function flipVisibilityad(): void {
        setVisiblead(!visiblead);
    }
    function flipVisibilitysuper(): void {
        setVisiblesuper(!visiblesuper);
    }
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
                Please Select Your Role:
                <Button onClick={flipVisibilityuser}>User</Button>
                {visibleuser && <YourList></YourList>}
                <Button onClick={flipVisibilityad}>Admin</Button>
                {visiblead && <CentralList />}
                <Button onClick={flipVisibilitysuper}>Super</Button>
                {visiblesuper && <div>42</div>}
                <hr></hr>
            </div>
        </>
    );
}

export default App;
