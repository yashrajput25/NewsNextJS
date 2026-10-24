import NewsList from '@/components/news-list';
import { getLatestNews } from '@/news'
import React from 'react'

const LatestPage = async () => {

  const latestNews = await getLatestNews();

  return (
    <div>
      <h1> LATEST PAGE</h1>
      <h2>
      </h2>
      <NewsList news={latestNews} />
    </div>
  )
}

export default LatestPage
