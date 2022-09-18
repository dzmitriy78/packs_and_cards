import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CardPacksType, GetCardsParamsType} from "../../main/dal/packsAPI";
import {deletePackTC, updatePackTC} from "../../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {Button} from "primereact/button";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {useNavigate} from "react-router-dom";
import {CARDS_PATH, LEARN_PATH} from "../../main/Routing";
import {getCardsTC, setCardsPack} from "../../main/bll/cardsReducer";
import moment from "moment";
import Confirm from "../../utils/ConfirmDialog";
import {InputText} from "primereact/inputtext";
import Modal from "../../utils/Modal";


const PacksTable = () => {

    const dispatch = useDispatch<DispatchType>()
    const cardPacks = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const totalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)
    const params = useSelector<AppStoreType, GetCardsParamsType>(state => state.cards.getCardParams)
    const navigate = useNavigate()

    const [newName, setNewName] = useState("")

    const onDeletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const onUpdatePack = (id: string) => {
        if (newName)
            dispatch(updatePackTC(id, newName))
    }

    const actionBodyTemplate = (rowData: any) => {
        const currentPack = cardPacks.filter((c) => c._id === rowData._id)

        return (
            <div style={{overflow: 'hidden', textAlign: "center", display: "inline-flex"}}>
                <Button icon="pi pi-book"
                        className="p-button-rounded p-button-success mr-2"
                        title={"learn"}
                        disabled={isLoading === "loading"}
                        onClick={() => {
                            dispatch(getCardsTC({...params, cardsPack_id: rowData._id}))
                            dispatch(setCardsPack(currentPack[0]))
                            navigate(LEARN_PATH)
                        }}
                />
                {
                    myId === userId
                        ? <Modal icon={"pi pi-pencil"}
                                 className="p-button-rounded p-button-success mr-2"
                                 title={`Edit pack ${currentPack[0].name}`}
                                 disabled={isLoading === "loading"}
                                 callback={() => onUpdatePack(rowData._id)}>
                            <form>
                                <span style={{color: "teal", fontWeight: "bold", margin: "5px"}}>Pack name:</span>
                                <InputText style={{width: "95%"}} id="newName"
                                           defaultValue={currentPack[0].name}
                                           onChange={(e) => setNewName(e.target.value)}/>
                            </form>
                        </Modal>
                        : ""
                }
                {
                    myId === userId
                        ? <Confirm icon="pi pi-trash"
                                   className="p-button-rounded p-button-warning"
                                   title={""}
                                   message={`Are you sure you want to remove package ${currentPack[0].name}? All card will be deleted`}
                                   disabled={isLoading === "loading"}
                                   callback={() => onDeletePack(rowData._id)}
                        />
                        : ""
                }
            </div>
        )
    }

    const nameTemplate = (rowData: any) => {
        const currentPack = cardPacks.filter((c) => c._id === rowData._id)
        return (
            <div style={{width: '25vw', overflow: 'hidden', cursor: "pointer"}} onClick={() => {
                if (isLoading !== "loading") {
                    dispatch(getCardsTC({...params, cardsPack_id: rowData._id}))
                    dispatch(setCardsPack(currentPack[0]))
                    navigate(CARDS_PATH)
                }
            }
            }>
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
            <div style={{width: '12vw', overflow: 'hidden', textAlign: "center"}}>
                {moment(rowData.updated).format("DD.MM.YYYY  HH:mm ")}
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
                    <Column field="updated" header="Last updated" body={updatedTemplate}
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