import { useCallback, useReducer, useRef, useState } from 'react';
import ButtonComponent from '../components/ButtonComponent';
import StatusComponent from '../components/StatusComponent';
import TodoListComponent from '../components/TodoListComponent';
import { TodoContext } from '../contexts/TodoContext';
import Todo from '../data/Todo';
import User from '../data/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todoLayout.css';
import LoginComponent from '../components/LoginComponent';
import JoinComponent from '../components/JoinComponent';


// userReducer 의 모든 return 문은 [...state] 형식으로 작성해서 갱신 용도로 사용함.
// 특정 객체를 꺼내와서 멤버변수의 값을 변경하면 userList 안에 있는 객체의 멤버변수 값 또한 변경되기 때문에 복잡한 구조분해할당을 행할 필요가 없다.

const userReducer = (state, action)=>{

    // switch case 문 안에서는 변수 선언이 안되기 때문에 밖에서 선언
    let loginUser = null;  
    let otherUsers = null;
    switch(action.type) {
        case 'join':  // 회원가입 하는 경우
            return [...state, new User({ myName: action.payload, myTodoList: [] })];  // 기존 유저 리스트에 새로운 유저 추가

        case 'login':  // 로그인 하는 경우
            loginUser = state.filter((user)=> user.myName === action.payload);
            loginUser.map((user)=> user.isLogin = true);  // select box 로 선택된 이름과 동일한 유저의 로그인 상태 여부를 true 로 바꾼다.
            otherUsers = state.filter((user)=> user.myName !== action.payload);
            otherUsers.map((user)=> user.isLogin = false);  // 나머지 유저의 로그인 상태 여부를 false 로 바꾼다.

            return [...state];   
        case 'logout':  // 로그아웃 하는 경우
            loginUser = state.find((user)=> user.isLogin === true);
            loginUser.myTodoList.map((todo)=> todo.isChecked = false); // 로그인 상태였던 유저의 할 일 리스트의 모든 체크 해제
            state.map((user)=> user.isLogin = false);  // 모든 유저 리스트의 로그인 상태 여부를 false 로 바꾼다.
            
            return [...state];
        case 'add':  // 할 일을 추가하는 경우
            loginUser = state.find((user)=> user.isLogin === true);
            loginUser.myTodoList.push(new Todo({jobName: action.payload.jobName, jobId: action.payload.myId}));   // 로그인 상태인 유저의 할 일 리스트에 해당 jobName 으로 할 일을 추가한다.

            return [...state];
        case 'delete':  // 할 일을 삭제하는 경우
            loginUser = state.find((user)=> user.isLogin === true);
            loginUser.myTodoList = loginUser.myTodoList.filter(obj => obj.jobId !== action.payload);   // 로그인 상태인 유저의 할 일 리스트에서 해당 jobId 를 가진 할 일을 삭제한다.

            return [...state];
        case 'done':  // 할 일을 완료하는 경우
            action.payload.isDone = true;   // 넘어온 action.payload 는 todo 객체. 해당 todo 의 완료 여부를 true 로 바꾼다.

            return [...state];
        case 'check':   // 할 일을 체크하는 경우
            // 체크의 경우에는 updateCheckedTodoList 함수에서 모든 일을 하기 때문에 여기 reducer 의 갱신의 작업만 한다.

            return [...state];    
        case 'deleteAll':  // 할 일들을 일괄 삭제하는 경우
            loginUser = state.find((user)=> user.isLogin === true);
            loginUser.myTodoList = loginUser.myTodoList.filter((obj)=>!action.payload.includes(obj.jobId));  // 로그인 상태인 유저의 할 일 리스트에서 체크된 todo 들을 전부 삭제한다.

            return [...state];
        case 'doneAll':   // 할 일들을 일괄 완료하는 경우
            loginUser = state.find((user)=> user.isLogin === true);
            for (let i = 0; i < loginUser.myTodoList.length; i++) {
                if (action.payload.includes(loginUser.myTodoList[i].jobId)) {
                    loginUser.myTodoList[i].isDone = true;  // 로그인 상태인 유저의 할 일 리스트에서 체크된 todo 들을 전부 완료한다.
                }
            }

            return [...state];
        case 'checkAll':  // 할 일들을 일괄 체크하는 경우   
            // 전부 체크의 경우에는 updateAllCheckedTodoList 함수에서 모든 일을 하기 때문에 여기 reducer 의 갱신의 작업만 한다.

            return [...state];
        default:
            return state;
    }
}

function TodoLayout(props) {
    const todoId = useRef(0);  // todo 고유의 jobId 값
    const [checkedTodoList, setCheckedTodoList] = useState([]);  // 체크된 todo 리스트
    
    // 유저 목록
    const [userList, dispatch] = useReducer(userReducer, [
        new User({ myName: '김철수', myTodoList: [] }),
        new User({ myName: '홍길동', myTodoList: [] }),
        new User({ myName: '이지혜', myTodoList: [] })
    ]);

    // 회원가입 함수
    const join = (value)=>{
        if (value.length === 0) {
            alert('회원가입할 사용자의 이름을 입력하십시오.');
            return false;
        }

        if (userList.map((user)=> user.myName).includes(value)) {
            alert('해당 이름으로 가입된 사용자가 이미 존재합니다.');
            return false;
        }

        dispatch({type: 'join', payload: value});
        alert('회원가입이 완료됐습니다.');
    }

    // 로그인 함수
    const login = (value)=>{
        if (value.length === 0) {
            alert('로그인 할 유저를 선택하십시오.');
            return false;
        }
        dispatch({type: 'login', payload: value});
    }

    // 로그아웃 함수
    const logout = ()=>{
        setCheckedTodoList([]);  // 체크 리스트 초기화
        dispatch({type: 'logout'});
    }

    // todo 추가하는 함수
    const addTodo = (todo)=>{
        if (todo.length === 0) {
            alert('할 일을 입력하십시오.');
            return false;
        }

        dispatch({type: 'add', payload: {jobName: todo, myId: todoId.current++}});
    }

    // 일괄 완료 함수
    // checkedTodoList 에 의존하는 useCallback 사용
    const doneTodoList = useCallback(()=>{  
        if (checkedTodoList.length === 0) {  // 체크된 todo 가 아무것도 없으면 그냥 리턴
            alert('일괄 완료할 일들을 체크해주십시오.');
            return false;
        }

        dispatch({type: 'doneAll', payload: checkedTodoList});
    }, [checkedTodoList]);

    // 일괄 삭제 함수
    // checkedTodoList 에 의존하는 useCallback 사용
    const deleteTodoList = useCallback(()=>{
        if (checkedTodoList.length === 0) {  // 체크된 todo 가 아무것도 없으면 그냥 리턴
            alert('일괄 삭제할 일들을 체크해주십시오.');
            return false;
        }

        if (confirm('정말 삭제하시겠습니까?')) {
            setCheckedTodoList([]);   // 체크 리스트 초기화
            dispatch({type: 'deleteAll', payload: checkedTodoList});
        }
    }, [checkedTodoList]);

    // 체크박스가 체크될때마다 체크박스 리스트를 변경하는 함수
    // checkedTodoList 와 userList 에 의존하는 useCallback 사용
    const updateCheckedTodoList = useCallback((e)=>{
        const {value, checked} = e.target;
        const loginUser = userList.find((user)=> user.isLogin === true);
        const todo = loginUser.myTodoList.find((obj)=>obj.jobId === Number(value));

        // checkedTodoList 의 상태를 변경하는 작업은 userReducer 밖에서 진행하도록 함.
        if (checked) {
            todo.isChecked = true;
            checkedTodoList.push(Number(value));  // 체크가 되어있으면 체크된 todo 리스트 목록에 나 추가
            setCheckedTodoList(Array.from(new Set(checkedTodoList)));  // 체크 리스트 중복 제거를 위해 Set 사용
        } else {
            todo.isChecked = false;
            const newArr = checkedTodoList.filter((num)=> num !== Number(value));  // 아니라면 체크된 todo 리스트 목록에서 나 삭제
            setCheckedTodoList(newArr); 
        }

        console.log(userList);

        dispatch({type: 'check'});
    }, [checkedTodoList, userList]);

    // 체크박스 일괄 체크될때마다 체크박스 리스트를 변경하는 함수
    // checkedTodoList 와 userList 에 의존하는 useCallback 사용
    const updateAllCheckedTodoList = useCallback((e)=>{
        const {checked} = e.target;
        const loginUser = userList.find((user)=> user.isLogin === true);

        // checkedTodoList 의 상태를 변경하는 작업은 userReducer 밖에서 진행하도록 함. 즉, dispatch 호출하기 전에 진행.
        if (checked) {
            loginUser.myTodoList.forEach((todo)=>{  // todo 리스트 순회하면서 전부 체크하기
                checkedTodoList.push(Number(todo.jobId));
                todo.isChecked = true;
            });
            setCheckedTodoList(Array.from(new Set(checkedTodoList)));   // 체크 리스트 중복 제거를 위해 Set 사용
        } else {
            loginUser.myTodoList.forEach((todo)=>{  // todo 리스트 순회하면서 전부 체크해제하기
                todo.isChecked = false;
            });
            setCheckedTodoList([]);   // 체크 리스트 초기화
        }

        dispatch({type: 'checkAll'});
    }, [checkedTodoList, userList]);

    // todo 완료 함수
    // 의존성이 없는 useCallback 사용
    const doneTodo = useCallback((obj)=>{
        const {todoSpan, todoConfirmBtn, todoDiv, todo} = obj;

        todoSpan.current.style.textDecorationLine = 'line-through';  // 취소선 긋기
        todoConfirmBtn.current.disabled = true;  // 완료 버튼 막기
        todoDiv.current.style.backgroundColor = '#b3b3b3';  // 배경색 바꾸기

        if (!todo.isDone) {  // todo 가 완료되지 않은 상태일때만 userList 의 상태를 변경함. 
                            // TodoComponent 에 있는 useEffect 의존성이 userList 이기 때문에 무한루프에 빠지는 것을 방지함. 

            dispatch({type: 'done', payload: todo});
        }
    }, []);

    // todo 삭제 함수
    // 의존성이 없는 useCallback 사용
    const deleteTodo = useCallback((jobId)=>{
        if (confirm('정말 삭제하시겠습니까?')) {
            dispatch({type: 'delete', payload: jobId});
        }
    }, []);

    // Todo Context value 에 담아서 전달할 값
    const todoContextValue = {
        userList : userList,
        updateCheckedTodoList : updateCheckedTodoList,
        checkedTodoList : checkedTodoList,
        doneTodo : doneTodo, 
        deleteTodo : deleteTodo
    }

    return (
        <div>
            <main className="container">
                <section className="contents">
                    <header className="text-center mt-3">
                        <h2>To-do List</h2>
                    </header>
                    <JoinComponent join={join}/>
                    <LoginComponent userList={userList} 
                        login={login} 
                        logout={logout}/>
                    <StatusComponent userList={userList}/>
                    <ButtonComponent addTodo={addTodo} 
                        doneTodoList={doneTodoList}
                        deleteTodoList={deleteTodoList}
                        updateAllCheckedTodoList={updateAllCheckedTodoList}
                        userList={userList}/>
                    <TodoContext.Provider value={todoContextValue}>
                        <TodoListComponent/>
                    </TodoContext.Provider>

                </section>  
            </main>
        </div>
    );
}

export default TodoLayout;