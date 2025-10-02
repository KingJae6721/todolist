

import styles from './css/TitleBox.module.css';
function TitleBox() {
    const container = {
        display: "flex",
        flex_direction: `black`,
        justify_content: `start`
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>&nbsp;투두&nbsp;리수투&nbsp;</p>
            
        </div>
    );
}

export default TitleBox;
