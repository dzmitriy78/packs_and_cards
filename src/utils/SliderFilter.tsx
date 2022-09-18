import React, {useEffect, useState} from 'react';
import {Slider} from 'primereact/slider';
import {setPacksParamsTC} from "../main/bll/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../main/bll/store";
import {GetPacksParamsType} from "../main/dal/packsAPI";
import useDebounce from "../hooks/useDebounce";
import {RequestLoadingType} from "../main/bll/appReducer";
import "./../styles/App.css"


const SliderFilter = () => {

    const dispatch = useDispatch<DispatchType>()
    const params = useSelector<AppStoreType, GetPacksParamsType>(state => state.packs.getPacksParams)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)
    const max = useSelector<AppStoreType, number>(state => state.packs.maxCardsCount)
    const min = useSelector<AppStoreType, number>(state => state.packs.minCardsCount)

    const [value, setValue] = useState<number | [number, number]>([min, max])

    // @ts-ignore
    const [first, second] = value
    const myParams = {...params, min: first, max: second}
    const debouncedValue = useDebounce<number | [number, number]>(value, 600)

    useEffect(() => {
        dispatch(setPacksParamsTC(myParams))
    }, [debouncedValue, min, max])

    return (
        <div className="slider-demo">
            <div className="card" >
                    <div>Range: [{first}, {second}]</div>
                    <Slider value={value} disabled={isLoading === "loading"}
                            onChange={(e) => setValue(e.value)} range/>
            </div>
        </div>
    );
};

export default SliderFilter;