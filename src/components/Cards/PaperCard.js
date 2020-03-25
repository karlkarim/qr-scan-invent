import React from 'react';
import './paperCard.css';

export const variant = [
    'paper-primary-light',
    'paper-secondary-light',
    'paper-info-light',
    'paper-success-light',
    'paper-warning-light',
    'paper-danger-light',
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