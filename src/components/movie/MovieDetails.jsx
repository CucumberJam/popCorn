import {useEffect, useRef, useState} from "react";
import Loader from "../UI/Loader";
import StarRating from "../UI/StarRating";
import API_KEY from "../../service/API_KEY";
import {useEventKey} from "../../hooks/useEventKey";

export default function MovieDetails({id, onCloseDetails, onAddWatched, watched}){
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const countRef= useRef(0);

    // change count of rating user made (via useRef):
    useEffect(()=> {
        if(rating) countRef.current++;
    }, [rating]);

    // fetch request for movie details:
    useEffect(() => {
        async function fetchMovieDetails(){
            setIsLoading(true);
            try{
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
                const data = await res.json();
                setMovie(data);
            }catch (e) {
                console.log(e.message)
            }
            finally {
                setIsLoading(false);
            }

        }
        fetchMovieDetails();
    }, [id]);

    // set title of movie to the page:
    useEffect(() => {
        document.title = 'Movie | ' + title;
        return () => document.title = `🍿 usePopcorn`;
    }, [movie]);

    // set event listener for pressing esc to get out of the movie details:
    useEventKey('Escape', onCloseDetails);

    const isWatched = watched.find(el => el.imdbID === movie.imdbID);

    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleAdd(){
        const watchedMovie = {
            imdbID: id,
            Title: title,
            Poster: poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating: rating,
            countRatingDecisions: countRef.current
        }
        if(!isWatched) onAddWatched(watchedMovie);
        onCloseDetails();
    }
    return (
        <div className='details'>
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseDetails}>&larr;</button>
                        <img src={poster} alt='poster'/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className='rating'>
                            {!isWatched &&
                                <>
                                    <StarRating maxRating={10} size={'20px'} onSetRating={setRating}/>
                                    <button className="btn-add" onClick={handleAdd}> Add to list</button>
                                </>
                            }
                            {isWatched && <p>In your watch list</p>}

                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    );
}