import { langs } from "../data/flags";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

function handleFLag(code) {
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

export default function AppCard({ data }) {

    const { poster_path, original_language, vote_average } = data;
    const title = data.title || data.name;
    const original_title = data.original_title || data.original_name;

    return (
        <div className="card" >

            <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt="" />

            <div><strong>Titolo: </strong>{title}</div>

            <div><strong>Titolo originale: </strong>{original_title}</div>

            <div>
                <strong>Lingua: </strong>
                <span className={`fi fi-${handleFLag(original_language)}`}></span>
            </div>

            <div>
                <strong>Voto: </strong>
                {renderHearts(vote_average)}
            </div>
        </div>
    );
}