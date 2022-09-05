import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {RequestLoadingType} from "../../main/bll/appReducer";
import cl from "../cards/Card.module.scss"
import {createCardTC} from "../../main/bll/cardsReducer";
import {CardPacksType} from "../../main/dal/packsAPI";
import CardsList from "./CardsList";

const Cards = () => {
    const dispatch = useDispatch<DispatchType>()

    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const cardsPack = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const id = useSelector<AppStoreType, string>(state => state.cards.getCardParams.cardsPack_id)


    const createCard = () => {
        const question = String(prompt("Enter card question"))
        const answer = String(prompt("Enter card answer"))
        if (question)
            dispatch(createCardTC({card: {cardsPack_id: cardsPack[0]._id, question, answer}}))
    }

    return (<>
            <div className={cl.header}>
                <div className={cl.title}>{`Pack name: `}</div>
                <button className={cl.button} disabled={isLoading === "loading"} onClick={createCard}>Add new card
                </button>
            </div>
            <CardsList/>
        </>
    )
}

export default Cards;