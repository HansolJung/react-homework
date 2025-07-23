import React, { useEffect, useReducer, useRef, useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import MyBookListComponent from '../components/MyBookListComponent';
import BookControlComponent from '../components/BookControlComponent';
import BookListComponent from '../components/BookListComponent';
import User from '../components/objects/User';
import Book from '../components/objects/Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/bookSystemLayout.css';


const bookReducer = (state, action)=>{
    
    switch(action.type) {
        case 'add': 
            return [...state, new Book({ bookName: action.payload })]
        case 'del':
            return state.filter((book)=>book.isChecked !== true);
        case 'check':
            return state.map((book)=> book.bookName === action.payload ? {...book, isChecked : !book.isChecked} : book);
        case 'return':
            return state.map((book)=> action.returnedMyBook.includes(book.bookName) ? {...book, isRented : false} : book);
        case 'rent':
            return state.map((book)=> book.isChecked === true && book.isRented === false ? {...book, isRented : true, isChecked : false} : book);
        default:
            return state;
    }
}


function BookSystemLayout(props) {

    const [currentUser, setCurrentUser] = useState(null);

    const [bookList, dispatch] = useReducer(bookReducer, [
        new Book({ bookName: '헌터x헌터' }), new Book({ bookName: '원피스' }), new Book({ bookName: '나루토' }),
        new Book({ bookName: '블리치' }), new Book({ bookName: '귀멸의 칼날' }), new Book({ bookName: '주술회전' }),
        new Book({ bookName: '체인소맨' })
    ]);

    const [userList, setUserList] = useState([
        new User({ myName: '김철수', myBookList: [] }),
        new User({ myName: '홍길동', myBookList: [] }),
        new User({ myName: '이지혜', myBookList: [] })
    ]);


    const updateBookList = (action, bookName)=>{  
        let returnedMyBook = [];

        if (action === 'add') {
            if (bookName.length === 0) {
                alert('추가할 책 제목을 입력해주세요.');
                return false;
            }
        } else if (action === 'del') {
            if (!confirm('정말로 삭제하시겠습니까?')) {
                return false;
            }
        } else if (action === 'rent') {  // 대여를 하는 경우
            const arr = bookList.filter((book)=> book.isChecked === true && book.isRented === false);

            if (arr.length === 0) {
                alert('대여할 책들을 체크해주세요.');
                return false;
            }

            setUserList((prev)=>prev.map((user)=> user.myName === currentUser.myName ? 
                {...user, myBookList: [...user.myBookList, ...arr] } : user));
            setCurrentUser((prev)=> ({...prev, myBookList: [...prev.myBookList, ...arr] }));
            unCheckMyBook();
        } else if (action === 'return') {  // 반납을 하는 경우
            returnedMyBook = currentUser.myBookList.filter((book)=> book.isChecked === true).map(book => book.bookName);

            if (returnedMyBook.length === 0) {
                alert('반납할 책들을 체크해주세요.');
                return false;
            }

            setUserList((prev)=>prev.map((user)=> user.myName === currentUser.myName ? 
                {...user, myBookList: [...user.myBookList.filter((book)=> book.isChecked !== true)] } : user));
            setCurrentUser((prev)=> ({...prev, myBookList: [...prev.myBookList.filter((book)=> book.isChecked !== true)] }));

        }
    
        dispatch({type: action, payload: bookName, returnedMyBook: returnedMyBook});
    }

    // 내가 대여한 도서 목록의 책들을 체크했을 경우 호출되는 함수
    const checkMyBook = (bookName)=>{  
        setUserList((prev)=>prev.map((user)=> user.myName === currentUser.myName ? 
            {...user, myBookList: [...user.myBookList.map((book)=> book.bookName === bookName ? {...book, isChecked : !book.isChecked} : book)] } : user));
        setCurrentUser((prev)=>({...prev, myBookList: [...prev.myBookList.map((book)=> book.bookName === bookName ? {...book, isChecked : !book.isChecked} : book)] }));

    }

    // 내가 대여한 도서 목록의 체크버튼들을 해체하는 함수
    const unCheckMyBook = ()=>{
        setUserList((prev)=>prev.map((user)=> user.myName === currentUser.myName ? 
            {...user, myBookList: [...user.myBookList.map((book)=> ({...book, isChecked : false}) )]} : user));
        setCurrentUser((prev)=>({...prev, myBookList: [...prev.myBookList.map((book)=> ({...book, isChecked : false}))] }));
    }

    return (
        <div className='container'>
            <div>
                <h3>도서 대여 시스템</h3>
            </div>
            <div className='contents'>
            <LoginComponent userList={userList} setCurrentUser={setCurrentUser}/>
            {
                currentUser !== null && (
                    <>
                        <MyBookListComponent currentUser={currentUser}
                            updateBookList={updateBookList}
                            checkMyBook={checkMyBook}/>
                        <BookControlComponent currentUser={currentUser}
                            bookList={bookList} 
                            updateBookList={updateBookList}/>
                        <BookListComponent bookList={bookList}
                            updateBookList={updateBookList}/>
                    </>
                )
            }
            </div>
 
        </div>
    );
}

export default BookSystemLayout;