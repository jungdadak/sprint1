'use client';

import LogoutBtn from '@/components/Btn/LogoutBtn';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useLocale } from '@/hooks/useLocale';
import { fetchUserDetail } from '@/lib/fetcher/fetchUserDetail';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AuthNavProps {
    kakaoId?: string | number;
    nickname?: string;
}

export default function AuthNav({ kakaoId, nickname }: AuthNavProps) {
    const { t } = useLocale();
    const locale = useAppSelector((state) => state.locale.current);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(
        '/icon/profile/defaultProfile.svg',
    );
    useEffect(() => {
        if (!kakaoId && process.env.NODE_ENV === 'development') return;
        (async () => {
            try {
                const user = await fetchUserDetail(kakaoId);
                setThumbnailUrl(
                    user.thumbnailUrl || '/icon/profile/defaultProfile.svg',
                );
            } catch {
                setThumbnailUrl('/icon/profile/defaultProfile.svg');
            }
        })();
    }, [kakaoId]);

    return (
        <div
            className={
                'flex flex-col items-center gap-1 text-center text-base font-semibold text-[#666666] md:ml-5 md:flex-row md:gap-7.5'
            }
        >
            <Link href={'/liked'} className={'cursor-pointer'}>
                {t.gnb.book}
            </Link>
            <Link href={`/chat/${kakaoId}`} className={'cursor-pointer'}>
                {t.gnb.chat}
            </Link>
            <Link href={'#'} className={'cursor-pointer'}>
                {t.gnb.alert}
            </Link>
            <Popover>
                <PopoverTrigger
                    asChild
                    className="border-sky-blue h-8 w-8 cursor-pointer rounded-full border"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 overflow-hidden rounded-full p-0"
                        aria-label={t.gnb.pAria}
                    >
                        <Image
                            src={thumbnailUrl}
                            alt={'프로필 이미지'}
                            width={32}
                            height={32}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                    <div className="flex flex-col items-center space-y-2">
                        <p className="font-semibold">
                            {locale !== 'en'
                                ? `${nickname} ${t.gnb.dear}`
                                : `${t.gnb.dear} ${nickname}`}
                        </p>
                        <div className="h-px w-full bg-gray-200"></div>
                        <Link
                            href={`/profile/${kakaoId}`}
                            className="hover:text-sky-blue py-1"
                        >
                            {t.gnb.mypage}
                        </Link>
                        <div className="pt-1">
                            <LogoutBtn />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
