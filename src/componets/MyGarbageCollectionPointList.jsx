import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import MyGarbageCollectionPointItem from "./MyGarbageCollectionPointItem";
import NavbarButton from "./UI/button/NavbarButton";
import linkClass from "./UI/button/NavbarButton.module.css";

const MyGarbageCollectionPointList = ({garbageCollectionPoints, title, openCreateModal, openEditModal, onDelete}) => {
    if (!garbageCollectionPoints.length) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>
                    Посты не найдены!
                </h1>
            </div>
        )
    }

    return (
        <div>
            <div className="list_title_container">
                <div className="list_title">{title}</div>
            </div>

            <div className="center">
                <NavbarButton
                    className={linkClass.navbar_btn_exit}
                    onClick={openCreateModal}
                >
                    Создать новую точку
                </NavbarButton>
            </div>
            <TransitionGroup>
                {garbageCollectionPoints.map((garbageCollectionPoint, index) =>
                    <CSSTransition
                        key={garbageCollectionPoint.id}
                        timeout={500}
                        classNames="post"
                    >
                        <MyGarbageCollectionPointItem
                            number={index + 1}
                            onDelete={onDelete}
                            openEditPoint={openEditModal}
                            garbageCollectionPoint={garbageCollectionPoint}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default MyGarbageCollectionPointList;