import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import './activity.css';

const ActivitySection = () => {
    const [logs, setLogs ] = useState([]);

    const variant = {
        DELETE:'danger-light',
        INSERT:'green-light',
        UPDATE:'warning-light',
    }
    const label =(status) => {
        switch (status) {
          case 'DELETE':
            return variant.DELETE;
          case 'INSERT':
            return variant.INSERT;
          case 'UPDATE':
            return variant.UPDATE;
          default:
            return null;
        }
      }

    const getActivityLogs = async () => {
        try {
            firebase.firestore()
            .collection("activityLogs")
            .orderBy("created_at", "desc").limit(10)
            .onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setLogs(item)
            })
            return;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getActivityLogs();
        label('DELETE');
        // eslint-disable-next-line
    },[])
    console.log(logs);
    return ( 
        <section>
            <div className='card-wrapper inline-block'>
                {logs.length ?     
                <div className='logs-root'>
                    {logs.map(log => (
                        <p
                        className='log-entry'
                        key={log.id}>
                            <span className={`label ${label(log.action)}`}>{log.action}</span>
                            {log.msg} <b>{log.item}</b> by <Link to='' className='log-link'>{log.user}</Link> 
                            <span className='log-time'>{moment.unix(log.created_at.seconds).fromNow()}</span>
                        </p>
                    )
                    )}
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
 
export default ActivitySection;