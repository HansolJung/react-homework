class Book{

    // 생성자
    constructor(data) {

        // 멤버변수 생성 하면서 동시에 값을 전달
        this.bookName = data.bookName;  
        this.isChecked = false;
        this.isRented = false;
    }
}

export default Book;