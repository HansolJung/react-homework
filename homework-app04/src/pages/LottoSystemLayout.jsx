import React, { useState } from 'react';
import '../assets/css/lottoSystemLayout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LottoButtonComponent from '../components/LottoButtonComponent';
import ComputerLottoComponent from '../components/ComputerLottoComponent';
import UserLottoComponent from '../components/UserLottoComponent';

function LottoSystemLayout(props) {


    const [computerLotto, setComputerLotto] = useState([]);  // 컴퓨터 로또 배열
    const [userLottoList, setUserLottoList] = useState([]);  // 유저 로또 배열 5개를 집어넣을 유저 로또 리스트

    // 컴퓨터 로또 배열 만들기
    const createComputerLotto = ()=>{
        setComputerLotto(makeNumbers(true));
        setUserLottoList([]);  // 컴퓨터 로또를 만들었으니 유저 로또는 초기화
    }

    // 유저 로또 리스트 만들기
    const createUserLotto = ()=>{
        if (computerLotto.length === 0) {  // 컴퓨터 로또가 생성되지 않은 상태라면 그냥 리턴
            alert('먼저 컴퓨터 로또를 생성해주십시오.');
            return false;
        }

        let userLotto = [];
        let finalLottoList = [];
    
        for (let i = 0; i < 5; i++) {  // 유저 로또 배열 5개를 만들어서 유저 로또 리스트에 집어넣기
            userLotto.push(makeNumbers(false)); 
        }

        for (let lotto of userLotto) {
            let lottoList = [];
            let matchCount = 0;
            let isBonus = false;
            for (let num of lotto) {
                let numberObj = {};
                for (let i = 0; i < computerLotto.length; i++) {
                    if (num === computerLotto[i]) {  // 번호를 맞췄을 경우...
                        if (i === 7) {  // 보너스 번호를 맞췄을 경우...
                            isBonus = true;
                        }
                        numberObj = {num: num, bgColor: randColor()};  // 배경색으로 랜덤 색상 넣기
                        matchCount++;  // 맞춘 횟수 증가
                        break;  // 더 이상 순회할 필요가 없으므로 break;
                    } else { // 번호를 못맞춘 경우...
                        numberObj = {num: num, bgColor: 'white'};   // 배경색은 흰색
                    }
                    
                }
                lottoList.push(numberObj);
            }
            
            const rank = judgeRank(matchCount, isBonus);   // 등수 판단하기
            lottoList.push({rank: rank});  // 유저 로또 마지막에 등수 넣기
            finalLottoList.push(lottoList);  // 유저 로또를 유저 로또 리스트에 넣기
        }
        
        setUserLottoList(finalLottoList);
    }

    // 랜덤하게 로또 번호를 뽑는 함수
    const makeNumbers = (isBonus)=>{
        const lotto = [];
        let bonusNum = 0;
        let count = 0;
        let loopCount = isBonus ? 7 : 6;   // isBonus 가 true 라면 7개 뽑고, 아니라면 6개 뽑도록 숫자 설정

        while (count < loopCount) {
            const val = Math.floor(Math.random() * 45) + 1;
            if (lotto.some(num => num === val)) {
                continue;
            }

            if (count === 6) {
                bonusNum = val;
                break;
            }

            lotto.push(val);
            count++;
        }       

        lotto.sort((a, b) => a-b); // 오름차순 정렬. a-b 가 양수라는 말은 앞이 뒤보다 크다는 뜻. 그래서 자리를 바꿔준다.
        
        if (bonusNum > 0) {  // 보너스 번호가 0보다 크다는 소리는 보너스 번호를 뽑았다는 뜻 = 컴퓨터의 로또 번호라는 뜻
            lotto.push(bonusNum);  // 보너스 번호도 로또 배열에 넣어준다
        }

        return lotto;
    }

    // 랜덤으로 색 표현
    const randColor = ()=>{
        const colors = [];
        let count = 0;

        while(count < 3) {
            const randColor = Math.floor(Math.random() * 256);  // 0 ~ 255 까지 나와야함. RGB 값은 각 색상 마다 0~255 까지 있음.

            // 10 진수를 16 진수로 바꾸기
            let hexColor = randColor.toString(16);   // string 으로 바꿀 때 진수값을 넣으면 바뀐다.
            
            // 비교 == 는 값만 비교. 비교 === 는 값과 타입 둘다 비교.
            if (hexColor.length === 1) {  // 0 ~ 9, A, B C D E F 라면..
                hexColor = '0' + hexColor;      // 만약 16진수 값이 한 자리라면 앞에 0을 붙여준다. (예: a가 나왔다면 0a로 바꾸기) 
            }

            colors.push(hexColor);  // 배열에 넣는다.
            count++;
        }

        return '#' + colors.join('')   // 돌려줄때 앞에 '#' 을 붙이고 배열을 이어 붙인다. 
                                       //(예: 배열이 '0A', '0B', '0C' 라면 #0A0B0C 로 리턴) 
    }

    // 등수 판단하는 함수
    const judgeRank = (matchCount, isBonus)=>{
        switch(matchCount) {
            case 6:
                return '1등';
            case 5:
                return isBonus === true ? '2등' : '3등';
            case 4: 
                return '4등';
            case 3:
                return '5등';
            default:
                return '꽝';
        }
    }

    return (
        <div>
            <div className='container'>
               <LottoButtonComponent createComputerLotto={createComputerLotto} createUserLotto={createUserLotto}/>
                <div className='contents'>
                    <ComputerLottoComponent computerLotto={computerLotto}/>
                    <UserLottoComponent userLottoList={userLottoList}/>
                </div> 
            </div>
        </div>
    );
}

export default LottoSystemLayout;