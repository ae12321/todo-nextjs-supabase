import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Database } from '../../../../database.types'

type Blog = Database['public']['Tables']['blogs']['Row']

type PageProps = {
  params: {
    blogId: string
  }
}

async function fetchBlog(blogId: string) {
  console.log({ blogId })
  const res = await fetch(
    `${process.env.url}/rest/v1/blogs?id=eq.${blogId}&select=*`,
    {
      headers: new Headers({
        apikey: process.env.apikey as string,
      }),
      //   cache: 'no-store',
      // staticにしたい場合、13.4以降は個別ページもforce-cacheする
      cache: 'force-cache',
    }
  )
  //   // 存在しない場合、fethcエラーが先に発生するのでnotfoundページ遷移したい場合は、コメントアウト
  //   if (!res.ok) {
  //     throw new Error('failed to fetch data in server')
  //   }
  const blogs: Blog[] = await res.json()
  return blogs[0]
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await fetchBlog(params.blogId)
  if (!blog) return notFound()

  return (
    <div className="mt-16 border p-8">
      <p>
        <strong className="mr-2">blog id: </strong>
        {blog.id}
      </p>
      <p>
        <strong className="mr-2">blog title: </strong>
        {blog.title}
      </p>
      <p>
        <strong className="mr-2">blog content: </strong>
        {blog.content}
      </p>
      <p>
        <strong className="mr-2">blog created at : </strong>
        {blog && format(new Date(blog.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <Link href={`/blogs`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  )
}
// staticなblogの個別ページをビルド時に事前に作成するには、生成するblog一覧が必要
//
export async function generateStaticParams() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })
  const blogs: Blog[] = await res.json()
  return blogs.map((blog) => {
    blogId: blog.id.toString()
  })
}
