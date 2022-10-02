import React from 'react';
import {FileUpload} from 'primereact/fileupload';

export const UploadFileWithBase64: React.FC<UploadFilePropsType> = ({dispatch, cb}) => {

    const customBase64Uploader = async (event: { files: File[] }) => {
        const file = event.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const base64data = reader.result as string
            cb(base64data)
            if (dispatch) {
                dispatch(base64data)
            }
        }
    }

    return (
        <div>
            <div className="card">
                <FileUpload mode="advanced" auto maxFileSize={3000000} invalidFileSizeMessageSummary={""}
                            accept="image/*" customUpload uploadHandler={customBase64Uploader}/>
            </div>
        </div>
    )
}
export default UploadFileWithBase64

type UploadFilePropsType = {
    cb(base64data: string): void
    dispatch?(base64data: string): void
}