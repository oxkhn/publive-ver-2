'use client'

import { FootageTypeWithId } from '@/types/footage.type'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface VideoProps {
    video: FootageTypeWithId
}

const VideoCard: React.FC<VideoProps> = props => {
    const { video } = props

    return (
        <>
            <div className='relative flex h-[270px] w-[185px] cursor-pointer flex-col rounded-lg shadow-card transition-all'>
                <Image
                    src={video.thumbnailUrl}
                    alt=''
                    width={100}
                    height={100}
                    className='h-[185px] w-full rounded-lg'
                />

                <div className='flex flex-1 flex-col justify-between px-3 py-[10px]'>
                    <div className='flex gap-1'>
                        <p className='line-clamp-2 text-xs font-bold text-primary'>{video?.title}</p>
                    </div>

                    <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-1'>
                            <i className='tabler-heart' />

                            <p className='text-grays/50'>{video?.likes}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <i className='tabler-eye' />

                            <p className='text-grays/50'>{video?.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard
