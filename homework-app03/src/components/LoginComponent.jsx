import React, { useRef } from 'react';

function LoginComponent({userList, setCurrentUser}) {

    const selectBox = useRef(null);
    
    const login = ()=>{
        setCurrentUser(userList.find((user)=> user.myName === selectBox.current.value));
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