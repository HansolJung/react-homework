class User{

    // 생성자
    constructor(data) {

        // 멤버변수 생성 하면서 동시에 값을 전달
        this.myName = data.myName;  
        this.myBookList = data.myBookList;
    }
}

export default User;