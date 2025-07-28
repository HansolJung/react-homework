// 할 일 클래스
class Todo{

    // 생성자
    constructor(data) {

        // 멤버변수 생성 하면서 동시에 값을 전달
        this.jobName = data.jobName;  // 할 일 이름
        this.jobId = data.jobId;  // 할 일 아이디
        this.isDone = false;  // 완료 여부
        this.isChecked = false; // 체크 여부
    }
}

export default Todo;