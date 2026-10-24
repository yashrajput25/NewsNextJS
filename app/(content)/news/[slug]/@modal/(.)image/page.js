import { notFound } from 'next/navigation';
import React from 'react'
import { getNewsItem } from '@/news';
import ModalBackdrop from '@/components/modal-backdrop';

const InterceptedImagePage = async ({ params }) => {
    const newsSlug = params.slug;
    console.log(newsSlug);
    const newsItem = await getNewsItem(newsSlug);

    if (!newsItem) {
        notFound();
    }
    console.log("Intercepted!");
    return (
        <>
            <ModalBackdrop />
            <dialog className='modal' open>
                <div className='fullscreen-image'>
                    <img src={`/images/news/${newsItem.image}`}
                        alt={newsItem.title}
                    />
                </div>
            </dialog>
        </>
    )
}

export default InterceptedImagePage;
