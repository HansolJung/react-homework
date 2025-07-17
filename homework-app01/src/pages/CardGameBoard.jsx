import React, { useReducer, useRef, useState } from 'react';
import '../assets/css/cardGameBoard.css';
import Card from '../components/Card';

function CardGameBoard(props) {
    const [comment, setComment] = useState('');
    const startBtn = useRef(null);
    const choiceBtn = useRef(null);

    const cardReducer = (state, action)=>{
        switch(action.type) {
            case 'start':
                startBtn.current.disabled = true; // 시작 버튼 비활성화
                return action.payload;
            case 'choice':
                return action.choiceJob(state);  
            case 'init': // 컴퓨터 카드와 내 카드 전부 삭제. 
                setComment('');  // 최하단의 코멘트도 초기화.
                startBtn.current.disabled = false; // 시작 버튼 활성화
                choiceBtn.current.disabled = false; // 선택 버튼 활성화
                return {computerCards: [], myCards: []};
        }

        // default: return state 대신 throw 사용.
        // start, choice, init 이 아닌 type 이 넘어왔다는 건 오타라고 봐야 하기 때문.
        throw new Error('잘못된 액션 타입이 reducer 에 전달됐습니다.');
    }

    const [cardObject, dispatch] = useReducer(cardReducer, {computerCards: [], myCards: []});
    
    function makeCards() {
        const computerCards = makeCardSet(2);   // 컴퓨터의 카드 2장 뽑기
        const myCards =  makeCardSet(5);   // 나의 카드 5장 뽑기
        
        return {computerCards: computerCards, myCards: myCards};
    }

    // 원하는 개수 만큼의 카드를 랜덤하게 뽑는 함수
    function makeCardSet(count) {  
        const cards = new Set();  // 숫자 중복 없이 만들기 위해 set 사용

        while (cards.size < count) {
            // 1 ~ 20 사이의 숫자 랜덤하게 뽑기
            const number = Math.floor(Math.random() * 20) + 1;
            cards.add(number);
        }

        return Array.from(cards);   // set 을 배열로 바꿔서 리턴
    }
    
    function choiceCards(state) {
        
        const checkedCards = document.querySelectorAll('input[type="checkbox"]:checked'); // 체크된 체크 박스 전부 얻어오기
        if (checkedCards.length === 0) {  // 체크된 체크 박스가 없다면 그냥 리턴
            alert('카드를 선택해주세요.');
            return state;
        } else if (checkedCards.length < 2 || checkedCards.length > 2) {  // 선택한 체크박스가 2개 보다 적거나 2개 보다 많은 경우 그냥 리턴
            alert('카드를 정확히 2장 선택해주세요.');
            return state;
        } else {  // 정확히 2장의 카드를 선택했다면...
            choiceBtn.current.disabled = true; // 선택 버튼 비활성화

            const values = Array.from(checkedCards).map(obj => Number(obj.value)); // 체크 박스의 value 만 뽑아서 배열로 만들기 (value 에는 카드의 index 값이 들어있음)
            
            const myCards = state?.myCards;  // state 에서 내 카드 가져오기
            const computerCards = state?.computerCards;  // state 에서 컴퓨터 카드 가져오기
            const myChoiceCards = myCards.filter((obj, index)=> values.includes(index)); // values 에 본인의 index 가 들어있는 카드들만 필터링. 즉, 체크한 카드들만 얻어옴.
            
            const mySum = myChoiceCards.reduce((sum, num)=> sum + num);   // 내가 선택한 카드의 합 계산
            const computerSum = computerCards.reduce((sum, num)=> sum + num);  // 컴퓨터 카드의 합 계산

            if (mySum > computerSum) {  // 내가 선택한 카드의 합이 컴퓨터 카드의 합보다 크다면...
                alert('플레이어가 승리했습니다!');
            } else if (mySum < computerSum) {  // 내가 선택한 카드의 합이 컴퓨터 카드의 합보다 작다면...
                alert('컴퓨터가 승리했습니다...');
            } else {  // 내가 선택한 카드의 합이 컴퓨터 카드의 합과 똑같다면...
                alert('무승부입니다.');
            }

            checkedCards.forEach((obj)=>{  // 체크됐었던 체크 박스 해제
                obj.checked = false;
            });

            setComment(`플레이어 카드의 합: ${mySum}, 컴퓨터 카드의 합: ${computerSum}`);   // 최하단 코멘트 설정하기

            return state;
        }
    }

    const updateCard = (action)=>{
        // payload 에 함수를 넣을 때 소괄호까지 넣는 이유는 payload 에는 함수의 실행 결과(데이터)가 전달되어야 하기 때문이다. 
        // 그렇기 때문에 현 상황에서 payload: makeCards 로 적으면 에러가 발생한다. 
        // payload: makeCards 라고 적기 위해서는 reducer 함수에서 action.payload 가 아니라 action.payload() 식으로 함수를 실행하도록 해야한다.

        // choiceCards 의 경우는 reducer 함수에서 action.choiceJob(state) 식으로 매개변수를 전달해 함수를 실행하기 때문에 이곳에선 함수 이름만 전달해야 한다.
        dispatch({type: action, payload: makeCards(), choiceJob: choiceCards});
    }
    
    return (
        <>
            <main className='container'>
                <section className='contents'>
                    <section className='canvas'>
                        {
                            cardObject?.myCards?.map((obj, index)=>(
                                <div key={`key_${index}`}>
                                    <input type="checkbox" name="cardChk" value={index} />
                                    <Card number={obj}/>
                                </div>
                            ))
                        }
                    </section>
                    <section className='btn-box'>
                        <button type='button' className='btn' ref={startBtn} onClick={()=>updateCard('start')}>시작</button>
                        <button type='button' className='btn' ref={choiceBtn} onClick={()=>updateCard('choice')}>선택</button>
                        <button type='button' className='btn' onClick={()=>updateCard('init')}>리셋</button>
                    </section>
                    <section className='comment'>
                        <p>{comment}</p>
                    </section>
                </section>
            </main>
        </>
    );
}

export default CardGameBoard;