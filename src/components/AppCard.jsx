import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { langs } from "../data/flags";

import axios from 'axios';
import { useEffect, useState } from 'react';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseCastURL = `https://api.themoviedb.org/3/`;
const genresMoviesEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
const genresTvEndpoint = `https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_API_KEY}`

function renderHearts(vote_average) {
    const roundedVote = Math.floor(((5 - 1) * vote_average + 5) / (10 - 1));

    const heartList = [];

    for (let i = 0; i < 5; i++) {
        if (i < roundedVote) {
            heartList.push(<FontAwesomeIcon key={i} icon={faStarSolid} />);
        } else {
            heartList.push(<FontAwesomeIcon key={i} icon={faStarRegular} />);
        }
    }

    return heartList;
}

function handleFLag(code) {
    return langs[code] || code;
}

export default function AppCard({ id, endpoint, poster_path, title, original_title, lang, genre_ids, vote_average }) {

    const [cast, setCast] = useState([]);
    const [genresList, setGenresList] = useState([]);

    function fetchCast(baseCastURL, endpoint, id) {
        axios.get(baseCastURL + `${endpoint}/` + id + `/credits?api_key=${TMDB_API_KEY}`)
            .then(response => {
                setCast(response.data.cast.slice(0, 4));
            })
            .catch(error => console.log(error));
    }

    function fetchGenres(endpoint) {
        axios.get(endpoint)
            .then(response => {
                setGenresList(response.data.genres.filter(genre => genre_ids.includes(genre.id)).map(genre => genre.name));
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchCast(baseCastURL, endpoint, id);
        fetchGenres(genresMoviesEndpoint);
    }, []);

    return (
        <div className="card" >
            <div className="thumb">
                <img src={"https://image.tmdb.org/t/p/w342" + poster_path} alt="" />
            </div>

            <div className="data">
                <div><strong>Titolo: </strong>{title}</div>

                <div><strong>Titolo originale: </strong>{original_title}</div>

                {

                    genresList.length > 0 &&

                    <div>
                        <strong>Generi: </strong>
                        {
                            genresList.map((genre, i) => (
                                <span key={i}>{genre} {i !== genresList.length - 1 ? "," : ""} </span>
                            ))
                        }
                    </div>
                }

                {

                    cast.length > 0 &&

                    <div>
                        <strong>Attori: </strong>
                        {
                            cast.map((actor, i) => (
                                <span key={i}>{actor.name} {i !== cast.length - 1 ? "," : ""} </span>
                            ))
                        }
                    </div>
                }

                <div>
                    <strong>Lingua: </strong>
                    <span className={`fi fi-${handleFLag(lang)}`}></span>
                </div>

                <div>
                    <strong>Voto: </strong>
                    {renderHearts(vote_average)}
                </div>
            </div>
        </div>
    );
}