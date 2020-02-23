import React, {useState} from 'react';
import QRCodeGenerator from 'qrcode.react';


const QRManager = () => {
    const [data, setData ] = useState('')

    const handleQRValue=(e) => {
        e.preventDefault()
        setData(e.target.value)
    }


    return (<div className="content">
            <section>
                <div className="container">
                    <h1 className="title">QR Manager</h1>                
                </div>
            </section>
            <section>
                <div className="columns is-desktop">
                    
                    <div className="column is-two-thirds ">
                        <div className="box">
                            <div className="field is-horizontal">   
                                <div class="field-label is-normal">     
                                    <label class="label">Eseme nimi</label>  
                                </div> 
                            <div class="field-body">   
                            <div class="field">       
                                <p class="control">       
                                    <input class="input" type="text" value={data} onChange={handleQRValue}/>    
                                </p>    
                            </div>   
                            </div> 
                            </div> 
                            <button class="button is-link is-rounded">Generate</button>              
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">
                            <QRCodeGenerator 
                                value={data}
                                imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}}
                            />
                        </div>
                    </div>

                </div>
             </section>
        <section>
            <div className="container">
                <div className="columns is-multiline">
                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                Component
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </a>
                            </header>
                            <div className="card-content">
                            <div className="content" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                <br/>
                                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
                    </div>  
                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                Component
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </a>
                            </header>
                            <div className="card-content">
                            <div className="content" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                <br/>
                                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
                    </div>  
                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                Component
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </a>
                            </header>
                            <div className="card-content">
                            <div className="content" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                <br/>
                                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
                    </div> 
                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                Component
                                </p>
                                <a href="#" className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </a>
                            </header>
                            <div className="card-content">
                            <div className="content" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                <br/>
                                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a href="#" class="card-footer-item">Save</a>
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                        </div>
                    </div>    
                </div>
            </div>
        </section>
        
      </div> ); 
};
 
export default QRManager;
  