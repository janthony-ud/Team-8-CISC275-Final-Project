import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import chosenUser from "./components/ChooseRole";
import "./App.css";
import { CentralList } from "./components/CentralList";
//import ChooseUser from "./components/User";

function App(): JSX.Element {
    return (
        <ThemeProvider>
            <div className="App">
                <header className="App-header">
                    <p>Welcome to Movies.com</p>
                    <p className="Header-names">
                        Team 8: Justin Anthony, Meghan Gamble, Brad Daughtery,
                        Jakeb Milburn, Ryan Sanchez
                    </p>
                </header>
                {chosenUser}
                {/* showing central list - wasn't displaying before aft pull, i needed to see it for testing sorting*/}
                <br></br>
                <br></br>
                --------------------------------------------------------
                <br></br>**Rendering central list here for testing - see
                App.tsx**
                <CentralList></CentralList>
            </div>
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
