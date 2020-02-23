import React, {useState,useEffect} from 'react';
import QRCodeGenerator from 'qrcode.react';
import firebase from "../firebase";

const QRManager = () => {
    const [data, setData ] = useState('')
    const [items, setItems] = useState([]) 
    
    const handleQRValue=(e) => {
        e.preventDefault()
        setData(e.target.value)
    }



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

    const addQR = async(qrItemName) => {

        try {
            const add = await firebase.firestore().collection("items").add({name: qrItemName})
            return add;
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getItems();
    }, [])

    return (<div className="container">
            <section>
                
                <div className="content">

                    <h1 className="title">QR Manager</h1>                
                </div>
            </section>
            <section>
                <div className="columns is-desktop">
                    
                    <div className="column is-two-thirds ">
                        <div className="box">
                            <div className="field is-horizontal">   
                                <div class="field-label is-normal">     
                                    <label class="label">Eseme nimi</label>  
                                </div> 
                            <div class="field-body">   
                            <div class="field">       
                                <p class="control">       
                                    <input class="input" type="text" value={data} onChange={handleQRValue}/>    
                                </p>    
                            </div>   
                            </div> 
                            </div> 
                            <button class="button is-link is-rounded" onClick={() => addQR(data)}>Add Item</button>              
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">
                            <QRCodeGenerator 
                                value={data}
                                imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}}
                            />
                        </div>
                    </div>

                </div>
             </section>
        <section>
            <div className="container">
                <div className="columns is-multiline">
                    {items.map(item => (

                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                {item.name}
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </a>
                            </header>
                            <div className="card-content">
                            <div className="content" >
                            <QRCodeGenerator 
                                value={item.name}
                                imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}}
                            />                            </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
                    </div>  
                    ))}
                    
                        
                </div>
            </div>
        </section>
        
      </div> ); 
};
 
export default QRManager;
  