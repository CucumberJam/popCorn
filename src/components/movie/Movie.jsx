export default function Movie({movie, isWatched, onSelectMovie = null, onDeleteMovie}){
    return (
        <li onClick={() => onSelectMovie?.(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            {isWatched && (
                <div>
                    <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                    </p>
                    <button className="btn-delete"
                            onClick={() => onDeleteMovie?.(movie.imdbID)}>X
                    </button>
                </div>
            )}
            {!isWatched && (
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            )}
        </li>
    );
}