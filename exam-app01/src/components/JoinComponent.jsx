import React, { useRef } from 'react';

function JoinComponent({join}) {

    const inputText = useRef(null);  // 회원가입할 사용자명 입력 창

    // 회원가입 버튼을 누를 시 동작하는 함수
    const joinJob = ()=>{
        join(inputText.current.value);
        inputText.current.value = '';  // 회원가입 입력 창 초기화
    }

    return (
        <>
            <div className='join-container'>
                <div className='join-input'>
                    <input type="text" ref={inputText}/>
                </div>
                <div>
                    <button type='button' className='btn btn-info'
                        onClick={joinJob}>회원가입</button>
                </div>
            </div>
        </>
    );
}

export default JoinComponent;