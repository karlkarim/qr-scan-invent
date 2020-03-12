import React from 'react';
import TextField from '../../components/TextField';
const AddItemSection = () => {
    return ( 
        <section>
            <div className='card-wrapper'>
                <TextField
                    error={qrValue ? false: true}
                    textStyle='input'
                    id='value'
                    type='text'
                    name='value'
                    onChange={handleQrValue}
                    value={qrValue}
                />
                <Button
                    buttonStyle={STYLES[2]}
                    buttonSize={'is-normal'}
                    type="submit"
                    onClick={() => addQR(qrValue)}>
                    Lisa
                </Button>
            </div>
        </section>
     );
}
 
export default AddItemSection;