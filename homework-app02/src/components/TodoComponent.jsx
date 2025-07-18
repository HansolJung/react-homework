import React, { useEffect, useRef } from 'react';

function TodoComponent({todo, doneBtnClick, setTodoList, updateCheckedTodoList}) {

    const todoDiv = useRef(null); // 전체 div 박스
    const todoCheckBox = useRef(null);  // 체크박스
    const todoSpan = useRef(null); // span
    const todoConfirmBtn = useRef(null) // 완료 버튼

    // todo 완료
    const finishJob = ()=>{

        todoSpan.current.style.textDecorationLine = 'line-through';  // 취소선 긋기
        todoConfirmBtn.current.disabled = true;  // 완료 버튼 막기
        todoCheckBox.current.checked = false; // 체크박스 해제
        todoDiv.current.style.backgroundColor = '#b3b3b3';  // 배경색 바꾸기

        todo.isDone = true;  // 일이 완료됐음을 체크하기

    }

    // doneBtnClick 값이 바뀔때마다 실행. 즉, 일괄 완료 버튼이 눌릴때마다 실행.
    useEffect(()=>{
        if (todo.isDone) {  // 만약 todo가 이미 완료된 상태라면... 
            finishJob();  // todo 완료 함수 호출
        }
    }, [doneBtnClick]);

    // todo 삭제
    const deleteJob = ()=>{
        setTodoList((prev)=> prev.filter(obj => obj.jobId !== todo.jobId)); // todo 리스트에서 자기 자신 제거하기
    }

    return (
        <>
            <div className='todo-div' ref={todoDiv}>
                <div className='left'>
                    <input type="checkbox" name="todoChk" 
                        value={todo.jobId} 
                        ref={todoCheckBox}
                        onChange={updateCheckedTodoList}/>
                    <span ref={todoSpan}>{todo.jobName}</span>
                </div>
                <div className='right'>
                    <button ref={todoConfirmBtn} className="btn btn-primary" onClick={finishJob}>완료</button>
                    <button className="btn btn-danger" onClick={deleteJob}>삭제</button>
                </div>
            </div>
        </>
    );
}

export default TodoComponent;