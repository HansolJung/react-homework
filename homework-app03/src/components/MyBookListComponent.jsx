

function MyBookListComponent({currentUser, updateBookList, checkMyBook}) {

    return (
        <>
            
            <div className="right">
                <button type="button" className="btn btn-secondary" onClick={()=>updateBookList('return')}>반납</button>
            </div>
            <div className="my-book-list">
                {
                    currentUser.myBookList?.map((book, index)=>(
                        <div className="my-book-div" key={index}>
                            <input type="checkbox" 
                                    checked={book.isChecked}
                                    onChange={()=>checkMyBook(book.bookName)} />
                            <h6 className='mx-2'>{book.bookName}</h6>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default MyBookListComponent;