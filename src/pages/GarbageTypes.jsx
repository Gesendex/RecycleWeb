import React, {useEffect, useState} from 'react';
import {useFetching} from "../componets/hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../componets/UI/Loader/Loader";
import GarbageTypeList from "../componets/GarbageTypeList";
import {useSelector} from "react-redux";

function GarbageTypes() {
    const [garbageTypes, setGarbageTypes] = useState([]);
    const user = useSelector(state => state.user.user)
    const [fetchGarbageTypes, isGarbageTypesLoading, garbageTypesError] = useFetching(async (token) => {
        const response = await PostsService.getTypesOfGarbage(token)
        setGarbageTypes([...garbageTypes, ...response.data])
    })

    useEffect(() => {
        fetchGarbageTypes(user.token)
    }, [])

    return (
        <div className="App">
            {isGarbageTypesLoading ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <GarbageTypeList
                    garbageTypes={garbageTypes}
                    title='Типы сортируемого мусора'
                />
            }
        </div>
    );
}

export default GarbageTypes;