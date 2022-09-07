import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CardPacksType, GetCardsParamsType} from "../../main/dal/packsAPI";
import {deletePackTC, updatePackTC} from "../../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {Button} from "primereact/button";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {useNavigate} from "react-router-dom";
import {CARDS_PATH} from "../../main/Routing";
import {getCardsTC} from "../../main/bll/cardsReducer";


const PacksTable = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const totalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)
    const params = useSelector<AppStoreType, GetCardsParamsType>(state => state.cards.getCardParams)
    const navigate = useNavigate()

    const onDeletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const onUpdatePack = (id: string) => {
        const newName = String(prompt("Enter a new pack name"))
        if (newName)
            dispatch(updatePackTC(id, newName))
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div style={{width: '14vw', overflow: 'hidden', textAlign: "center"}}>
                <Button icon="pi pi-folder-open" className="p-button-rounded p-button-success mr-2"
                        disabled={isLoading === "loading"}
                        onClick={() => {
                            dispatch(getCardsTC({...params, cardsPack_id: rowData._id}))
                            navigate(CARDS_PATH)
                        }
                        }/>
                {
                    myId === userId
                        ? <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                                  disabled={isLoading === "loading"}
                                  onClick={() => onUpdatePack(rowData._id)

                                  }/>
                        : ""
                }
                {
                    myId === userId
                        ? <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                                  disabled={isLoading === "loading"}
                                  onClick={() => onDeletePack(rowData._id)
                                  }/>
                        : ""
                }
            </div>
        )
    }

    const nameTemplate = (rowData: any) => {
        return (
            <div style={{width: '25vw', overflow: 'hidden'}}>
                {rowData.name}
            </div>
        )
    }

    const cardsCountTemplate = (rowData: any) => {
        return (
            <div style={{width: '5vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.cardsCount}
            </div>
        )
    }
    const updatedTemplate = (rowData: any) => {
        return (
            <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.updated}
            </div>
        )
    }
    const userNameTemplate = (rowData: any) => {
        return (
            <div style={{width: '15vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.user_name}
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <DataTable value={cardPacks} paginator responsiveLayout="scroll"
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                           rowsPerPageOptions={[5, 10, 20, 50]}
                           totalRecords={totalCount}>
                    <Column field="name" header="Name" body={nameTemplate}
                            headerStyle={{width: '25vw'}} sortable={true}></Column>
                    <Column field="cardsCount" body={cardsCountTemplate} headerStyle={{width: '5vw'}}
                            header="Cards" sortable={true}></Column>
                    <Column field="updated" header="Last update" body={updatedTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="user_name" header="Created by" body={userNameTemplate}
                            headerStyle={{width: '15vw'}} sortable={true}></Column>
                    <Column field="Actions" header="Actions" headerStyle={{width: '14vw'}}
                            body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default PacksTable;