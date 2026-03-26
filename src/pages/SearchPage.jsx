import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

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

    function fetchSearch(endpoint, searchValue, storeData) {
        const fullEndpoint = endpoint + searchValue;

        fetch(fullEndpoint)
            .then(res => res.json())
            .then(data => {
                storeData(data.results);
            })

    }

    function handleSearch(searchValue) {
        fetchSearch(searchMoviesEndpoint, searchValue, setMovies);
        fetchSearch(searchTvEndpoint, searchValue, setSeries);
    }

    /* hearts */
    function renderHearts(vote_average) {
        const roundedVote = Math.floor(((5 - 1) * vote_average + 5) / (10 - 1));

        const heartList = [];

        for (let i = 0; i < 5; i++) {
            if (i < roundedVote) {
                heartList.push(<FontAwesomeIcon key={i} icon={faHeartSolid} />);
            } else {
                heartList.push(<FontAwesomeIcon key={i} icon={faHeartRegular} />);
            }
        }

        return heartList;
    }

    return (
        <>
            <div className="searchbar">
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <button onClick={() => handleSearch(searchValue)}>Cerca</button>
            </div>

            <section id="movies" className="query-list">

                <h2>Movies</h2>

                {console.log(series)}

                <ul>
                    {

                        movies.map((movie, i) => {

                            const { poster_path, title, original_title, original_language, vote_average } = movie;

                            return (
                                <li key={i} className="mb-1" >

                                    <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />

                                    <div><strong>Titolo: </strong>{title}</div>

                                    <div><strong>Titolo originale: </strong>{original_title}</div>

                                    <div>
                                        <strong>Lingua: </strong>
                                        <span className={`fi fi-${handleFLags(languagesCodes, original_language)}`}></span>
                                    </div>

                                    <div>
                                        <strong>Voto: </strong>
                                        {renderHearts(vote_average)}
                                    </div>
                                </li>
                            )

                        })

                    }
                </ul>
            </section >

            <section id="series" className="query-list">

                <h2>Series</h2>

                <ul>
                    {

                        series.map((serie, i) => {

                            const { poster_path, name, original_name, original_language, vote_average } = serie;

                            return (
                                <li key={i} className="mb-1" >

                                    <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />

                                    <div><strong>Titolo: </strong>{name}</div>

                                    <div><strong>Titolo originale: </strong>{original_name}</div>

                                    <div>
                                        <strong>Lingua: </strong>
                                        <span className={`fi fi-${handleFLags(languagesCodes, original_language)}`}></span>
                                    </div>

                                    <div>
                                        <strong>Voto: </strong>
                                        {renderHearts(vote_average)}
                                    </div>
                                </li>
                            )

                        })

                    }
                </ul>
            </section >
        </>
    );
}