import React, { useState } from "react";
import { ThemeProvider } from "@chakra-ui/core";
import chosenUser from "./components/ChooseRole";
import "./App.css";
//import CentralList from "./components/CentralList";
import { Movie } from "./interfaces/movie";
import movieList from "./data/movieList.json";
//import ChooseUser from "./components/User";

function App(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [movies, setMovies] = useState<Movie[]>(
        movieList.map((movie) => {
            return {
                image: movie.image,
                title: movie.name,
                description: movie.desc,
                maturity_rating: movie.age,
                cast: movie.cast,
                genre: movie.genre,
                user_rating: 1
            };
        })
    );

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
            </div>
        </ThemeProvider>
    );
}

//<CentralList></CentralList>;

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
