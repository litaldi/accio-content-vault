
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import Dashboard from '@/pages/Dashboard';
import { axe } from 'jest-axe';
import { useNavigate } from 'react-router-dom';
import { useContentSearch } from '@/hooks/useContentSearch';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock useContentSearch hook
jest.mock('@/hooks/useContentSearch', () => ({
  useContentSearch: jest.fn(),
}));

// Mock components
jest.mock('@/components/Navbar', () => ({
  __esModule: true,
  default: ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: () => void }) => (
    <header data-testid="navbar">
      <button onClick={onLogout} data-testid="logout-button">Logout</button>
    </header>
  ),
}));

jest.mock('@/components/DashboardHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-header">Dashboard Header</div>,
}));

jest.mock('@/components/SemanticSearchBar', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="search-bar">
      <input 
        data-testid="search-input" 
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  ),
}));

jest.mock('@/components/SearchQueryInfo', () => ({
  __esModule: true,
  default: ({ searchQuery, isSemanticSearch, resultsCount }: { searchQuery: string, isSemanticSearch: boolean, resultsCount: number }) => (
    <div data-testid="search-info">
      {searchQuery && <span>Results for: {searchQuery}</span>}
      <span data-testid="results-count">{resultsCount}</span>
    </div>
  ),
}));

jest.mock('@/components/SearchResults', () => ({
  __esModule: true,
  default: ({ searchResults, searchQuery, onTagsChange }: { searchResults: any[], searchQuery: string, onTagsChange: any }) => (
    <div data-testid="search-results">
      <span>Results for: {searchQuery}</span>
      <span>Count: {searchResults.length}</span>
      <button 
        onClick={() => onTagsChange('1', [{ id: 'new', name: 'test' }])} 
        data-testid="change-tags"
      >
        Change Tags
      </button>
    </div>
  ),
}));

describe('Dashboard Page', () => {
  const navigateMock = jest.fn();
  const searchMock = jest.fn();
  const tagsChangeMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup mocks
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useContentSearch as jest.Mock).mockReturnValue({
      searchResults: [{ content: { id: '1', title: 'Test Content' } }],
      searchQuery: 'test',
      isSemanticSearch: true,
      isLoading: false,
      handleSearch: searchMock,
      handleTagsChange: tagsChangeMock
    });
  });

  it('renders the dashboard with all components', () => {
    render(<Dashboard />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getByText(/Add New Content/i)).toBeInTheDocument();
  });

  it('navigates to add content page when button is clicked', () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByText(/Add New Content/i));
    expect(navigateMock).toHaveBeenCalledWith('/save');
  });

  it('handles logout', () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByTestId('logout-button'));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('handles search query changes', () => {
    render(<Dashboard />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(searchMock).toHaveBeenCalledWith('new search');
  });

  it('handles tag changes', () => {
    render(<Dashboard />);
    
    fireEvent.click(screen.getByTestId('change-tags'));
    expect(tagsChangeMock).toHaveBeenCalledWith('1', [{ id: 'new', name: 'test' }]);
  });

  it('shows loading state', () => {
    (useContentSearch as jest.Mock).mockReturnValue({
      searchResults: [],
      searchQuery: 'test',
      isSemanticSearch: true,
      isLoading: true,
      handleSearch: searchMock,
      handleTagsChange: tagsChangeMock
    });
    
    render(<Dashboard />);
    
    expect(screen.getByText(/Searching content/i)).toBeInTheDocument();
    expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Dashboard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
