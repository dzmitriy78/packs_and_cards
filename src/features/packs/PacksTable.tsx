import React, {useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CardPacksType, GetPacksParamsType} from "../../main/dal/packsAPI";
import {deletePackTC, getPacksTC, updatePackTC} from "../../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {Button} from "primereact/button";


const PacksTable = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)

    useEffect(() => {
        dispatch(getPacksTC(params))
    }, [params])

    const onDeletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const onUpdatePack = (id: string) => {
        const newName = String(prompt("Enter a new pack name"))
        if (newName)
            dispatch(updatePackTC(id, newName))
    }
    const actionBodyTemplate = (rowData: { _id: string; }) => {
        return (
            <div>
                <Button icon="pi pi-folder-open" className="p-button-rounded p-button-success mr-2" onClick={() => {
                }}/>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => {
                    onUpdatePack(rowData._id)
                }}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => onDeletePack(rowData._id)}/>
            </div>
        )
    }

    const bodyTemplate = (rowData: any) => {
        return (
            <div style={{width: '150px', overflow: 'hidden'}}>
                {rowData.name}
            </div>
        )
    }

    const cardsCountTemplate = (rowData: any) => {
        return (
            <div style={{width: '100px', overflow: 'hidden'}}>
                {rowData.cardsCount}
            </div>
        )
    }


    return (
        <div>
            <div className="card">
                <DataTable value={cardPacks} paginator rows={5} responsiveLayout="scroll">
                    <Column field="name" header="Name" body={bodyTemplate} headerStyle={{width: '50px'}}></Column>
                    <Column field="cardsCount" body={cardsCountTemplate} headerStyle={{width: '100px'}}
                            header="Cards"></Column>
                    <Column field="updated" header="Last update" headerStyle={{width: '300px'}}></Column>
                    <Column field="user_name" header="Created by" headerStyle={{width: '150px'}}></Column>
                    <Column field="Actions" header="Actions" headerStyle={{width: '200px'}}
                            body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default PacksTable;