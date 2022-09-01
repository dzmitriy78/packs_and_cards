import React from 'react';
import cl from "./Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {addPackTC, getPacksTC} from "../../main/bll/packsReducer";
import {GetPacksParamsType} from "../../main/dal/packsAPI";

const Packs = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)

    const createPack = async () => {
        const newPackName = String(prompt("Enter new pack name"));
        await dispatch(addPackTC({cardsPack: {name: newPackName}}))
        dispatch(getPacksTC(params))
    }

    return (<>
            <div className={cl.packsWrapper}>
                <div className={cl.header}>
                    <div className={cl.title}>Pack list</div>
                    <button className={cl.button} onClick={createPack}>Add new pack</button>
                </div>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs;