import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { langs } from "../data/flags";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const moviesEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;
const seriesEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=`;


function handleFLags(langs, code) {
    return langs[code] || code;
}

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

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({
        movies: [],
        series: []
    });

    async function fetchSearch(endpoint, search) {
        const res = await fetch(endpoint + search);
        const data = await res.json();
        return data.results;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const [movieData, seriesData] = await Promise.all([
                fetchSearch(moviesEndpoint, search),
                fetchSearch(seriesEndpoint, search)
            ]);

            setResults({
                movies: movieData,
                series: seriesData
            });
        } catch (error) {
            console.error("Search failed", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                <button type="submit">Cerca</button>
            </form>

            <section id="movies" className="query-list">

                <h2>Movies</h2>

                <ul>
                    {

                        results.movies.map((movie, i) => {

                            const { poster_path, title, original_title, original_language, vote_average } = movie;

                            return (
                                <li key={i} className="mb-1" >

                                    <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />

                                    <div><strong>Titolo: </strong>{title}</div>

                                    <div><strong>Titolo originale: </strong>{original_title}</div>

                                    <div>
                                        <strong>Lingua: </strong>
                                        <span className={`fi fi-${handleFLags(langs, original_language)}`}></span>
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

                        results.series.map((serie, i) => {

                            const { poster_path, name, original_name, original_language, vote_average } = serie;

                            return (
                                <li key={i} className="mb-1" >

                                    <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />

                                    <div><strong>Titolo: </strong>{name}</div>

                                    <div><strong>Titolo originale: </strong>{original_name}</div>

                                    <div>
                                        <strong>Lingua: </strong>
                                        <span className={`fi fi-${handleFLags(langs, original_language)}`}></span>
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