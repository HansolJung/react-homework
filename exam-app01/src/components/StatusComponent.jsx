function StatusComponent({userList}) {
    return (
        <>
            <div className="status-container">
                {
                    // 로그인한 상태라면 해당 유저의 할 일 status 를 띄우고 로그아웃 상태라면 0 으로 띄운다.
                    userList.find((user)=>user.isLogin === true) !== undefined ? 
                    <>
                        <p>할 일: {userList.find((user)=>user.isLogin === true).myTodoList.filter((obj) => obj.isDone === false).length} 건</p>
                        <p>한 일: {userList.find((user)=>user.isLogin === true).myTodoList.filter((obj) => obj.isDone === true).length} 건</p>
                        <p>달성률: {((userList.find((user)=>user.isLogin === true).myTodoList.filter((obj) => 
                            obj.isDone === true).length / 
                                (userList.find((user)=>user.isLogin === true).myTodoList.length === 0 ? 1 
                                : userList.find((user)=>user.isLogin === true).myTodoList.length)) * 100).toFixed(2)} %</p>
                    </>
                    :
                    <>
                        <p>할 일: 0 건</p>
                        <p>한 일: 0 건</p>
                        <p>달성률: 0.00 %</p>
                    </>
                }
                
            </div>   
        </>
    );
}

export default StatusComponent;