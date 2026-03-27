import CardsQuery from '../components/CardsQuery';


export default function SearchPage({ results, allGenres }) {

    const data = [
        {
            endpoint: "movie",
            title: "Movie",
            content: results.movies
        },
        {
            endpoint: "tv",
            title: "Series",
            content: results.series
        }
    ]

    return (
        <main>

            {
                data.map((section, i) => {

                    const { title, endpoint, content } = section;

                    return (
                        <section key={i} className="query-list" >
                            <div className="container">

                                <h2>{title}</h2>

                                <CardsQuery endpoint={endpoint} cards={content} allGenres={allGenres} />

                            </div>
                        </section>
                    );
                })
            }
        </main >
    );
}