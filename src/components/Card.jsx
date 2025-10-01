function Card({ item, onDelete }) {
    return (
        <>
            <div>
                <ul>
                    {item.map((todo, index) => (
                        <li key={index} >
                            <span>{todo}</span>
                            {/* span태그는 한 줄을 다 먹지 않음 */}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default Card;