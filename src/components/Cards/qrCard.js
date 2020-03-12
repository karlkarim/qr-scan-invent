import React from 'react';

const QRCard = ({header, content, btn1, btn2, btn3}) => {
    return ( 
        <div className="card">
  <header className="card-header">
    <p className="card-header-title">
      {header}
    </p>
  </header>
  <div className="card-content">
    <div className="content" style={{textAlign: "center"}}>
      {content}
      <br />
      <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer className="card-footer">
      
    <div className="card-footer-item">{btn1}</div>
    <div className="card-footer-item">{btn2}</div>
    <div className="card-footer-item">{btn3}</div>
  </footer>
</div>
     );
}
 
export default QRCard;