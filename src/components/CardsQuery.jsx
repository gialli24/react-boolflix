import AppCard from "./AppCard";

export default function CardsQuery({ cards }) {
    return (
        <div className="cards-container">
            {

                cards.map((data, i) => {
                    const { poster_path, original_language, vote_average } = data;
                    const title = data.title || data.name;
                    const original_title = data.original_title || data.original_name;

                    return (
                        <AppCard key={i} poster_path={poster_path} title={title} original_title={original_title} lang={original_language} vote_average={vote_average} />
                    );
                })

            }
        </div>
    );
}