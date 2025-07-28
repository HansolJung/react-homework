import { useRef } from 'react';

function LoginComponent({userList, login, logout}) {
    const selectBox = useRef(null);  // select box 입력창

    return (
        <div className='login'>
            <div className='login-submenu-1'>
                <select id="user"
                    ref={selectBox} 
                    disabled={userList.find((user)=> user.isLogin === true) !== undefined}>
                    <option name="user" value="" defaultValue={true}></option>
                    {
                        userList?.map((user, index)=>(
                            <option name="user" 
                                key={index} 
                                value={user.myName}>{user.myName}</option>
                        ))
                    }
                </select>
                {
                    // 아직 로그인 하지 않은 상태라면 "로그인" 버튼을 띄우고, 이미 로그인 한 상태라면 "로그아웃" 버튼을 띄운다.
                    userList.find((user)=> user.isLogin === true) === undefined ?
                    <button type='button' className='btn btn-warning ms-3' 
                        onClick={()=>login(selectBox.current.value)}>로그인</button>
                    :
                    <button type='button' className='btn btn-warning ms-3' 
                        onClick={logout}>로그아웃</button>
                }
                
            </div>
            <div className='login-submenu-2'>
                {
                    // 현재 로그인 상태인 사용자의 이름을 띄운다.
                    userList?.map((user, index)=>(
                        user.isLogin === true ? <p key={index}>{user.myName}</p> : ''
                    ))
                }
            </div>
        </div>
    );
}

export default LoginComponent;