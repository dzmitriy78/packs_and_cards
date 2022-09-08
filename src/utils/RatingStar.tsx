import React, {useState} from 'react';
import {Rating} from 'primereact/rating';

const RatingStar: React.FC<any> = ({grade}) => {

    const [val, setVal] = useState<any>(grade);

    return (
        <div>
            <div className="card">
                <Rating value={val} cancel={false} onChange={(e) => setVal(e.value)}/>
            </div>
        </div>
    )
}
export default RatingStar