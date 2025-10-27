

import styles from './TitleBox.module.css';
function TitleBox() {
    const container = {
        display: "flex",
        flex_direction: `black`,
        justify_content: `start`
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>To Do List&nbsp;</p>
        </div>
    );
}

export default TitleBox;
