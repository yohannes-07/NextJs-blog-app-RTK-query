"use client"

import React, { useState } from 'react';
import { useAddBlogMutation } from '@/store/features/blogs-api';
import { Blog } from '@/models/type';


const AddForm: React.FC = () => {
  const[addBlog] = useAddBlogMutation()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && content) {
        const blog: Blog = {title, content}
        try {
            await addBlog(blog).unwrap()
            setTitle('');
            setContent('');
        } catch (error) {
            console.log(error)
            
        }
    
    }
  };

  return (
    <div className="mt-8 flex flex-col justify-center items-center" >
      <h2 className="text-xl font-semibold mb-2 ">Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border border-gray-700 rounded p-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full border  border-gray-700 rounded p-2 h-40"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddForm;
