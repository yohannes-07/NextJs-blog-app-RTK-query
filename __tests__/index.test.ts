import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the useGetBlogsQuery hook
jest.mock('@/store/features/blogs-api', () => ({
  useGetBlogsQuery: jest.fn(),
}));

describe('Home Page', () => {
  // Mock the useGetBlogsQuery data
  const mockData = {
    data: [
      { id: 1, title: 'Blog 1' },
      { id: 2, title: 'Blog 2' },
    ],
    isLoading: false,
    error: null,
  };

  // Mock the useGetBlogsQuery implementation
  beforeEach(() => {
    useGetBlogsQuery.mockReturnValue(mockData);
  });

  it('renders blog list', () => {
    render(<Home />);
    expect(screen.getByText('Blog List')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2); // Assuming two blogs in the mock data
  });
});
