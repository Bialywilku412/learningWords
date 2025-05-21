import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import CardsRow from "./cardsRow";
import { Table, Form } from "react-bootstrap";


const Cards = () => {
    const [cards, setCards] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cardName, setCardName] = useState("");


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
        setLoading(true);
        setError(null);

        axios.post('/api/addCard.php', {
            name: cardName
        })
        .then((response) => {
            if (response.data.valid) {
                setCardName("");
                setCards(response.data.cards);
                getCards();
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
    }, [cardName, getCards]);

    useEffect(() => {
        getCards();
    },[getCards]);

    return (
        <React.Fragment>
            <Form className="mb-3 d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Naam van kaart"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={loading}
                />
                <Button
                    variant="primary"
                    onClick={addCard}
                    disabled={loading}
                >
                    Voeg toe
                </Button>
            </Form>
        
            <Table hover striped size="sm" className="results">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">ID</th>
                        <th scope="col" className="text-center">Naam</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="2" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan="2" className="text-center text-danger">
                                {error}
                            </td>
                        </tr>
                    )}
                    {cards && cards.map((card) => (
                        <CardsRow
                            key={card.id}
                            card={card}
                            to={`/card/${card.id}`} />
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default Cards;
