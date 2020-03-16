import React from 'react';
import app from "../firebase";
import scan from '../img/scan.svg';
import myItems from '../img/myItems.svg';
import allItems from '../img/allItems.svg';
import cars from '../img/cars.svg';
import CardIcon from '../components/cards/cardsWithIcon';
import {cardsArray} from '../siteData/CardData'
import { useHistory } from 'react-router-dom'


const Home = () => {
    const history = useHistory('');
    return (
        <>
        
        <section className="hero-section">
            <div className="hero-image">
                <div className="hero-text">
                    <h1>TMD</h1>
                    <p>QR Inventory</p>
                </div>
            </div>
        </section>
        <br />
        <section>
                    
        </section>
            <div className="card-wrapper flex-row">
                {cardsArray.map(data => (
                <CardIcon
                    icon={data.icon}
                    text={data.text}
                    onClick={() => history.push(data.link)}
                />

        ))}
            </div>
            
        </>    
    );
};

export default Home;
        