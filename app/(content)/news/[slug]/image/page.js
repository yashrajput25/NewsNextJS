    import { DUMMY_NEWS } from '@/dummy-news';
import { notFound } from 'next/navigation';
import React from 'react'

    const ImagePage = ({params}) => {
        const newsSlug = params.slug;
        const newsItem = DUMMY_NEWS.find((newsItem) => newsSlug === newsItem.slug);

        if(!newsItem){
            notFound();
        }
    return (
        <div className='fullscreen-image'>
            <img src = {`/images/news/${newsItem.image}`}
                    alt= {newsItem.title}
                />
        </div>
    )
    }

    export default ImagePage
