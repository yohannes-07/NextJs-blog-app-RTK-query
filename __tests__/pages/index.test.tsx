import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGetBlogsQuery } from '@/store/features/blogs-api';
import Home from '@/app/page';

jest.mock('@/store/features/blogs-api');

describe('Home Page', () => {
  it('renders loading state when data is loading', () => {
    (useGetBlogsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<Home />);

    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const errorMessage = 'An error occurred';
    (useGetBlogsQuery as jest.Mock).mockReturnValue({
      error: { message: errorMessage },
    });

    render(<Home />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  // it('renders list of blogs when data is available', () => {
  //   const mockBlogs = [
  //     { id: 1, title: 'Blog 1', content: 'content 1' },
  //     { id: 2, title: 'Blog 2', content: 'content 2' },
  //   ];

  //   (useGetBlogsQuery as jest.Mock).mockReturnValue({
  //     data: mockBlogs,
  //     isLoading: false,
  //     isError: false,
  //   });

  //   render(<Home />);

  //   mockBlogs.forEach((blog) => {
  //     const blogTitleElement = screen.getByText(blog.title);
  //     expect(blogTitleElement).toBeInTheDocument();
  //   });
  // });
});
