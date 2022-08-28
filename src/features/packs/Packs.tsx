import React from 'react';
import {packsAPI} from "../../main/dal/packsAPI";

const Packs = () => {

    const getTC = async () => {
        const res = await packsAPI.getPacks()
        console.log(res)
    }
    return (
        <div>
            <button onClick={getTC}>get</button>
        </div>
    )
}

export default Packs;