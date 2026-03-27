import AppCard from "./AppCard";

export default function CardsQuery({ cards }) {
    return (
        <div className="cards-container">
            {

                cards.map((data, i) => {
                    <AppCard key={i} data={data} />
                })

            }
        </div>
    );
}