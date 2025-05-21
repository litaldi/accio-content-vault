
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { axe } from 'jest-axe';
import SaveContent from '@/pages/SaveContent';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock child components
jest.mock('@/components/SaveContent/SaveContentForm', () => ({
  __esModule: true,
  default: () => {
    // This simulates the real form behavior for integration testing
    return (
      <div data-testid="save-content-form">
        <form onSubmit={(e) => {
          e.preventDefault();
          // Simulate successful submission
          window.dispatchEvent(new CustomEvent('content-saved', {
            detail: { success: true, contentId: '123' }
          }));
        }}>
          <input 
            data-testid="url-input" 
            placeholder="Enter URL" 
            aria-label="URL"
          />
          
          <input 
            data-testid="title-input" 
            placeholder="Title" 
            aria-label="Title"
          />
          
          <textarea 
            data-testid="description-input" 
            placeholder="Description" 
            aria-label="Description"
          />
          
          <div data-testid="tag-editor">
            <input data-testid="tag-input" aria-label="Add tag" />
            <button data-testid="add-tag-button">Add Tag</button>
          </div>
          
          <button type="submit" data-testid="submit-button">
            Save Content
          </button>
        </form>
      </div>
    );
  },
}));

jest.mock('@/components/Navbar', () => ({
  __esModule: true,
  default: () => <header data-testid="navbar">Navigation Bar</header>,
}));

describe('SaveContent Integration', () => {
  const navigateMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders the SaveContent page with form', () => {
    render(<SaveContent />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Save Content')).toBeInTheDocument();
    expect(screen.getByTestId('save-content-form')).toBeInTheDocument();
    expect(screen.getByTestId('url-input')).toBeInTheDocument();
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('handles successful form submission and redirects', async () => {
    render(<SaveContent />);
    
    // Fill out form
    fireEvent.change(screen.getByTestId('url-input'), { 
      target: { value: 'https://example.com' } 
    });
    
    fireEvent.change(screen.getByTestId('title-input'), { 
      target: { value: 'Example Website' } 
    });
    
    fireEvent.change(screen.getByTestId('description-input'), { 
      target: { value: 'This is a test description' } 
    });
    
    // Add a tag
    fireEvent.change(screen.getByTestId('tag-input'), { 
      target: { value: 'example' } 
    });
    fireEvent.click(screen.getByTestId('add-tag-button'));
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Wait for redirect to happen
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SaveContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
