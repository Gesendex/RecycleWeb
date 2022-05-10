import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GarbageTypeItem from "./GarbageTypeItem";

const GarbageTypeList = ({garbageTypes, title}) => {
    if (!garbageTypes.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Типы мусора не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {garbageTypes.map((garbageType, index) =>
                    <CSSTransition
                        key={garbageType.id}
                        timeout={500}
                        classNames="garbageType"
                    >
                        <GarbageTypeItem number={index + 1} garbageType={garbageType}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default GarbageTypeList;