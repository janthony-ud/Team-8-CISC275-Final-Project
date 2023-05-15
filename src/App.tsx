import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import chosenUser from "./components/ChooseRole";
import "./App.css";
//import CentralList from "./components/CentralList";
//import { Movie } from "./interfaces/movie";
//import movieList from "./data/movieList.json";
//import ChooseUser from "./components/User";
import { Image } from "@chakra-ui/core";
//rebuild site
function App(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return (
        <ThemeProvider>
            <div className="App">
                <header className="App-header">
                    <div className="logo">
                        <Image
                            borderRadius="md"
                            htmlHeight="30px"
                            objectFit="cover"
                            src={require("./movieo-logo.png")}
                            alt="Movieo Logo"
                        />
                    </div>
                </header>

                {chosenUser}
                <br></br>
                <br></br>
            </div>
        </ThemeProvider>
    );
}

export default App;
