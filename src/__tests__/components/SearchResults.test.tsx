
import { render, screen } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SearchResults from '@/components/SearchResults';
import { SavedContent, Tag } from '@/types';

// Mock the ContentList component
jest.mock('@/components/ContentList', () => {
  return {
    __esModule: true,
    default: ({ contents }: { contents: SavedContent[] }) => (
      <div data-testid="content-list">
        {contents.map((content) => (
          <div key={content.id} data-testid={`content-item-${content.id}`}>
            {content.title}
          </div>
        ))}
      </div>
    ),
  };
});

// Mock TagEditor component
jest.mock('@/components/TagEditor', () => {
  return {
    __esModule: true,
    default: ({ tags, onTagsChange }: { tags: Tag[], onTagsChange: any }) => (
      <div data-testid="tag-editor">
        <button 
          data-testid="mock-tag-change-button"
          onClick={() => onTagsChange([{ id: 'new-tag', name: 'New Tag', auto_generated: false, confirmed: true }])}
        >
          Change Tags
        </button>
        <div data-testid="tags-count">{tags.length}</div>
      </div>
    ),
  };
});

describe('SearchResults', () => {
  const mockContent: SavedContent = {
    id: '1',
    user_id: 'user1',
    title: 'Test Content',
    url: 'https://example.com',
    description: 'This is a test content',
    file_url: '',
    content_type: 'link',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    tags: [
      { id: 'tag1', name: 'React', auto_generated: false, confirmed: true, created_at: '2023-01-01T00:00:00.000Z' },
      { id: 'tag2', name: 'Testing', auto_generated: true, confirmed: true, created_at: '2023-01-01T00:00:00.000Z' }
    ]
  };

  const mockSearchResults = [
    { content: mockContent, score: 0.9 }
  ];

  it('should render search results', () => {
    render(
      <SearchResults 
        searchResults={mockSearchResults}
        searchQuery="test query"
        onTagsChange={() => {}}
      />
    );
    
    expect(screen.getByTestId('content-list')).toBeInTheDocument();
    expect(screen.getByTestId('content-item-1')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should show no results message when results are empty', () => {
    render(
      <SearchResults 
        searchResults={[]}
        searchQuery="test query"
        onTagsChange={() => {}}
      />
    );
    
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search/)).toBeInTheDocument();
    expect(screen.queryByTestId('content-list')).not.toBeInTheDocument();
  });

  it('should call onTagsChange when tags are updated', () => {
    const onTagsChangeMock = jest.fn();
    render(
      <SearchResults 
        searchResults={mockSearchResults}
        searchQuery="test query"
        onTagsChange={onTagsChangeMock}
      />
    );
    
    // Click the mock button to trigger tag change
    screen.getByTestId('mock-tag-change-button').click();
    
    // Check if onTagsChange was called with the correct arguments
    expect(onTagsChangeMock).toHaveBeenCalledWith(
      '1', 
      [{ id: 'new-tag', name: 'New Tag', auto_generated: false, confirmed: true }]
    );
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SearchResults 
        searchResults={mockSearchResults}
        searchQuery="test query"
        onTagsChange={() => {}}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render multiple search results', () => {
    const additionalContent: SavedContent = {
      ...mockContent,
      id: '2',
      title: 'Second Test Content'
    };
    
    const multipleResults = [
      { content: mockContent, score: 0.9 },
      { content: additionalContent, score: 0.8 }
    ];
    
    render(
      <SearchResults 
        searchResults={multipleResults}
        searchQuery="test query"
        onTagsChange={() => {}}
      />
    );
    
    expect(screen.getByTestId('content-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('content-item-2')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Second Test Content')).toBeInTheDocument();
  });
});
