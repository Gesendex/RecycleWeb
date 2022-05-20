import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GarbageTypeItem from "./GarbageTypeItem";
import classes from "./styles/GarbageTypeList.module.css";

const GarbageTypeList = ({garbageTypes}) => {
    if (!garbageTypes.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Типы мусора не найдены!
            </h1>
        )
    }
    return (
        <div className={classes.garbageType_list}>
            <div className="list_title_container">
                <div className="list_title">Типы сортируемого мусора</div>
            </div>
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