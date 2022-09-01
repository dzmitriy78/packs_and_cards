import React, {useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CardPacksType, GetPacksParamsType} from "../../main/dal/packsAPI";
import {getPacksTC} from "../../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {Button} from "primereact/button";


const PacksTable = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)

    useEffect(() => {
        dispatch(getPacksTC(params))
        console.log(cardPacks)
    }, [params])

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-folder-open" className="p-button-rounded p-button-success mr-2" onClick={() => {}} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => {}} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => {}} />
            </>
        )
    }

    return (
        <div>
            <div className="card">
                <DataTable value={cardPacks} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="cardsCount" header="Cards"></Column>
                    <Column field="updated" header="Last update"></Column>
                    <Column field="user_name" header="Created by"></Column>
                    <Column field="Actions" header="Actions" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default PacksTable;