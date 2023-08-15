'use client'

import React , {useState, useEffect, ReactNode}from 'react'
import { useDeleteBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from '@/store/features/blogs-api'
import { useParams, useRouter } from 'next/navigation'
import { Blog } from '@/models/type'



const SingleBlog = () => {
    const [isEditing, setisEditing] = useState(false)
    const params = useParams();
    const blogId = params.id
    const router = useRouter()
    
    const { data: blog, error } = useGetBlogQuery(Number(blogId));
    const [updateBlog] = useUpdateBlogMutation()
    const [deleteBlog] = useDeleteBlogMutation()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("" );

    useEffect(() => {
        if(blog){
            setTitle(blog.title)
            setContent(blog.content)
        }
    }, [isEditing])
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title && content) {
            const updatedBlog:Blog = {id: blog?.id, title, content}
            try {
                await updateBlog(updatedBlog).unwrap()
                setTitle('');
                setContent('');
                setisEditing(false);
            } catch (error) {
                console.log(error)
                
            }
        
        }
    };

    let deleted:Boolean = false

    const handleDelete = async (e:React.FormEvent) => {
        e.preventDefault()
        if (blog) {
            await deleteBlog(blog);
            router.push("/")
            deleted = true

          }

    }

    if (!blog) {
        return <div>Loading...</div>;
      }
    
    if (error) {
        if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

        if (deleted){
            return (
                <div>
                    Deleted Successfully
                </div>
            )
        }

        return (
            <div>
            <div>Blog not found</div>
            </div>
        )
    } else {
        return <div>{error.message}</div>
        }
    }



        
        return (
            <div>
                {!isEditing ?  blog && (<div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
                <div>{blog.content}</div>
                <div className='flex gap-4'>
                <button className='bg-blue-500 text-white border-none  rounded mt-48 p-1 w-1/12 ' onClick={() => setisEditing(!isEditing)}>Edit</button>
                <button className='bg-blue-500 text-white border-none  rounded mt-48 p-1 w-1/12 ' onClick={handleDelete}>Delete</button>
                </div>
            </div>
            ):(
               <div className='flex flex-col items-center m-40'>
                  <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center ">
                    <input
                    type="text"
                    value={title }
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full border border-gray-700 rounded p-2"
                    />
                    <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full border  border-gray-700 rounded p-2 h-40"
                    />
                    <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Save
                    </button>
                </form>
               </div> 
               

        ) }
        
        </div>
        );
  

}

export default SingleBlog