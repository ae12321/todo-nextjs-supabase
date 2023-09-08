import BlogListStatic from '../components/blog-list-static'
import RefreshButton from '../components/refresh-button'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className="h-[calc(100vh-100px)] w-1/4 bg-blue-300 p-2">
        <BlogListStatic></BlogListStatic>
        <div className="flex justify-center">
          <RefreshButton></RefreshButton>
        </div>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
