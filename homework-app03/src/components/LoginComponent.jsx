import React, { useRef } from 'react';

function LoginComponent({userList, setCurrentUser}) {

    const selectBox = useRef(null);
    
    // 로그인 버튼을 누르면 작동하는 함수
    const login = ()=>{
        setCurrentUser(userList.find((user)=> user.myName === selectBox.current.value));  // 현재 로그인 되어 있는 유저를 select box 의 값으로 변경
    }

    return (
        <div className='login'>
            <select ref={selectBox} id="user">
                {
                    userList?.map((user, index)=>(
                        <option name="user" 
                            key={index} 
                            value={user.myName}>{user.myName}</option>
                    ))
                }
            </select>
            <button type='button' className='btn btn-primary ms-3' onClick={login}>로그인</button>
        </div>
    );
}

export default LoginComponent;