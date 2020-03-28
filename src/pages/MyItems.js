import React, {useGlobal,useState, useEffect} from 'reactn'
import firebase from '../firebase'

const MyItems = () => {

    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const [ myItems, setMyItems ] = useState([]) 
    
    

    const getItems = async () => {
		if(loggedInUserData.length === 0) return;
		try {
				const itemsQuery = await firebase.firestore().collection('items')
				.where('takenBy', '==', loggedInUserData[0].firstName)
				.where('status', '==', 'OUT')
				.get()
				const myItems = itemsQuery.docs.map(item => ({
					id: item.id,
					...item.data()
			}))
				setMyItems(myItems);
			} catch (error) {
				console.log(error)
			}
	}

    // const getItems = async() => {
    //     try {
    //         firebase.firestore().collection("items").onSnapshot(items => {
    //             const item = items.docs.map(doc => ({
    //                 id: doc.id,
    //                 ...doc.data()
    //             }))
    //             setItems(item)
                
    //         })      
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        getItems();
        
    }, [loggedInUserData])

   

    return(
        <div className='items-list' style={{marginTop:60}}>
            <div className="items-list-header">My items</div>
        
            <div className="items-list-columns">
                {myItems.map(item => (
                    <div className="items-list-card">
                        <div className="items-list-content" >
                            <p className="items-list-card-header">
                                <p className="items-list-item"/>
                                {item.name}
                            </p>
                            <button className="items-list-takebtn">Return item</button>
                        </div>
                    </div>      
                ))}                        
            </div>    
        </div>      

    )

}

export default MyItems;