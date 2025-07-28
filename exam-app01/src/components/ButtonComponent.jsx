import React, { useRef } from 'react';

// 버튼은 바뀔일이 거의 없기 때문에 React.memo 를 사용해서 잦은 리렌더링 방지
const ButtonComponent = React.memo(function ButtonComponent({addTodo, doneTodoList, deleteTodoList, updateAllCheckedTodoList, userList}) {
    const todoInput = useRef(null);  // todo 입력창

    // 엔터키 처리 함수
    const enterKey = (e)=>{  
        if (e.keyCode === 13) {   // 들어온 키 입력값이 엔터키라면 할 일 리스트에 추가
            addTodo(todoInput.current.value);      
        }
    }

    return (
        <>
            <div className="button-container">
                <div className="todo-input">
                    { /* 현재 로그인한 상태라면 input text 창을 활성화 시키고, 로그아웃 상태라면 비활성화 시킨다. */}
                    <input type="text" id="todo" name="todo" 
                        ref={todoInput} 
                        onKeyDown={enterKey}
                        disabled={userList.find((user)=> user.isLogin === true) === undefined}/>  
                </div>
                <div>
                    { /* 현재 로그인한 상태라면 버튼들을 활성화 시키고, 로그아웃 상태라면 비활성화 시킨다. */}
                    <button type="button" className="btn btn-primary" 
                        disabled={userList.find((user)=> user.isLogin === true) === undefined}
                        onClick={()=>addTodo(todoInput.current.value)}>등록</button>
                    <button type="button" className="btn btn-success" 
                        disabled={userList.find((user)=> user.isLogin === true) === undefined}
                        onClick={doneTodoList}>일괄 완료</button>
                    <button type="button" className="btn btn-secondary" 
                        disabled={userList.find((user)=> user.isLogin === true) === undefined}
                        onClick={deleteTodoList}>일괄 삭제</button>
                </div>
                
            </div>
            {
                // 현재 로그인한 상태라면 전체 선택 체크박스를 띄우고, 로그아웃 상태라면 띄우지 않는다.
                userList.find((user)=> user.isLogin === true) !== undefined && 
                    userList.find((user)=> user.isLogin === true).myTodoList.length > 0 ? 
                <div className='checkbox-container'>
                    <input type="checkbox" onChange={updateAllCheckedTodoList}/>
                </div>
                :
                ''
            }
        </>
    );
});

export default ButtonComponent;