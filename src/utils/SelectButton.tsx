import React, { useState } from 'react';
import {SelectButton, SelectButtonProps} from 'primereact/selectbutton';
import {SelectItemOptionsType} from "primereact/selectitem";

const SelectButt = (props:SelectButtonProps) => {
    const [value, setValue] = useState<any>('All');
    const options: SelectItemOptionsType = ['My', 'All'];

    const chooseMyPacks = ()=>{
       if (value === 'All'){

       }
    }

    return (
        <div>
            <div className="card" onClick={chooseMyPacks}>
                <SelectButton value={value} options={options} onChange={(e: { value: any; }) => setValue(e.value)} />
            </div>
        </div>
    );
};

export default SelectButt;