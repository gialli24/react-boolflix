import { useState } from "react";

export default function SearchPage() {

    /* Flags */
    const languageCustomFlags = {
        en: "gb",
        ja: "jp",
        zh: "cn",
        da: "dk"
    }

    function handleFLags(languageCustomFlags, code) {
        const flagCode = languageCustomFlags[code];


        if (!flagCode) {
            return code;
        }

        return flagCode;
    }


    /* Search reactive variables */
    const [results, setResults] = useState([]);

    /* Search */
    const [searchValue, setSearchValue] = useState("");

    /* API Call */
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const searchMoviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
    const searchTvEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;

    function fetchSearch(endpoint, searchValue) {
        const fullEndpoint = endpoint + searchValue;

        fetch(fullEndpoint)
            .then(res => res.json())
            .then(data => {
                return data.results;
            })

        return [];

    }

    function handleSearch(searchValue) {
        let movies, tv = [];

        movies = fetchSearch(searchMoviesEndpoint, searchValue);
        tv = fetchSearch(searchTvEndpoint, searchValue);

        console.log(movies, tv);
    }

    return (
        <>
            <div className="searchbar">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <button onClick={() => handleSearch(searchValue)}>Cerca</button>
            </div>

            <div className="query-list">
                <ul>
                    {

                        results.map((result, i) => (

                            <li key={i} className="mb-1" >
                                <div><strong>Titolo: </strong>{result.title}</div>
                                <div><strong>Titolo originale: </strong>{result.original_title}</div>
                                <div>
                                    <strong>Lingua: </strong>
                                    <span className={`fi fi-${handleFLags(languageCustomFlags, result.original_language)}`}></span>
                                </div>
                                <div><strong>Voto: </strong>{result.vote_average}</div>
                            </li>

                        ))

                    }
                </ul>
            </div >
        </>
    );
}