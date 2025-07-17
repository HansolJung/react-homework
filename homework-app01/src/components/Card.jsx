import '../assets/css/card.css';

function Card({number}) {
    return (
        <>
            <div className='card'>
                <p className='number'>{number}</p>
            </div>
        </>
    );
}

export default Card;