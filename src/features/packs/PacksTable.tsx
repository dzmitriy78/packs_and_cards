import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './table.css';

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { CustomerService } from '../service';
import {CardPacksType, packsAPI} from "../../main/dal/packsAPI";

const PacksTable = () => {

    const [cardsPack, setCardsPack] = useState< [CardPacksType] | null>(null);

    const [filters3, setFilters3] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const [selectedCustomer3, setSelectedCustomer3] = useState(null);
    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];
    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];
    const customerService = new CustomerService();

    const filtersMap = {
        'filters3': { value: filters3, callback: setFilters3 },
    };

    useEffect(() => {
       /* customerService.getCustomersMedium().then(data => setCustomers(data));*/
        packsAPI.getPacks().then(res => setCardsPack(res.cardPacks))
        console.log(cardsPack)
    }, []); // eslint-disable-line

    const onCustomSaveState = (state:any) => {
        sessionStorage.setItem('dt-state-demo-custom', JSON.stringify(state));
    }

    const onCustomRestoreState = () => {
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem('dt-state-demo-custom'));
    }

    const cardsBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                <img alt={""} src="/images/flag/flag_placeholder.png" onError={(e:any) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.cardPacks[0].cardsCount}`} width="30" />
                <span className="image-text">{rowData.cardPacks[0].cardsCount}</span>
            </React.Fragment>
        );
    }

    const lastUpdatedBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                <img alt={rowData.cardPacks[0].updated} src={`images/avatar/${rowData.cardPacks[0].updated}`} onError={(e:any) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.cardPacks[0].updated}</span>
            </React.Fragment>
        );
    }

    const representativeFilterTemplate = (options:any) => {
        return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    }

    const representativesItemTemplate = (option:any) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`images/avatar/${option.image}`} onError={(e:any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    const statusBodyTemplate = (rowData:any) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options:any) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option:any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const onGlobalFilterChange = (event:any, filtersKey:any) => {
        const value = event.target.value;
        // @ts-ignore
        let filters = { ...filtersMap[filtersKey].value };
        filters['global'].value = value;

        // @ts-ignore
        filtersMap[filtersKey].callback(filters);
    }

    const renderHeader = (filtersKey:any) => {
        // @ts-ignore
        const filters = filtersMap[`${filtersKey}`].value;
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e, filtersKey)} placeholder="Global Search" />
            </span>
        );
    }

    const header3 = renderHeader('filters3');

    return (
        <div>
                <h5>Custom Storage</h5>
                <DataTable value={cardsPack} paginator rows={10} header={header3} filters={filters3} onFilter={(e:any) => setFilters3(e.filters)}
                           selection={selectedCustomer3} onSelectionChange={e => setSelectedCustomer3(e.value)} selectionMode="single" dataKey="id" responsiveLayout="scroll"
                           stateStorage="custom" customSaveState={onCustomSaveState} customRestoreState={onCustomRestoreState} emptyMessage="No customers found.">
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name"></Column>
                    <Column header="Cards" body={cardsBodyTemplate} sortable sortField="country.name" filter filterField="country.name" filterPlaceholder="Search by country"></Column>
                    <Column header="Last updated" body={lastUpdatedBodyTemplate} sortable sortField="representative.name" filter filterField="representative" showFilterMatchModes={false} filterElement={representativeFilterTemplate} filterMenuStyle={{ width: '14rem' }}></Column>
                    <Column field="Created by" header="Created by" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} filterMenuStyle={{ width: '14rem' }}></Column>
                    <Column field="Actions" header="Actions" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} filterMenuStyle={{ width: '14rem' }}></Column>
                </DataTable>
        </div>
    );
};

export default PacksTable;