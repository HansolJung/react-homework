import React from 'react';

function UserLottoComponent({userLottoList}) {
    return (
        <>
            <div className='user-ball-box'>
                {
                    userLottoList?.map((userLotto, index)=>(
                        <div key={index} className='ball-items'>
                            {
                                userLotto?.map((lotto, innerIndex)=>(
                                    innerIndex < 6 
                                    ?
                                    <div key={innerIndex} className='ball' 
                                        style={{backgroundColor : lotto.bgColor}}>{lotto.num}</div> 
                                    :
                                    <div key={innerIndex} > {lotto.rank} </div>
                                ))  
                            }
                       </div>
                    ))
                }
            </div>
        </>
    );
}

export default UserLottoComponent;