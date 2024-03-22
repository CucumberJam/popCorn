import {useState, useEffect} from "react";
import Loader from "./components/UI/Loader";
import NavBar from "./components/NavBar";
import Box from "./components/UI/Box";
import Search from "./components/UI/Search";
import ErrorMessage from "./components/UI/ErrorMessage";
import Main from './components/UI/Main';
import Movies from "./components/movie/Movies";
import MovieDetails from "./components/movie/MovieDetails";
import NumResults from "./components/UI/NumResults";
import Summary from "./components/UI/Summary";
import {useFetch} from "./hooks/useFetch";
import {useLocalStorageState} from "./hooks/useLocalStorageState";


export default function App(){
    const [query, setQuery] = useState('');
    const [selectedMovieId, setSelectedMovieId] = useState(null); //imdbID
    const [watched, setWatched] = useLocalStorageState([], 'watched');
    const {isLoading, error, movies} = useFetch(query, handleCloseMovie);

    function handleDeleteWatched(id){
        setWatched(watched => watched.filter(el => el.imdbID !== id));
    }
    function handleSelectMovie(id){
        setSelectedMovieId(selectedMovieId => id === selectedMovieId ? null : id);
    }
    function handleCloseMovie(){
        setSelectedMovieId(null);
    }
    function handleAddWatched(movie){
        setWatched(watched => [...watched, movie]);
    }

    return (
        <>
            <NavBar>
                <Search query={query} onSetQuery={setQuery}/>
                <NumResults moviesNum={movies.length}/>
            </NavBar>

            <Main>
                {!isLoading && !error &&
                    <Box children={
                        <Movies movies={movies} isWatched={false} onSelectMovie={handleSelectMovie} />
                    }/>
                }
                {isLoading && <Loader/>}
                {error && <ErrorMessage message={error}/>}

                    <Box>
                        {
                            selectedMovieId ? <MovieDetails id={selectedMovieId} watched={watched}
                                                            onCloseDetails={handleCloseMovie}
                                                            onAddWatched={handleAddWatched}/> :
                            <>
                                <Summary movies={watched}/>
                                <Movies movies={watched} isWatched={true} onDeleteMovie={handleDeleteWatched}/>
                            </>
                        }
                    </Box>
            </Main>
        </>
    );
}

