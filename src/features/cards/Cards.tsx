import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {RequestLoadingType} from "../../main/bll/appReducer";
import cl from "../packs/Packs.module.scss"
import {createCardTC} from "../../main/bll/cardsReducer";
import {CardPacksType} from "../../main/dal/packsAPI";
import CardsList from "./CardsList";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {PACKS_PATH} from "../../main/Routing";

const Cards = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const cardsPack = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)
    const currentPack = useSelector<AppStoreType,CardPacksType>(state => state.cards.currentCardsPack)


    const createCard = () => {
        const question = String(prompt("Enter card question"))
        const answer = String(prompt("Enter card answer"))
        if (question)
            dispatch(createCardTC({card: {cardsPack_id: currentPack._id, question, answer}}))
    }

    return (<>

            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PACKS_PATH)}
                >Back to packs</Button>
                <div className={cl.title}>{`Pack name: ${currentPack.name}`}</div>
                {
                    myId === userId
                        ? <button className={cl.button}
                                  disabled={isLoading === "loading"}
                                  onClick={createCard}>
                            + new card</button>
                        : ""
                }
            </div>
            {cardsPack && <CardsList/>}
        </>
    )
}

export default Cards;