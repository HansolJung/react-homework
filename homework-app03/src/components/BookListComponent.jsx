import React from 'react';

function BookListComponent({bookList, updateBookList}) {

    return (
        <>
            <div className='book-list'>
                {
                    bookList?.map((book, index)=>(
                        <div className='book-div' key={index} 
                            style={ book.isRented === true ? {backgroundColor: 'gray' } : {}}> 
                            <input type="checkbox" 
                                checked={book.isChecked}
                                disabled={book.isRented}
                                onChange={()=>updateBookList('check', book.bookName)} />
                            <h6 className='mx-2 mt-2'>{book.bookName}</h6>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default BookListComponent;