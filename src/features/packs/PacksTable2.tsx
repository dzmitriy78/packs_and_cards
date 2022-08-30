import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {CardPacksType, packsAPI} from "../../main/dal/packsAPI";


const PacksTable2 = () => {

    const [cardsPack, setCardsPack] = useState< [CardPacksType] | []>([])

    useEffect(() => {
        packsAPI.getPacks().then(res => setCardsPack(res.cardPacks))
        console.log(cardsPack)
    }, [])

    return (
        <div>
            <div className="card">
                <DataTable value={cardsPack} paginator rows={5} responsiveLayout="scroll">
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

export default PacksTable2;