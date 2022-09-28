import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import cl from "../../styles/Packs.module.scss"
import {createCardTC} from "../../main/bll/cardsReducer";
import {CardPacksType, CardsType} from "../../main/dal/packsAPI";
import CardsList from "./CardsList";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {PACKS_PATH} from "../../main/Routing";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {RequestLoadingType} from "../../main/bll/appReducer";
import Loader from "../../main/ui/Loader";

const Cards = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    const currentPack = useSelector<AppStoreType, CardPacksType>(state => state.cards.currentCardsPack)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const cards = useSelector<AppStoreType, CardsType[] | []>(state => state.cards.cards)
    const myName = useSelector<AppStoreType, string>(state => state.login.userData.name)

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const createCard = () => {
        if (question)
            dispatch(createCardTC({card: {cardsPack_id: currentPack._id, question, answer}}))
    }

    return (
        <>
            {isLoading === 'loading' && <Loader/>}
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PACKS_PATH)}
                >Back to packs</Button>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {currentPack.deckCover && <img style={{maxWidth: "200px", maxHeight: "200px"}}
                                                   src={currentPack.deckCover}
                                                   alt={"cover"}/>}
                </div>
                <div className={cl.title}>{`Pack name: ${currentPack.name}`}</div>
                {
                    myName === currentPack.user_name
                        ? <Modal callback={createCard}
                                 titleBtn={"Add new card"}
                                 title={"Add new card"}
                                 icon={"pi pi-plus-circle"}
                                 className={""}
                                 disabled={isLoading === "loading"}>
                            <form>
                                <span className="p-float-label">
                                    <InputText style={{width: "95%", margin: "5px"}} id="question"
                                               value={question}
                                               onChange={(e) => setQuestion(e.target.value)}/>
                                    <label htmlFor="question">question</label>
                                </span>
                                <InputTextarea style={{width: "95%", margin: "5px"}}
                                               value={answer}
                                               placeholder={"answer"}
                                               onChange={(e) => setAnswer(e.target.value)}
                                               rows={5}
                                               cols={30}
                                               autoResize/>
                            </form>
                        </Modal>
                        : ""
                }
            </div>
            {cards.length
                ? <CardsList/>
                : <div className={cl.title}>This pack is empty</div>}
        </>
    )
}

export default Cards;