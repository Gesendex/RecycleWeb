import React from 'react';
import classes from "./styles/GarbageCollectionPointsFilter.module.css";
import RecycleSelect from "./UI/select/RecycleSelect";
import LoginInput from "./UI/input/LoginInput";

const GarbageCollectionPointsFilter = ({filter, setFilter, companies}) => {


    return (
        <div className={classes.garbageCollectionPoint_filter}>
            <RecycleSelect
                value={filter.garbageTypeId}
                onChange={value => setFilter({...filter, garbageTypeId: value})}
                defaultValue='Типы принимаемого мусора'
                options={[
                    {value: 0, name: 'Все'},
                    {value: 1, name: 'Стекло'},
                    {value: 2, name: 'Пластик'},
                    {value: 3, name: 'Макулатура'},
                    {value: 4, name: 'Металл'},
                    {value: 5, name: 'PAC'},
                    {value: 6, name: 'Опасные отходы'}
                ]}
            />
            <RecycleSelect
                value={filter.companyId}
                onChange={value => setFilter({...filter, companyId: value})}
                defaultValue='Компания'
                options={[{value: 0, name: 'Все'}, ...companies.map(company => ({
                    value: company.id,
                    name: company.name
                }))]}
            />
            <LoginInput
                placeholder='Адрес...'
                value={filter.address}
                onChange={event => setFilter({...filter, address: event.target.value})}
                style={{width: 200}}
            />
        </div>
    );
};

export default GarbageCollectionPointsFilter;