import React, {useState} from 'react';
import {Slider} from 'primereact/slider';


const SliderFilter = () => {

    const [value, setValue] = useState<any>([0, 100]);

    return (
        <div>
            <div className="card" style={{width: 160, display: "flex", justifyContent: "space-between"}}>
                <span>{value[0]}</span>
                <div style={{width: 100}}>
                    <Slider value={value} onChange={(e) => setValue(e.value)} range/>
                </div>
                <span>{value[1]}</span>
            </div>
        </div>
    );
};

export default SliderFilter;