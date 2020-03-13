import React from 'react';
import app from "../firebase";
import scan from '../img/scan.svg';
import myItems from '../img/myItems.svg';
import allItems from '../img/allItems.svg';
import cars from '../img/cars.svg';

const Home = () => {
    return (
        <>
        <section className="hero is-info is-medium ">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">TM Development</h1>
                    <h2 className="subtitle">QR Inventory</h2>
                </div>
            </div>
        </section>
            <br />
                <section>
                    <div class="container">
                        <div class="tile is-ancestor">
                            
                                        <div class="tile is-parent is-6">
                                            <article class="tile is-child box">
                                                <p class="title">Scan</p>
                                                <p class="subtitle">Scan QR Code to borrow an item</p>
                                                <figure class="image is-128x128">
                                                <img src={scan} alt=""/>
                                                </figure>
                                            </article>
                                        </div>

                                        <div class="tile is-parent is-6">
                                            <article class="tile is-child box">
                                                <p class="title">All Items</p>
                                                <p class="subtitle">List of all the items</p>
                                            <figure class="image is-128x128">
                                                <img src={allItems} alt=""/>
                                            </figure>
                                            </article>
                                        </div>
                        </div>

                        <div class="tile is-ancestor">
                                        <div class="tile is-parent is-6">
                                            <article class="tile is-child box">
                                                <p class="title"> My Items</p>
                                                <p class="subtitle">List of items you have borrowed</p>
                                                <figure class="image is-128x128">
                                                    <img src={myItems} alt=""/>
                                                </figure>
                                            </article>
                                        </div>

                                        <div class="tile is-parent is-6">
                                             <article class="tile is-child box">
                                                <p class="title">Cars</p>
                                                <p class="subtitle">List of cars</p>
                                                 <figure class="image is-128x128">
                                                    <img src={cars} alt=""/>
                                                </figure>
                                            </article>
                                        </div>

                        </div>
                    </div>
        </section>
        </>    
    );
};

export default Home;