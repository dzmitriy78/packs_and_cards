import React, {useEffect} from 'react';
import cl from "./Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {addPackTC, getPacksTC} from "../../main/bll/packsReducer";
import {GetPacksParamsType} from "../../main/dal/packsAPI";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {PROFILE_PATH} from "../../main/Routing";

const Packs = () => {

    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)

    useEffect(() => {
        dispatch(getPacksTC(params))
    }, [params])

    const createPack = () => {
        const newPackName = String(prompt("Enter new pack name"))
        if (newPackName)
            dispatch(addPackTC({cardsPack: {name: newPackName}}))
    }

    return (<>
            <div className={cl.header}>
                <Button type="button" icon="pi pi-arrow-left"
                        className="p-button-text"
                        style={{width: "90px"}}
                        onClick={()=>navigate(PROFILE_PATH)}
                >Back to profile</Button>
                <div className={cl.title}>Pack list</div>
                <button className={cl.button} disabled={isLoading === "loading"} onClick={createPack}>+ new pack
                </button>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs;