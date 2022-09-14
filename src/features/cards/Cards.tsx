import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import cl from "../packs/Packs.module.scss"
import {createCardTC} from "../../main/bll/cardsReducer";
import {CardPacksType} from "../../main/dal/packsAPI";
import CardsList from "./CardsList";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {PACKS_PATH} from "../../main/Routing";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {RequestLoadingType} from "../../main/bll/appReducer";

const Cards = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    const cardsPack = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)
    const currentPack = useSelector<AppStoreType, CardPacksType>(state => state.cards.currentCardsPack)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const createCard = () => {
        if (question)
            dispatch(createCardTC({card: {cardsPack_id: currentPack._id, question, answer}}))
    }

    return (
        <>
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PACKS_PATH)}
                >Back to packs</Button>
                <div className={cl.title}>{`Pack name: ${currentPack.name}`}</div>
                {
                    myId === userId
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
            {cardsPack && <CardsList/>}
        </>
    )
}

export default Cards;