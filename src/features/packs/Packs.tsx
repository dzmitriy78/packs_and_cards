import React from 'react';
import cl from "./Packs.module.scss";
import PackFilter from "./PackFilter";
import PacksTable from "./PacksTable";

const Packs = () => {

    return (<>
            <div className={cl.packsWrapper}>
                <div className={cl.header}>
                    <div className={cl.title}>Pack list</div>
                    <button className={cl.button}>Add new pack</button>
                </div>
            </div>
            <PackFilter/>
            <PacksTable/>
        </>
    )
}

export default Packs;