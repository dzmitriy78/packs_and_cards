import React from 'react';
import cl from "./Packs.module.scss";
import PacksTable from "./PacksTable";
import PacksTable2 from "./PacksTable2";
import PackFilter from "./PackFilter";

const Packs = () => {

    return (<>
            <div className={cl.packsWrapper}>
                <div className={cl.header}>
                    <div className={cl.title}>Pack list</div>
                    <button className={cl.button}>Add new pack</button>
                </div>
            </div>
            <PackFilter/>
            <PacksTable2/>
        </>
    )
}

export default Packs;