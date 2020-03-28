import React, {useState, useEffect} from 'react'
import firebase from '../../firebase';
import './style.css'


const ItemsList = () => {

    const [items, setItems] = useState([]) 
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const getItems = async() => {
        try {
            firebase.firestore().collection("items").onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItems(item)
                setSearchResult(item)
            })      
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItems();
        
    }, [])

    useEffect(() => {
        const results = items.filter(function(item) {
            return item.name.toLowerCase().includes(searchTerm);
        });
        console.log(results);
          setSearchResult(results);
      }, [searchTerm]); 
    


    console.log(searchTerm)

    return(

        <div className='items-list' style={{marginTop:60}}>
            <div className="items-list-header">List of all items</div>
            <div className="items-list-search">
                <input
                    type="text" 
                    class="search-form-control" 
                    placeholder="What you looking for?"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className="items-list-columns">
                {searchResult.map(item => (
                    <div className="items-list-card">
                        <div className="items-list-content" >
                            <p className="items-list-card-header">
                                <p className="items-list-item">
                                {item.name}
                                </p>
                                <i class={`${item.status === 'OUT' ? 'fas fa-sign-out-alt' : 'fas fa-check-square'}`}></i>
                                <p>{`${item.status === 'OUT' ? `Taken by: ${item.takenBy}`: 'asi sees'}`}</p>
                                <button className="items-list-takebtn">Take item</button>
                            </p>
                        </div>
                    </div>      
                ))}                        
            </div>    
        </div>       
    )
}

export default ItemsList;