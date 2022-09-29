import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import './../styles/App.css';

const Modal: React.FC<ModalPropsType> = ({
                                             children,
                                             callback,
                                             title,
                                             titleBtn,
                                             icon,
                                             className,
                                             disabled
                                         }) => {

    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name: string) => {
        // @ts-ignore
        dialogFuncMap[`${name}`](true)

        if (position) {
            setPosition(position)
        }
    }

    const onHide = (name: string) => {
        // @ts-ignore
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name: string) => {
        return (
            <div>
                <Button label="Cancel"
                        icon="pi pi-times"
                        onClick={() => onHide(name)}
                        className="p-button-text"/>
                <Button label="Save"
                        icon="pi pi-check"
                        autoFocus
                        onClick={() => {
                            onHide(name);
                            callback()
                        }}/>
            </div>
        )
    }

    return (
        <div className="dialog-demo">
            <div className="card">
                <Button label={titleBtn}
                        icon={icon}
                        onClick={() => onClick('displayResponsive')}
                        className={className}
                        disabled={disabled}/>
                <Dialog header={title}
                        visible={displayResponsive}
                        onHide={() => onHide('displayResponsive')}
                        breakpoints={{'960px': '75vw'}}
                        style={{width: '50vw'}}
                        footer={renderFooter('displayResponsive')}>
                    {children}
                </Dialog>
            </div>
        </div>
    )
}
export default Modal

type ModalPropsType = {
    children: React.ReactNode
    callback(): void
    title?: string
    titleBtn?: string
    icon: string
    className: string
    disabled: boolean
}