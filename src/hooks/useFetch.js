import {useEffect, useState} from "react";
//import API_KEY from "../service/API_KEY";

export function useFetch(query, cb){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [movies, setMovies] = useState([]);

    // fetch:
    useEffect(() => {
        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }
        const controller = new AbortController();

        async function fetchMovies() {

            setIsLoading(true);
            setError('');
            try {
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${process.env.API_URL}&s=${query}`,
                    {signal: controller.signal}
                );
                if (!res.ok) throw new Error('Error while fetching...');

                const data = await res.json();

                if (data.Response === 'False') throw new Error('Not found');

                setMovies(data.Search);

            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        cb(); //handleCloseMovie();
        fetchMovies();
        return () => {controller.abort()}
    }, [query]);


    return {isLoading, error, movies}
}