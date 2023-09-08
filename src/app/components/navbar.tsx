import Link from 'next/link'

export default function NavBar() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="space-x-5">
        {/* <Link
          href="/"
          className="bg-blue-300 py-2 px-4 rounded text-black hover:bg-blue-100"
        >
          Home
        </Link> */}
        <Link
          href="/blogs"
          className="bg-blue-300 py-2 px-4 rounded text-black hover:bg-blue-100"
        >
          Nested Layout with Blogs
        </Link>
        <Link
          href="/streaming-sr"
          className="bg-blue-300 py-2 px-4 rounded text-black hover:bg-blue-100"
        >
          Streaming SR
        </Link>
        <Link
          href="/auth"
          className="bg-blue-300 py-2 px-4 rounded text-black hover:bg-blue-100"
        >
          Auth with CRUD
        </Link>
      </nav>
    </header>
  )
}
