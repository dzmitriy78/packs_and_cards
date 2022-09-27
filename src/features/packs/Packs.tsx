import React, {useEffect, useState} from 'react';
import cl from "../../styles/Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {addPackTC, getPacksTC} from "../../main/bll/packsReducer";
import {GetPacksParamsType} from "../../main/dal/packsAPI";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH, PROFILE_PATH} from "../../main/Routing";
import Modal from "../../utils/Modal";
import {InputText} from "primereact/inputtext";
import {RequestLoadingType} from "../../main/bll/appReducer";
import Loader from "../../main/ui/Loader";

const Packs = () => {

    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)

    const [newPackName, setNewPackName] = useState("")
    const [deckCover, setDeckCover] = useState("")

    useEffect(() => {
        if (!isAuth) {
            navigate(LOGIN_PATH)
        }
        dispatch(getPacksTC(params))
    }, [params.packName, params.max, params.min, params.user_id])

    const createPack = () => {
        if (newPackName || deckCover)
            dispatch(addPackTC({cardsPack: {name: newPackName, deckCover: deckCover}}))
    }

    return (
        <>
            {isLoading === 'loading' && <Loader/>}
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={() => navigate(PROFILE_PATH)}
                >Back to profile</Button>
                <div className={cl.title}>Pack list</div>
                <Modal callback={createPack}
                       titleBtn={"Add new pack"}
                       title={"Add new pack"}
                       icon={"pi pi-plus-circle"}
                       className={""}
                       disabled={isLoading === "loading"}>
                    <form>
                        <label htmlFor="name pack">Name pack</label>
                        <InputText style={{width: "95%"}}
                                   id="name pack"
                                   value={newPackName}
                                   onChange={(e) => setNewPackName(e.target.value)}/>

                        <label htmlFor="name pack">Deck cover</label>
                        <InputText style={{width: "95%"}}
                                   type="file"
                                   id="deckCover"
                                   value={deckCover}
                                   onChange={(e) => setDeckCover(e.target.value)}/>

                    </form>
                </Modal>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs;