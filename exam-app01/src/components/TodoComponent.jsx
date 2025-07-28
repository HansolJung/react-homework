import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function TodoComponent({todo}) {

    const {userList, updateCheckedTodoList, doneTodo, deleteTodo} = useContext(TodoContext);  // Context API 로 넘어온 value 값 구조분해할당

    const todoDiv = useRef(null); // 전체 div 박스
    const todoCheckBox = useRef(null);  // 체크박스
    const todoSpan = useRef(null); // span
    const todoConfirmBtn = useRef(null) // 완료 버튼

    // 완료 버튼을 누르면 실행되는 함수
    const doneJob = ()=>{

        // 현재 컴포넌트의 ref 값 들을 한 객체에 담아서 상위 컴포넌트로부터 Context API 를 통해 전달받은 doneTodo 함수에 보냄
        const obj = {
            todoDiv : todoDiv,
            todoCheckBox : todoCheckBox,
            todoSpan : todoSpan,
            todoConfirmBtn : todoConfirmBtn,
            todo : todo
        }

        doneTodo(obj);
    }

    // 삭제 버튼을 누르면 실행되는 함수
    const deleteJob = ()=>{
        deleteTodo(todo.jobId);
    }

    // userList 가 변경될 때 마다 자동 실행
    useEffect(()=>{
        if (todo.isDone) {  // 만약 todo가 이미 완료된 상태라면... 
            doneJob();  // todo 완료 함수 호출
        }
    }, [userList]);
    
    return (
        <>
            <div className='todo-div' ref={todoDiv}>
                <div className='left'>
                    <input type="checkbox" name="todoChk" 
                        value={todo.jobId} 
                        ref={todoCheckBox}
                        onChange={updateCheckedTodoList}
                        checked={todo.isChecked}/>
                    <span ref={todoSpan}>{todo.jobName}</span>
                </div>
                <div className='right'>
                    <button ref={todoConfirmBtn} className="btn btn-primary" onClick={doneJob}>완료</button>
                    <button className="btn btn-danger" onClick={deleteJob}>삭제</button>
                </div>
            </div>
        </>
    );
}

export default TodoComponent;