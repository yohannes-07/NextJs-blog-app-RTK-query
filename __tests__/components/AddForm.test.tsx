import 'whatwg-fetch';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddForm from '@/components/AddForm';
import { useAddBlogMutation } from '@/store/features/blogs-api';

jest.mock('@/store/features/blogs-api');

describe('AddForm Component', () => {
  it('handles form submission', async () => {
   
    const mockMutation = jest.fn();
    (useAddBlogMutation as jest.Mock).mockReturnValue([mockMutation, { isLoading: false, isError: false }]);

    render(<AddForm />);

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText('Content') as HTMLTextAreaElement;
    const submitButton = screen.getByText('Add Post');

    const testTitle = 'Test Title';
    const testContent = 'Test Content';

    fireEvent.change(titleInput, { target: { value: testTitle } });
    fireEvent.change(contentInput, { target: { value: testContent } });
    fireEvent.click(submitButton);

   
    expect(mockMutation).toHaveBeenCalledWith({ title: testTitle, content: testContent });

   
  });
});
