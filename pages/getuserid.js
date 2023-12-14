import React, { useEffect, useState } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import auth from '../FirebaseConfig';
import { useRouter } from 'next/router';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {

        // ログイン状態が変更されたときに呼ばれるコールバック
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
                router.push('/login'); // ログインしていない場合はログインページにリダイレクト
            }
        });

        // コンポーネントがアンマウントされるときにunsubscribe
        return () => unsubscribe();
    }, []);

    if (user) {
        return (
            <div>
                <h1>
                    ユーザー情報
                </h1>
                <p>Email:{user.email}</p>
                <p>User ID: {user.uid}</p>
            </div>
        );
    } else {
        // ユーザーがログインしていない場合の表示
        return <p>Loading...</p>;
    }
};

export default UserInfo;