import React from 'react';
import '../styles/about.scss';

const about = () => (
    <div className="wrapper">
        <a href="/">Soy un link hacia atras</a>
        <h1 className="title">About</h1>
        <img className="logo" src="/platzi-logo.png" alt="platzi"/>
        <div className="info">
            <h3>Creado por Jhonel</h3>
            <p>Ejercicio del curso de Next.js</p>
        </div>
    </div>
)

export default about;