import React, {useEffect} from 'react';
import cl from "./Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {addPackTC, getPacksTC} from "../../main/bll/packsReducer";
import {GetPacksParamsType} from "../../main/dal/packsAPI";
import {RequestLoadingType} from "../../main/bll/appReducer";

const Packs = () => {

    const dispatch = useDispatch<DispatchType>()
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
                <div className={cl.title}>Pack list</div>
                <button className={cl.button} disabled={isLoading === "loading"} onClick={createPack}>Add new pack
                </button>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs;