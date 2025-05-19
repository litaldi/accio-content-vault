
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SearchBar from '@/components/SearchBar';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: jest.fn(),
    });
  });

  it('should render search input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/search by tag or keyword/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should call onSearch with query when form is submitted', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    
    const input = screen.getByPlaceholderText(/search by tag or keyword/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);
    
    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('should show error toast when search query is empty', async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
    
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    expect(toastMock).toHaveBeenCalledWith({
      title: "Search query empty",
      description: "Please enter a search term",
      variant: "destructive",
    });
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  it('should clear search input when clear button is clicked', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const input = screen.getByPlaceholderText(/search by tag or keyword/i);
    
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
    
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SearchBar onSearch={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
