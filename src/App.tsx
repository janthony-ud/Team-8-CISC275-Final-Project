import { useState } from "react";
import { Button } from "react-bootstrap";
import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { ChooseRole } from "./components/ChooseRole";
import "./App.css";
import { CentralList } from "./components/CentralList";
import YourList from "./components/UserList";
import { AddUser } from "./components/User";
import { UserName } from "./components/Users";

function App(): JSX.Element {
    const [role, setRole] = useState<string>("");

    function userRole(UR: string): void {
        setRole(UR);
        if (UR == "User") {
            <YourList></YourList>;
        } else if (UR == "Admin") {
            <CentralList />;
        } else {
            <div>42</div>;
        }
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
                    <AddUser />
                    <ChooseRole />
                    <Button onClick={() => userRole("User")}>User</Button>
                    {role == "User" && <YourList></YourList>}
                    <Button onClick={() => userRole("Admin")}>Admin</Button>
                    {/* showing central list - wasn't displaying before aft pull, i needed to see it for testing sorting*/}
                    <br></br>**Rendering central list here for testing - see
                    App.tsx**
                    <CentralList></CentralList>
                    <Button onClick={() => userRole("Super")}>Super</Button>
                    <hr></hr>
                </div>
                <UserName Names={["Jake", "Ryan", "Meg"]}></UserName>
            </>
        </ThemeProvider>
    );
}

export default App;

/*                     if (role == user) {
                        <YourList></YourList>;
                    } else if (role == admin) {
                        <CentralList />;
                    } else {
                        42;
                    } */

/*     const [visibleuser, setVisibleuser] = useState<boolean>(false);
    const [visiblead, setVisiblead] = useState<boolean>(false);
    const [visiblesuper, setVisiblesuper] = useState<boolean>(false); */

/*     <>
        <div className="App">
            <header className="App-header">
                <p>Movie Rating App</p>
                <p className="Header-names">
                    Team 8: Justin Anthony, Meghan Gamble, Brad Daughtery, Jakeb
                    Milburn, Ryan Sanchez
                </p>
            </header>
            <User />
            <UList />
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
    </>; */
