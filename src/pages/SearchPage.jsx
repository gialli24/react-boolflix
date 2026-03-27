import CardsQuery from '../components/CardsQuery';

export default function SearchPage({ results }) {

    const data = [
        {
            endpoint: "movie",
            title: "Movie",
            data: results.movies
        },
        {
            endpoint: "tv",
            title: "Series",
            data: results.series
        }
    ]

    return (
        <main>

            {
                data.map((element, id) => (

                    <section key={id} className="query-list">
                        <div className="container">

                            <h2>{element.title}</h2>

                            <CardsQuery endpoint={element.endpoint} cards={element.data} />

                        </div>
                    </section >
                ))
            }
        </main>
    );
}