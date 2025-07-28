// 사용자 클래스
class User{

    // 생성자
    constructor(data) {

        // 멤버변수 생성 하면서 동시에 값을 전달
        this.myName = data.myName;  // 사용자 이름
        this.myTodoList = data.myTodoList;  // 사용자의 할 일 리스트
        this.isLogin = false;  // 로그인 여부
    }
}

export default User;