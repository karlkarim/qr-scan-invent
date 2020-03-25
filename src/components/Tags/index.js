import React from 'react';
import './index.css';

export const variant = [
  'lbl-primary-solid',
  'lbl-secondary-solid',
  'lbl-info-solid',
  'lbl-success-solid',
  'lbl-warning-solid',
  'lbl-danger-solid',
]
const Tag = ({ tagVariant, label }) => {
  const checkStyle = variant.includes(tagVariant) ? tagVariant : variant[0];
  return ( 
    <span className={`lbl ${checkStyle}`}>{label}</span>
   );
}
 
export default Tag;