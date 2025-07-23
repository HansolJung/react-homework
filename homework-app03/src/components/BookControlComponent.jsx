import React, { useRef } from 'react';

function BookControlComponent({updateBookList}) {
    
    const inputText = useRef(null);
    
    return (
        <>
            <div className='book-control'>
                <div>
                    <input type="text" ref={inputText}/>
                </div>
                <div>
                    <button type='button' className='btn btn-success mx-2'
                        onClick={()=>updateBookList('add', inputText.current.value)}>추가</button>
                    <button type='button' className='btn btn-info mx-2'
                        onClick={()=>updateBookList('rent')}>대여</button>
                    <button type='button' className='btn btn-danger mx-2'
                        onClick={()=>updateBookList('del')}>삭제</button>
                </div>
            </div>
        </>
    );
}

export default BookControlComponent;