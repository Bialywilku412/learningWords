import React, { useCallback, useState } from "react";

const Cards = () => {
    const [cards, setCards] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const getCards = useCallback(() => {
        setLoading(true);
        setError(null);
        axios.post('/api/getCards.php')
            .then((response) => {
                if (response.data.valid) {
                    setCards(response.data.cards);
                } else {
                    setSubscriptions(response.data.cards);
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("Er ging iets fout bij het ophalen van de data. Probeer het later opnieuw.");
                console.error(error); 
                setLoading(false);
            });
    },[]);

    const addCard = useCallback(() => {

    })
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}

export default Cards;
