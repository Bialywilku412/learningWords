import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

const Card = ({ card }) => {
    const { id } = useParams();
    
    const getCard = useCallback(() => {
        
    })
    return (
        <>
            {id}
        </>
    )
}

export default Card;