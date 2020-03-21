import React, {useState,useEffect} from 'react';
import HeroQRManager from "../components/qrManagerHero";
import QRGeneratorSection from "../components/qrGeneratorSection";
import QRManagerList from "../components/qrManagerList"

const QRManager = () => {
   
    return (
    <div className="card-wrapper">

        <HeroQRManager></HeroQRManager>
        <QRGeneratorSection></QRGeneratorSection>
        <QRManagerList></QRManagerList>        

    </div> ); 
};
 
export default QRManager;
  