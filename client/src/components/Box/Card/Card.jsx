import styles from './Card.module.css';

function Card({ item, onDelete }) {
  return (
    <div className={styles.cardContainer}>
      {item.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>번호:</span>
            <span>{todo.id}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>할일:</span>
            <span>{todo.task}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>생성일자:</span>
            <span>{todo.created_at}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>달성여부:</span>
            <span>{todo.completed === 0 ? '미달성' : '달성'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;