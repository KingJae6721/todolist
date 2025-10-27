import { useState } from 'react';

function UserRegister() {
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(user)
    };

    const userAdd = () => {
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)

        })
            .then(res => res.json())
            .then(data => {
                console.log('✅ 등록 성공:', data);
                // 필요 시 입력 초기화
                setUser({
                    email: '',
                    name: '',
                    password: '',
                    contact: ''
                });
            })
            .catch(err => console.error('❌ 등록 실패:', err));
    };

    return (
        <>
            <div>
                <h1>회원가입</h1>
                <hr />
                <label>
                    E-mail
                    <p><input type="text" name="email" value={user.email} onChange={handleChange} /></p>
                </label>
                <label>
                    이름
                    <p><input type="text" name="name" value={user.name} onChange={handleChange} /></p>
                </label>
                <label>
                    비밀번호
                    <p><input type="password" name="password" value={user.password} onChange={handleChange} /></p>
                </label>
                <label>
                    연락처
                    <p><input type="text" name="contact" value={user.contact} onChange={handleChange} /></p>
                </label>
                <button onClick={userAdd}>회원가입</button>
            </div>
        </>
    );
}

export default UserRegister;