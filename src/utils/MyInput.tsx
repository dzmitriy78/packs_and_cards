import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import { Password } from 'primereact/password';

const MyInput: React.FC<any> = ({typeOf, placeholder}) => {

    const [value, setValue] = useState('');

    return (
        <div>
            <div className="card">
                {typeOf === "search" && <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search"/>
                </span>
                }
                {typeOf === "basic" && <div>
                    <span className="p-float-label">
                    <InputText id="placeholder" value={value} onChange={(e) => setValue(e.target.value)} />
                    <label htmlFor="placeholder">{placeholder}</label>
                </span>
                </div>
                }
                {typeOf === "password" && <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />}
            </div>
        </div>
    )
}

export default MyInput;