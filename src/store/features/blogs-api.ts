import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog } from '@/models/type'

export const blogApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
      getBlogs: builder.query<Blog[], void>({
        query: () => '/blogs',
        providesTags: ['Blogs'],
      }),

      getBlog: builder.query<Blog, number>({
        query: (blogId) => `blogs/${blogId}`,
        providesTags: ['Blogs']
      }),

      addBlog: builder.mutation<void, Blog>({
        query: (newBlog) => ({
          url: '/blogs',
          method: 'POST',
          body: newBlog,
        }),
        invalidatesTags: ['Blogs'],
      }),

      updateBlog: builder.mutation<void, Blog>({
        query: (updatedBlog) => ({
          url: `blogs/${updatedBlog.id}`,
          method: 'PUT',
          body: updatedBlog,
        }),
        invalidatesTags: ['Blogs'],
     }),

      deleteBlog: builder.mutation<void, Blog>({
        query: (blog) => ({
          url: `blogs/${blog.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Blogs'],
      }),
    }),
  });
  
  export const {
    useAddBlogMutation,
    useDeleteBlogMutation,
    useGetBlogsQuery,
    useGetBlogQuery,
    useUpdateBlogMutation,
  } = blogApi;