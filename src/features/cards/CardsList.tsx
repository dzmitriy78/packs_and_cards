import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {CardsType} from "../../main/dal/packsAPI";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {deleteCardTC, updateCardTC} from "../../main/bll/cardsReducer";
import RatingStar from "../../utils/RatingStar";
import moment from "moment";

const CardsList = () => {
    const dispatch = useDispatch<DispatchType>()
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const cards = useSelector<AppStoreType, CardsType[] | []>(state => state.cards.cards)
    const myId = useSelector<AppStoreType, string>(state => state.login.userData._id)
    const userId = useSelector<AppStoreType, string>(state => state.packs.getPacksParams.user_id)

    const onDeleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }
    const onUpdateCard = (id: string) => {
        const newQuestion = String(prompt("Enter a new question"))
        const newAnswer = String(prompt("Enter a new answer"))
        if (newQuestion || newAnswer)
            dispatch(updateCardTC({card: {_id: id, question: newQuestion, answer: newAnswer}}))
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div style={{width: '14vw', overflow: 'hidden', textAlign: "center"}}>
                <Button icon="pi pi-folder-open" className="p-button-rounded p-button-success mr-2"
                        disabled={isLoading === "loading"}
                        onClick={() => {
                        }
                        }/>
                {myId === userId
                    ? <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                              disabled={isLoading === "loading"}
                              onClick={() => onUpdateCard(rowData._id)
                              }/>
                    : ""
                }
                {myId === userId
                    ? <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                              disabled={isLoading === "loading"}
                              onClick={() => onDeleteCard(rowData._id)
                              }/>
                    : ""
                }
            </div>
        )
    }

    const questionTemplate = (rowData: any) => {
        return (
            <div style={{width: '20vw', overflow: 'hidden'}}>
                {rowData.question}
            </div>
        )
    }

    const answerTemplate = (rowData: any) => {
        return (
            <div style={{width: '20vw', overflow: 'hidden', textAlign: "center"}}>
                {rowData.answer}
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
    const gradeTemplate = (rowData: any) => {
        return (
            <div style={{width: '12vw', overflow: 'hidden', textAlign: "center"}}>
                <RatingStar grade = {rowData.grade}/>
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <DataTable value={cards} paginator responsiveLayout="scroll"
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                           rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="question" header="question" body={questionTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="answer" body={answerTemplate} headerStyle={{width: '20vw'}}
                            header="Answer" sortable={true}></Column>
                    <Column field="updated" header="Last updated" body={updatedTemplate}
                            headerStyle={{width: '20vw'}} sortable={true}></Column>
                    <Column field="grade" header="Grade" body={gradeTemplate}
                            headerStyle={{width: '8vw'}} sortable={true}></Column>
                    <Column field="Actions" header="Actions" headerStyle={{width: '14vw'}}
                            body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default CardsList;