import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GarbageCollectionPointItem from "./GarbageCollectionPointItem";
import GarbageCollectionPointsFilter from "./GarbageCollectionPointsFilter";

const GarbageCollectionPointList = ({garbageCollectionPoints, title, openComments, filter, setFilter, companies}) => {
    if (!garbageCollectionPoints.length) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>
                    Посты не найдены!
                </h1>

                <GarbageCollectionPointsFilter
                    filter={filter}
                    setFilter={setFilter}
                    companies={companies}
                />
            </div>

        )
    }
    return (
        <div>
            <div className="list_title_container">
                <div className="list_title">{title}</div>
            </div>
            <GarbageCollectionPointsFilter
                filter={filter}
                setFilter={setFilter}
                companies={companies}
            />

            <TransitionGroup>
                {garbageCollectionPoints.map((garbageCollectionPoint, index) =>
                    <CSSTransition
                        key={garbageCollectionPoint.id}
                        timeout={500}
                        classNames="post"
                    >
                        <GarbageCollectionPointItem number={index + 1} openComments={openComments}
                                                    garbageCollectionPoint={garbageCollectionPoint}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default GarbageCollectionPointList;