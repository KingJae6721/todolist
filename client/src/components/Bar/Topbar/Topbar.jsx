import styles from './Topbar.module.css';

function Topbar() {
    return (
        <nav className={styles.nav}>
            <a href="/">홈</a>
            <a href="/mypage">마이페이지</a>
            
                <a href="/register"><button>회원가입</button></a>
                <a href="/login"><button>로그인</button></a>
                <button>로그아웃</button>
         
            
        </nav>
    );
}

export default Topbar;