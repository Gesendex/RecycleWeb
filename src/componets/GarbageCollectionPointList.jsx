import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GarbageCollectionPointItem from "./GarbageCollectionPointItem";

const GarbageCollectionPointList = ({garbageCollectionPoints, title}) => {
    if (!garbageCollectionPoints.length) {
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
                {garbageCollectionPoints.map((garbageCollectionPoint, index) =>
                    <CSSTransition
                        key={garbageCollectionPoint.id}
                        timeout={500}
                        classNames="post"
                    >
                        <GarbageCollectionPointItem  number={index + 1} garbageCollectionPoint={garbageCollectionPoint}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default GarbageCollectionPointList;