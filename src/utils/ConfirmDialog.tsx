import React, {useRef, useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';

const Confirm: React.FC<ConfirmPropsType> = ({icon, callback, className, title, message , disabled}) => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        // @ts-ignore
        toast.current.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
        callback()
    }

    const reject = () => {
        // @ts-ignore
        toast.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    }

    return (
        <div>
            <Toast ref={toast}/>

            <div className="card">
                <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={message}
                               header="Confirmation" icon={icon} accept={accept} reject={reject}/>
                <Button onClick={() => setVisible(true)}
                        icon={icon}
                        label={title}
                        className={className}
                        disabled={disabled}/>
            </div>
        </div>
    )
}
export default Confirm

type ConfirmPropsType = {
    icon: string
    callback(): void
    className: string
    title: string
    message: JSX.Element | string
    disabled: boolean
}