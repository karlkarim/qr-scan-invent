import React, { useState} from 'react';
import './style.css';
import QRCodeGenerator from 'qrcode.react';
import firebase from "../../firebase"; 


const QRGeneratorSection = () => {
    const [data, setData ] = useState('')
    const addQR = async(qrItemName) => {

        if (!qrItemName) return alert("Add some value!");
        try {
            const add = await firebase.firestore().collection("items").add({name: qrItemName})
            setData('');
            return add;
        } catch (error) {
            
        }
    }

    const handleQRValue=(e) => {
        e.preventDefault()
        setData(e.target.value)
    }

    return(
<section className="qrgenerator-section">
                                                            
    <div className="qr-generator-box">
        <QRCodeGenerator 
            value={data}
            imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}}
        />
    </div>
                                                        
    <div class="field">       
        <p class="control">       
        <input class="qrcode-input" type="text" value={data} onChange={handleQRValue} placeholder="Enter Item Name"/>  
        </p>    
    </div>                      
    <button class="addQR-btn" onClick={() => addQR(data)}>Add Item</button>              
                       
<div className="underLine">

</div>
            
</section>
)
};

export default QRGeneratorSection;