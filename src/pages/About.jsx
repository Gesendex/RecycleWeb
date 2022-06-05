import React from 'react';
import classes from "./style/About.module.css";
import img1 from "../assets/About_1.png";

const About = () => {
    return (
        <div className={classes.container}>
            <div className={classes.mainHeader}>
                Сайт разработан в поддержку<br/>национального проекта<br/>"Экология"
            </div>
            <div className={classes.contentRow}>
                <p className={classes.text}>
                    Работа по нацпроекту, направленному на охрану окружающей среды, ведётся по следующим
                    направлениям: утилизация и переработка отходов, ликвидация свалок, сохранение лесов и водоемов,
                    снижение выбросов в атмосферу, развитие экологического туризма и экологического воспитания,
                    сохранение биологического разнообразия.
                </p>
                <img src={img1} alt="img1"/>
            </div>
        </div>
    );
};

export default About;