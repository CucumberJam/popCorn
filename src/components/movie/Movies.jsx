import Movie from "./Movie";

export default function Movies({movies, isWatched, onSelectMovie = null, onDeleteMovie= null}){


    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID}
                       movie={movie}
                       isWatched={isWatched}
                       onSelectMovie={onSelectMovie}
                       onDeleteMovie={onDeleteMovie}/>
            ))}
        </ul>
    );
}