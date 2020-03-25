import React, { useGlobal, useState, useEffect } from 'reactn';
import firebase from '../../../firebase';
import moment from 'moment';
import ContentBox from '../../ContentBox/index';
import ProgressBar from '../../ProgressBar/index';
import './index.css';

const UserItemsList = () => {
	const [ loggedInUserData ] = useGlobal('loggedInUserData');
	const [ myItems, setMyItems ] = useState([])

	const getItems = async () => {
		if(loggedInUserData.length === 0) return;
		try {
				const itemsQuery = await firebase.firestore().collection('items').where('takenBy', '==', loggedInUserData[0].firstName).get()
				const myItems = itemsQuery.docs.map(item => ({
					id: item.id,
					...item.data()
			}))
				setMyItems(myItems);
			} catch (error) {
				console.log(error)
			}
	}
	const calcProgress = (returnDate, takenDate) => {
		const max = daysDiff(takenDate);
		const from = daysDiff(returnDate);
		if(max*-1 > from) {
			const final = (from * 100) / (max*-1);
			return Math.ceil(100-final);
		} else {
			const final = ((max*-1) * 100) / (from);
			return Math.ceil(100-final);
		}
	}

	const daysDiff = (itemDate) => { 
		let date2 = new Date(); 
		let date1 = (itemDate * 1000);
		// To calculate the time difference of two dates 
		let Difference_In_Time =  date1 - date2.getTime(); 
		// To calculate the no. of days between two dates
		let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		return Math.round(Difference_In_Days);
	}
	useEffect(() => {
		getItems()
	}, [loggedInUserData])
	console.log(myItems[0])
	return ( 
		<section>
			<ContentBox
				title='To be returned'
				icon={<i class="fas fa-history"></i>}
				children={
				myItems.map(item => (
				<div className='item-list'>
					{item.name}
					<ProgressBar
						label={moment.unix(item.returnDate.seconds).fromNow()}
						progress={calcProgress(item.returnDate.seconds,item.takenDate.seconds)}/>
				</div>
				))
			} />
		</section>
		);
	}
	
	export default UserItemsList;