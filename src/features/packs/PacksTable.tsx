import React, {useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CardPacksType, GetPacksParamsType} from "../../main/dal/packsAPI";
import {getPacksTC} from "../../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";


const PacksTable = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)

    useEffect(() => {
        dispatch(getPacksTC(params))
        console.log(cardPacks)
    }, [params])

    return (
        <div>
            <div className="card">
                <DataTable value={cardPacks} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="cardsCount" header="Cards"></Column>
                    <Column field="updated" header="Last update"></Column>
                    <Column field="created" header="Created by"></Column>
                    <Column field="Actions" header="Actions"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default PacksTable;