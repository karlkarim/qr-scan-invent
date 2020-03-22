import React, {useState,useEffect} from 'react';
import QRCodeGenerator from 'qrcode.react';
import firebase from '../../firebase';
import './style.css';



const QRManagerList = () => {

    

    const [items, setItems] = useState([]) 
    const [showQR, setShowQR] = useState(false)

    const getItems = async() => {
        try {
            firebase.firestore().collection("items").onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItems(item)
            })
            
        } catch (error) {
            console.log(error)
        }

    }


    const doDownload = (svgId, name) => {
        let svg = document.getElementById(svgId);
        let converted = new XMLSerializer().serializeToString(svg)
        let dataUrl = encodeURIComponent(converted)
        let dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", `data:image/svg+xml, ${dataUrl}`);
        dl.setAttribute("download", `${name}.svg`);
        dl.click();
    }

    const deleteItem = async(item) => {

        try {
            const deleteItem = firebase.firestore().collection("items").doc(item).delete()           
            return deleteItem;
        } catch (error) {
            console.log(error);
        }

    }    

   

    useEffect(() => {
        getItems();
    }, [])

    return(
        

    <section>  
            <div className="manag-list-columns">
                {items.map(item => (

               
                    <div className="manag-list-card">
                       <div className="manag-list-content" >
                        <div className="manag-list-card-header">
                            <p className="manag-list-title">
                            {item.name}
                            </p>
                        </div>
                   
                        
                        <div className="manag-list-card-footer">
                            <a href="#" class="manag-list-download" onClick={() => doDownload(item.id, item.name)}>Save</a>
                            <button class="manag-list-delete" onClick={() => deleteItem(item.id)}>Delete</button>
                            <button class="manag-list-show" onClick={() => setShowQR(!showQR)}>Show QR</button>
                        </div>
                        </div>
                        {showQR && 
                        <div className="qr-svg" >
                        <QRCodeGenerator 
                            value={item.name}
                            id = {item.id}
                            imageSettings={{excavate: true, height: 24,width: 24}} renderAs='svg' includeMargin={true} level='H'
                        />                     
                        </div>}       
                    <div className='underLine'></div>
                    </div>
                ))}      
            </div>    
    </section>



    )

}

export default QRManagerList;