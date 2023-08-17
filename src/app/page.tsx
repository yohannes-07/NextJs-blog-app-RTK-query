'use client'
import AddForm from '@/components/AddForm'
import { Blog } from '@/models/type'
import { useGetBlogsQuery } from '@/store/features/blogs-api'
import Link from 'next/link'

export default function Home() {
  const {
      data: blogs,
      isLoading,
      error
  } = useGetBlogsQuery()

  if (isLoading) {
    return <><div>Loading...</div></>
  }

  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <>
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
        </>
      )
    } else {
      return <> <div>{error.message}</div></>
    }
  }

  if (blogs) {
    return (
      <>
      <div>
        <AddForm />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold mb-4">Blog List</h1>

          {blogs?.map((blog:Blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="bg-gray-100 p-4 rounded-md mb-4 hover:bg-gray-200 cursor-pointer">
                {blog.title}
              </div>
            </Link>
          ))}

        </div>
    </div>
    </>
    )
  }else{
    return null
  }

}
