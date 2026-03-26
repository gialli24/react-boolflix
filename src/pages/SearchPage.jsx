import { useState } from "react";

export default function SearchPage() {

    /* Flags */
    const languagesCodes = {
        en: "gb",
        ja: "jp",
        zh: "cn",
        da: "dk"
    }

    function handleFLags(languagesCodes, code) {
        const flagCode = languagesCodes[code];


        if (!flagCode) {
            return code;
        }

        return flagCode;
    }

    /* Search reactive variables */
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    /* Search */
    const [searchValue, setSearchValue] = useState("");

    /* API Call */
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const searchMoviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
    const searchTvEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;

    function fetchSearch(endpoint, searchValue, setValue) {
        const fullEndpoint = endpoint + searchValue;

        fetch(fullEndpoint)
            .then(res => res.json())
            .then(data => {
                setValue(data.results);
            })

    }

    function handleSearch(searchValue) {
        fetchSearch(searchMoviesEndpoint, searchValue, setMovies);
        fetchSearch(searchTvEndpoint, searchValue, setSeries);
    }

    return (
        <>
            <div className="searchbar">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <button onClick={() => handleSearch(searchValue)}>Cerca</button>
            </div>

            <section id="movies" className="query-list">

                <h2>Movies</h2>

                <ul>
                    {

                        movies.map((movie, i) => (

                            <li key={i} className="mb-1" >
                                <div><strong>Titolo: </strong>{movie.title}</div>

                                <div><strong>Titolo originale: </strong>{movie.original_title}</div>

                                <div>
                                    <strong>Lingua: </strong>
                                    <span className={`fi fi-${handleFLags(languagesCodes, movie.original_language)}`}></span>
                                </div>

                                <div><strong>Voto: </strong>{movie.vote_average}</div>
                            </li>

                        ))

                    }
                </ul>
            </section >

            <section id="series" className="query-list">

                <h2>Series</h2>

                <ul>
                    {

                        series.map((serie, i) => (

                            <li key={i} className="mb-1" >
                                <div><strong>Titolo: </strong>{serie.name}</div>

                                <div><strong>Titolo originale: </strong>{serie.original_name}</div>

                                <div>
                                    <strong>Lingua: </strong>
                                    <span className={`fi fi-${handleFLags(languagesCodes, serie.original_language)}`}></span>
                                </div>

                                <div><strong>Voto: </strong>{serie.vote_average}</div>
                            </li>

                        ))

                    }
                </ul>
            </section >
        </>
    );
}