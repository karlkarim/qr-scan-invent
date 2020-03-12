import React from 'react';
import './paperCard.css';

const variant = [
    'primary-light',
    'purple-light',
    'blue-light',
    'green-light'
]
const PaperCard = (props) => {
    const { title, subTitle, icon, color, onClick } = props;
    const checkVariant = variant.includes(color) ? color : '';
    return ( 
        <div className={`paper-root ${checkVariant}`} onClick={onClick}>
            <div className='paper-container'>
                <div className='paper-title'>
                    <p>{title} <i className={icon}></i></p>
                </div>
            <div className='paper-subTtile'>
            {subTitle}
            </div>
            </div>
        </div>
     );
}
 
export default PaperCard;