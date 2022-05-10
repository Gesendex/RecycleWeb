import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GarbageCollectionPointItem from "./GarbageCollectionPointItem";

const GarbageCollectionPointList = ({garbageCollectionPoint, title, remove}) => {
    if (!garbageCollectionPoint.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {garbageCollectionPoint.map((garbageCollectionPoint, index) =>
                    <CSSTransition
                        key={garbageCollectionPoint.id}
                        timeout={500}
                        classNames="post"
                    >
                        <GarbageCollectionPointItem remove={remove} number={index + 1} garbageCollectionPoint={garbageCollectionPoint}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default GarbageCollectionPointList;