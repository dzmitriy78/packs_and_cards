import React from 'react';
import {cardsAPI} from "../../main/dal/packsAPI";

const Cards = () => {
    const getCard = async () => {
        const res = await cardsAPI.getCards()
        console.log(res)
    }
    return (
        <div>
            <button onClick={getCard}>get</button>
        </div>
    )
}

export default Cards;