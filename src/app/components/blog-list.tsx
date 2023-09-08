import Link from 'next/link'

import { Database } from '../../../database.types'

type Blog = Database['public']['Tables']['blogs']['Row']

async function fetchBlogs() {
  await new Promise((resolve) => setTimeout(resolve, 6000))
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
  })
  if (!res.ok) {
    throw new Error('failed to fetch data in server ')
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export default async function BlogList() {
  const blogs = await fetchBlogs()
  return (
    <div className="p-4">
      <p className="text-xl">Blogs</p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="text-base">
            <Link prefetch={false} href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
