import { useEffect, useState } from "react";

export default function SearchPage() {

    /* Search reactive variables */
    const [movies, setMovies] = useState([]);

    /* Search */
    const [searchValue, setSearchValue] = useState("");

    /* API Call */
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;

    function fetchSearch(searchEndpoint, searchValue) {
        const fullEndpoint = searchEndpoint + searchValue;

        fetch(fullEndpoint)
            .then(res => res.json())
            .then(data => setMovies(data.results))
    }

    return (
        <>
            <div className="searchbar">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <button onClick={() => fetchSearch(searchEndpoint, searchValue)}>Cerca</button>
            </div>

            <div className="movies-list">
                <ul>
                    {

                        movies.map((movie, i) => (
                            <li key={i} className="mb-1">
                                <div><strong>Titolo: </strong>{movie.title}</div>
                                <div><strong>Titolo originale: </strong>{movie.original_title}</div>
                                <div><strong>Lingua: </strong>{movie.original_language}</div>
                                <div><strong>Voto: </strong>{movie.vote_average}</div>
                            </li>
                        ))

                    }
                </ul>
            </div>
        </>
    );
}