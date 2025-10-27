import { useState , navigate} from "react";
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import Logo from '../../components/Logo/Logo';

function Login() {
    const [signUp, setSignUp] = useState(false);
const navigate = useNavigate();

    const [signInUser, setSignInUser] = useState({ email: '', password: '' });
    const [signUpUser, setSignUpUser] = useState({ name: '', email: '', password: '' });

    const handleSignInChange = e => {
        const { name, value } = e.target;
        setSignInUser(prev => ({ ...prev, [name]: value }));
    };
    const handleSignUpChange = e => {
        const { name, value } = e.target;
        setSignUpUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signInUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    navigate('/');
                } else {
                    alert(data.message || '로그인 실패');
                }
            })
            .catch(err => {
                alert('서버 오류');
                console.error(err);
            });
    };
    const handleSignUp = e => {
        e.preventDefault();
        // 회원가입 fetch 로직 추가
    };

    return (
        <div className={styles.loginBody}>
            <div className={styles["logo-box"]}>
                <Logo />
            </div>
            <div className={`${styles.container} ${signUp ? styles["right-panel-active"] : ""}`}>
                <div className={`${styles["form-container"]} ${styles["sign-up-container"]}`}>
                    <form onSubmit={handleSignUp}>
                        <h1 className={styles.title}>계정 생성</h1>
                        <div className={styles["social-container"]}>
                            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className={styles.desc}>가입을 위해 이메일을 입력하세용</span>
                        <input type="text" name="name" placeholder="Name" value={signUpUser.name} onChange={handleSignUpChange} className={styles.input} />
                        <input type="email" name="email" placeholder="Email" value={signUpUser.email} onChange={handleSignUpChange} className={styles.input} />
                        <input type="password" name="password" placeholder="Password" value={signUpUser.password} onChange={handleSignUpChange} className={styles.input} />
                        <button type="submit" className={styles.button}>회원가입</button>
                    </form>
                </div>
                <div className={`${styles["form-container"]} ${styles["sign-in-container"]}`}>
                    <form onSubmit={handleSignIn}>
                        <h1 className={styles.title}>로그인</h1>
                        <div className={styles["social-container"]}>
                            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className={styles.desc}>소셜 계정이 없다면 이메일을 입력하세요</span>
                        <input type="email" name="email" placeholder="Email" value={signInUser.email} onChange={handleSignInChange} className={styles.input} />
                        <input type="password" name="password" placeholder="Password" value={signInUser.password} onChange={handleSignInChange} className={styles.input} />
                        <a href="#" className={styles.link}>비밀번호를 잊으셨나요?</a>
                        <button type="submit" className={styles.button}>로그인</button>
                    </form>
                </div>
                <div className={styles["overlay-container"]}>
                    <div className={styles.overlay}>
                        <div className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}>
                            <h1 className={styles.title}>다시 오셨군요!</h1>
                            <p className={styles.desc}></p>
                            <button className={styles.ghost} onClick={() => setSignUp(false)}>로그인하기</button>
                        </div>
                        <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
                            <h1 className={styles.title}>환영합니다!</h1>
                            <p className={styles.desc}>회원 정보를 입력해주시고 가입해주세요!</p>
                            <button className={styles.ghost} onClick={() => setSignUp(true)}>가입하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;