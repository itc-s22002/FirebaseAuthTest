import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../FirebaseConfig';
import { useRouter } from 'next/router';

const AddUserPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // FirebaseのcreateUserWithEmailAndPasswordメソッドを使用してユーザーを登録
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/login'); // 登録成功後、ログインページにリダイレクト
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <h1>ユーザー登録</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type="submit">登録</button>
            </form>
        </div>
    );
};

export default AddUserPage;