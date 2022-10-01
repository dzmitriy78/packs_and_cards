import React, {ChangeEventHandler, useRef} from "react";
import {Button} from "primereact/button"

const UploadFileInput: React.FC<UploadFileInputPropsType> = ({
                                                                 label,
                                                                 icon,
                                                                 className,
                                                                 dispatch,
                                                                 callback
                                                             }) => {

    const filePicker = useRef<HTMLInputElement>(null)
    const handlePick = () => filePicker.current?.click()

    const convertToBase64 = (file: File, callback: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callback(file64)
        }
        reader.readAsDataURL(file)
    }

    const onFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            if (file.size < 3000000) {
                convertToBase64(file, (file64: string) => {
                    callback(file64)
                    if (dispatch) {
                        dispatch(file64)
                    }
                })
            } else {
                alert("File is too big")
            }
        }
    }

    return (
        <div>
            <Button label={label}
                    icon={icon}
                    className={className}
                    onClick={handlePick}>
            </Button>
            <input style={{opacity: 0, height: 0, width: 0, padding: 0, margin: 0, lineHeight: 0, overflow: "hidden"}}
                   type={"file"}
                   onChange={onFileSelect}
                   ref={filePicker}
                   accept={"image/*,.png, .jpg, .gif, .web"}/>
        </div>
    )
}
export default UploadFileInput

type UploadFileInputPropsType = {
    label: string
    icon: string
    className: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    callback(file64: string): void
    dispatch?(file64: string): void
}