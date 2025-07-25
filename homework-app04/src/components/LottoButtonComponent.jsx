import React from 'react';

function LottoButtonComponent({createComputerLotto, createUserLotto}) {
    return (
        <>
            <div>
                <button type='button' className='btn btn-success'
                    onClick={createComputerLotto}>로또 생성</button>
                <button type='button' className='btn btn-primary'
                    onClick={createUserLotto}>유저 로또</button>
            </div>
        </>
    );
}

export default LottoButtonComponent;