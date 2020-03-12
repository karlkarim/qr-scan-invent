import React from 'reactn';

import AddItemSection from '../../components/Sections/AddItemSection';
import ListAndEditItems from '../../components/Sections/ListAndEditItemsSection';
const ManageQR = () => {

    return (
        <div className="container">
            <AddItemSection />
            <ListAndEditItems />
        </div>
    )
}

export default ManageQR;