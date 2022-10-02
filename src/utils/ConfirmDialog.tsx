import React, {useState} from 'react';
import {ConfirmDialog} from 'primereact/confirmdialog';
import {Button} from 'primereact/button';

const Confirm: React.FC<ConfirmPropsType> = ({icon, callback, className, title, message, disabled}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card">
            <ConfirmDialog visible={visible}
                           onHide={() => setVisible(false)}
                           message={message}
                           header="Confirmation"
                           icon={icon}
                           accept={callback}/>
            <Button onClick={() => setVisible(true)}
                    icon={icon}
                    label={title}
                    className={className}
                    disabled={disabled}/>
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