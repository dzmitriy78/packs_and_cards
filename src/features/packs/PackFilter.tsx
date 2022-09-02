import React from 'react';
import cl from "./PackFilter.module.scss"
import SelectButt from "../../utils/SelectButton";
import SliderFilter from "../../utils/SliderFilter";
import MyInput from "../../utils/MyInput";

const PackFilter = () => {


    return (
        <div className={cl.filterWrapper}>
            <div className={cl.searchBlock}>
                <div className={cl.searchTitle}>Search</div>
                <MyInput typeOf={"search"} placeholder={""}/>
            </div>
            <div className={cl.filterBlock}>
                <div className={cl.searchTitle}>
                    Show pack cards
                </div>
                <div className={cl.filterBtn}>
                    <SelectButt/>
                </div>
            </div>
            <div className={cl.rangeBlock}>
                <div className={cl.searchTitle}>
                    Number of cards
                </div>
                <SliderFilter/>
            </div>
        </div>
    );
};

export default PackFilter;