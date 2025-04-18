'use client';

import { AppStore, initializeStore } from '@/redux/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
    children: React.ReactNode;
    locale?: string;
    user?: {
        kakaoId: string;
        nickname: string;
        email?: string;
    };
}

const ReduxProvider: React.FC<Props> = ({ children, user, locale }: Props) => {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // 초기 상태로 스토어 생성 (필요한 초기값 설정)
        storeRef.current = initializeStore({
            user: {
                info: user || null,
                isAuthenticated: !!user,
            },
            locale: { current: locale === 'en' ? 'en' : 'ko' },
        });
    }
    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
