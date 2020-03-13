import React from 'reactn';
import SummarySection from '../components/Sections/SummarySections';
import ActivitySection from '../components/Sections/ActivitySection';

const Home = () => {
    
    return (
        <div className='container'>
        <SummarySection />
        <ActivitySection />          
        </div>    
    );
};

export default Home;