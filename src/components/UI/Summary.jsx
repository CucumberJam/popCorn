const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function Summary({movies}) {
    const avgImdbRating = average(movies.map((movie) => movie.imdbRating)).toFixed(2);
    const avgUserRating = average(movies.map((movie) => movie.userRating)).toFixed(2);
    const avgRuntime = average(movies.map((movie) => movie.runtime)).toFixed(2);

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{movies.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}