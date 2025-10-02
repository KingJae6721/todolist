import styles from './css/Card.module.css';
function Card({ item, onDelete }) {
    return (
        <>
            <div className={styles.container}> 
                <table style={{ borderCollapse: 'collapse' }} border={1}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>할일</th>
                            <th>생성일자</th>
                            <th>달성여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((todo, index) => (
                            <tr key={index} >
                                <td>{todo.id}</td>
                                <td>{todo.task}</td>
                                <td>{todo.created_at}</td>
                                <td>{todo.completed == 0 ? `미달성` : '달성'}</td>
                                {/* span태그는 한 줄을 다 먹지 않음 */}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    );
}
export default Card;