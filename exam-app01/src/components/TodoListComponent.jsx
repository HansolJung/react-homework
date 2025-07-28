import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoComponent from './TodoComponent';

function TodoListComponent() {
    const {userList} = useContext(TodoContext); // Context API 로 넘어온 value 값 구조분해할당

    return (
        <>
            <div className="todo-list-container">
                <div className="todo-list">
                    <div className="todo-body" id="todoBody">
                        {
                            // 현재 로그인한 상태인 유저의 할 일 리스트를 띄운다.
                            userList?.map((user)=>(
                                user.isLogin === true ?
                                user.myTodoList?.map((todo)=>(
                                    <TodoComponent key={`key_${todo.jobId}`} todo={todo}/>
                                ))
                                :
                                ''
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoListComponent;