import React, { useEffect, useState } from 'react';
import PaperCard, { variant } from '../Cards/PaperCard';
import firebase from '../../firebase';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
const SummarySection = () => {
    const [items, setItems ] = useState([])
    const [users, setUsers ] = useState([])
    const history = useHistory('');
    const getItems = async () => {
        try {
            firebase.firestore()
            .collection("items")
            .onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                }))
                setItems(item)
            })
            return;
        } catch (error) {
            console.log(error)
        }
    }
    const getUsers = async () => {
        try {
            firebase.firestore()
            .collection("users")
            .onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                }))
                setUsers(item)
            })
            return;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getItems();
        getUsers();
    },[])
    return ( 
        <section>
            <div className='card-wrapper'>
            {items.length ?
            <div className='flex-row'>
            <PaperCard
                color={variant[0]}
                onClick={() => history.push('/manage-qr')}
                title={'Items'}
                subTitle={items ? items.length : '0'}
                icon={'far fa-list-alt'}
            />
            <PaperCard
                color={variant[4]}
                onClick={() => history.push('/manage-users')}
                title={'Users'}
                subTitle={users ? users.length : '0'}
                icon={'fas fa-users-cog'}
            />
            </div> :
            <div style={{textAlign: 'center'}}>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
            </div>
            }
            </div>
            </section>
     );
}
 
export default SummarySection;