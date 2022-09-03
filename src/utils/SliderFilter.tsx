import React, {useEffect, useState} from 'react';
import {Slider} from 'primereact/slider';
import {setPacksParamsTC} from "../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../main/bll/store";
import {GetPacksParamsType} from "../main/dal/packsAPI";
import useDebounce from "../hooks/useDebounce";
import {RequestLoadingType} from "../main/bll/appReducer";


const SliderFilter = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const [value, setValue] = useState<any>([0, 120]);

    const myParams = {...params, min: value[0], max: value[1]}
    const debouncedValue = useDebounce<string>(value, 600)

    useEffect(() => {
        dispatch(setPacksParamsTC(myParams))
    }, [debouncedValue])

    return (
        <div>
            <div className="card" style={{width: 160, display: "flex", justifyContent: "space-between"}}>
                <span>{value[0]}</span>
                <div style={{width: 100}}>
                    <Slider value={value} disabled={isLoading === "loading"} max={120} onChange={(e) => setValue(e.value)} range/>
                </div>
                <span>{value[1]}</span>
            </div>
        </div>
    );
};

export default SliderFilter;