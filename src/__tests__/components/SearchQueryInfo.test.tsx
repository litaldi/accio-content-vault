
import { render, screen } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SearchQueryInfo from '@/components/SearchQueryInfo';

describe('SearchQueryInfo', () => {
  it('should render correctly with search query and results count', () => {
    render(
      <SearchQueryInfo 
        searchQuery="react hooks" 
        isSemanticSearch={false} 
        resultsCount={5}
      />
    );
    
    expect(screen.getByText(/search results for:/i)).toBeInTheDocument();
    expect(screen.getByText(/"react hooks"/)).toBeInTheDocument();
    expect(screen.getByText(/found 5 items/i)).toBeInTheDocument();
  });

  it('should render semantic search text when isSemanticSearch is true', () => {
    render(
      <SearchQueryInfo 
        searchQuery="react hooks" 
        isSemanticSearch={true} 
        resultsCount={3}
      />
    );
    
    expect(screen.getByText(/results for:/i)).toBeInTheDocument();
    expect(screen.getByText(/"react hooks"/)).toBeInTheDocument();
  });

  it('should use singular form when there is only one result', () => {
    render(
      <SearchQueryInfo 
        searchQuery="react hooks" 
        isSemanticSearch={false} 
        resultsCount={1}
      />
    );
    
    expect(screen.getByText(/found 1 item/i)).toBeInTheDocument();
  });

  it('should not render anything when searchQuery is empty', () => {
    const { container } = render(
      <SearchQueryInfo 
        searchQuery="" 
        isSemanticSearch={false} 
        resultsCount={0}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SearchQueryInfo 
        searchQuery="react hooks" 
        isSemanticSearch={false} 
        resultsCount={5}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
