import React from 'react';
import app from "./firebase";
import scan from './img/scan.svg';
import list_items from './img/list_items.svg';

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
                                                <p class="subtitle">text here</p>
                                                <figure class="image is-128x128">
                                                <img src={scan} alt=""/>
                                                </figure>
                                            </article>
                                        </div>

                                        <div class="tile is-parent is-6">
                                            <article class="tile is-child box">
                                                <p class="title">Items</p>
                                                <p class="subtitle">text here</p>
                                            <figure class="image is-128x128">
                                                <img src={list_items} alt=""/>
                                            </figure>
                                            </article>
                                        </div>
                        </div>

                        <div class="tile is-ancestor">
                                        <div class="tile is-parent is-6">
                                            <article class="tile is-child box">
                                                <p class="title"> My Items</p>
                                                <p class="subtitle">text here</p>
                                                <figure class="image is-128x128">
                                                    <img src={list_items} alt=""/>
                                                </figure>
                                            </article>
                                        </div>

                                        <div class="tile is-parent is-6">
                                             <article class="tile is-child box">
                                                <p class="title">Cars</p>
                                                <p class="subtitle">text here</p>
                                                 <figure class="image is-128x128">
                                                    <img src={scan} alt=""/>
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