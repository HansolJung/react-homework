import React, { useReducer, useRef, useState } from 'react';
import '../assets/css/todoList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from '../js/todo.js';
import TodoComponent from '../components/TodoComponent.jsx';

function TodoList(props) {
    
    const todoId = useRef(0);  // todo 고유의 jobId 값
    const todoInput = useRef(null);  // todo input 창
    const [checkedTodoList, setCheckedTodoList] = useState([]);  // 체크된 todo 리스트
    const [doneBtnClick, setDoneBtnClick] = useState(false);  // TodoComponent 의 useEffect 의존성을 위한 state. 일괄 완료 버튼을 누를때마다 바뀌면서 하위 컴포넌트를 리렌더링 하는 역할. 

    const addTodo = (state, todo)=>{
        return [...state, new Todo({jobName: todo, jobId: todoId.current++})];
    }

    const doneTodoList = (state)=>{  
        if (checkedTodoList.length === 0) {  // 체크된 todo 가 아무것도 없으면 그냥 리턴
            return;
        }

        for (let i = 0; i < state.length; i++) {
            if (checkedTodoList.includes(state[i].jobId)) {
                state[i].isDone = true;
            }
        }
        
        
        setDoneBtnClick(!doneBtnClick);  // doneBtnClick 을 변경해서 리렌더링 효과 일으키기
        setCheckedTodoList([]);   // 체크 리스트 초기화

        return state;
    }

    const deleteTodoList = (state)=>{
        if (checkedTodoList.length === 0) {  // 체크된 todo 가 아무것도 없으면 그냥 리턴
            return;
        }

        setCheckedTodoList([]);   // 체크 리스트 초기화
        return state.filter(obj => !checkedTodoList.includes(obj.jobId));
    }

    const deleteMe = (state, todo)=>{
       
        return state.filter(obj => obj.jobId !== todo.jobId);
    }

    // 엔터키 처리 함수
    function enterKey(e) {  
        if (e.keyCode === 13) {   // 들어온 키 입력값이 엔터키라면 할 일 리스트에 내용 추가
            addTodo(todoInput.current.value);      
        }
    }

    // 체크박스가 체크될때마다 체크박스 리스트를 변경하는 함수
    const updateCheckedTodoList = (e)=>{
        const {value, checked} = e.target;
        
        if (checked) {
            checkedTodoList.push(Number(value));
            setCheckedTodoList(Array.from(new Set(checkedTodoList)));  // 체크가 되어있으면 체크된 todo 리스트 목록에 나 추가
        } else {
            const newArr = checkedTodoList.filter((num)=> num !== Number(value));  // 아니라면 체크된 todo 리스트 목록에서 나 삭제
            setCheckedTodoList(newArr); 
        }
    }

    const todoReducer = (state, action)=>{
        
        switch(action.type) {
            case 'create':
                return addTodo(state, todoInput.current.value);
            case 'finish':
                return doneTodoList(state);
            case 'delete':
                return deleteTodoList(state);
            case 'deleteMe':
                return deleteMe(state, action.payload);
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoReducer, []);

    const updateAll = (action, obj)=> {
        dispatch({type: action, payload: obj});
    }

    return (
        <div>
            <main className="container">
                <section className="contents">
                    <header className="text-center mt-3">
                        <h2>To-do List</h2>
                    </header>
                    <div className="status-container">
                        <p>할 일: {todoList.filter((obj) => obj.isDone === false).length} 건</p>
                        <p>한 일: {todoList.filter((obj) => obj.isDone === true).length} 건</p>
                        <p>달성률: {((todoList.filter((obj) => 
                            obj.isDone === true).length / (todoList.length === 0 ? 1 : todoList.length)) * 100).toFixed(2)} %</p>
                    </div>
                    <div className="button-container">
                        <div className="todo-input">
                            <input type="text" id="todo" name="todo" ref={todoInput} onKeyDown={(e)=>enterKey(e)}/>  
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={()=>updateAll('create')}>등록</button>
                            <button type="button" className="btn btn-success" onClick={()=>updateAll('finish')}>일괄 완료</button>
                            <button type="button" className="btn btn-secondary" onClick={()=>updateAll('delete')}>일괄 삭제</button>
                        </div>
                        
                    </div>
                    <div className="todo-list-container">
                        <div className="todo-list">
                            <div className="todo-body" id="todoBody">
                                {         
                                    todoList?.map((todo)=>(
                                        <TodoComponent key={`key_${todo.jobId}`} 
                                            todo={todo}
                                            deleteMe={()=>updateAll('deleteMe', todo)} 
                                            updateCheckedTodoList={updateCheckedTodoList}
                                            doneBtnClick={doneBtnClick}
                                            setDoneBtnClick={setDoneBtnClick}
                                            isChecked={checkedTodoList.includes(todo.jobId)}/>
                                    ))
                
                                }
                            </div>
                        </div>
                    </div>
                </section>  
            </main>
        </div>
    );
}

export default TodoList;