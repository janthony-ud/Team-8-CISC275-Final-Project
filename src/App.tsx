import { useState } from "react";
import { Button } from "react-bootstrap";
import * as React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { ChooseRole } from "./components/ChooseRole";
import "./App.css";
import { CentralList } from "./components/CentralList";
import YourList from "./components/UserList";
import { UserName } from "./components/Users";
//import { UserDropdown } from "./components/UserDropdown";

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
        <ThemeProvider>
            <>
                <div className="App">
                    <header className="App-header">
                        <p>Movie Rating App</p>
                        <p className="Header-names">
                            Team 8: Justin Anthony, Meghan Gamble, Brad
                            Daughtery, Jakeb Milburn, Ryan Sanchez
                        </p>
                    </header>
                    <ChooseRole />
                    <Button onClick={flipVisibilityuser}>User</Button>
                    {visibleuser && <YourList></YourList>}
                    <Button onClick={flipVisibilityad}>Admin</Button>
                    {visiblead && <CentralList />}
                    <Button onClick={flipVisibilitysuper}>Super</Button>
                    {visiblesuper && <div>42</div>}
                    <hr></hr>
                </div>
                <UserName Names={["Jake", "Ryan", "Meg"]}></UserName>
            </>
        </ThemeProvider>
    );
}

export default App;
