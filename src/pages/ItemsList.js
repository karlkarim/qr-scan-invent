import React, {useState, useEffect} from 'react'
import firebase from '../firebase';


const ItemsList = () =>{

    const [items, setItems] = useState([]) 

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

    useEffect(() => {
        getItems();
    }, [])


    console.log(items)

    return(

        <div className='items-list' style={{marginTop:60}}>Asjad siia:
            <div className="manag-list-columns">
                {items.map(item => (
                    <div className="manag-list-card">
                        <div className="manag-list-content" >
                            <div className="manag-list-card-header">
                                <p className="manag-list-title">
                                {item.name}
                                </p>
                            </div>
                        </div>
                    </div>      
                ))}                        
            </div>    
        </div>        
    )
}

export default ItemsList;