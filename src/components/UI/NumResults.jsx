export default function NumResults({moviesNum}){
    return (
        <p className="num-results">
            Found <strong>{moviesNum}</strong> results
        </p>
    );
}