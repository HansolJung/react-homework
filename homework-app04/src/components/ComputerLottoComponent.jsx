import React from 'react';
import { Fragment } from 'react';

function ComputerLottoComponent({computerLotto}) {
    return (
        <>
            <div className='ball-box'>
                <div className='ball-items'>
                    {
                        computerLotto?.map((num, index)=>(
                            index < 6 
                            ? 
                            <div key={index} className='ball' style={{backgroundColor: 'gray'}}>{num}</div>
                            :
                            <Fragment key={index}>
                                <p>+</p>
                                <div className='ball' style={{backgroundColor: 'orange'}}>{num}</div>
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default ComputerLottoComponent;