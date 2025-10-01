
import styles from './css/TitleBox.module.css';

function TitleBox() {
    const container = {
        display: "flex",
        flex_direction: `black`,
        justify_content: `start`
    }
    return (
        <div className="TitleBox">
            <p className="d">투 두 리 수 두 </p>
        </div>
    );
}

export default TitleBox;
