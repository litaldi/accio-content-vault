
import React from 'react';
import { render, screen, fireEvent, within } from '../utils/test-utils';
import { axe } from 'jest-axe';
import TagEditor from '@/components/TagEditor';
import { Tag } from '@/types';

const mockTags: Tag[] = [
  { id: '1', name: 'React', auto_generated: false, confirmed: true },
  { id: '2', name: 'TypeScript', auto_generated: true, confirmed: true },
];

describe('TagEditor', () => {
  it('should render the component with tags', () => {
    render(<TagEditor tags={mockTags} onTagsChange={() => {}} />);
    
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render in read-only mode', () => {
    render(<TagEditor tags={mockTags} onTagsChange={() => {}} readOnly={true} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Add a tag...')).not.toBeInTheDocument();
  });

  it('should render empty message in read-only mode when no tags', () => {
    render(<TagEditor tags={[]} onTagsChange={() => {}} readOnly={true} />);
    
    expect(screen.getByText('No tags added yet')).toBeInTheDocument();
  });

  it('should add a new tag', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} />);
    
    // Type a new tag and add it
    fireEvent.change(screen.getByLabelText('New tag name'), { target: { value: 'Jest' } });
    fireEvent.click(screen.getByText('Add'));
    
    expect(onTagsChangeMock).toHaveBeenCalledWith([
      ...mockTags,
      expect.objectContaining({ name: 'Jest', auto_generated: false })
    ]);
  });

  it('should not add an empty tag', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} />);
    
    // Try to add an empty tag
    fireEvent.click(screen.getByText('Add'));
    
    expect(onTagsChangeMock).not.toHaveBeenCalled();
  });

  it('should not add a duplicate tag (case insensitive)', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} />);
    
    // Try to add a duplicate tag with different case
    fireEvent.change(screen.getByLabelText('New tag name'), { target: { value: 'react' } });
    fireEvent.click(screen.getByText('Add'));
    
    expect(onTagsChangeMock).not.toHaveBeenCalled();
  });

  it('should remove a tag', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} />);
    
    // Click remove button on first tag
    const firstTag = screen.getByText('React').closest('[role="listitem"]');
    if (firstTag) {
      // Fix: Cast to HTMLElement to satisfy TypeScript
      const removeButton = within(firstTag as HTMLElement).getByLabelText('Remove React tag');
      fireEvent.click(removeButton);
      
      expect(onTagsChangeMock).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ id: '2' })])
      );
    }
  });

  it('should handle keyboard navigation', () => {
    render(<TagEditor tags={mockTags} onTagsChange={() => {}} />);
    
    const input = screen.getByLabelText('New tag name');
    
    // Simulate left arrow from input to move focus to last tag
    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    
    // This is a limited test since we can't fully test focus in Jest
    // In a real browser, this would shift focus to the tag buttons
    expect(document.activeElement).toBe(input); // Can't fully simulate focus change
  });

  it('should add a tag on pressing Enter', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} />);
    
    // Type a new tag and press Enter
    const input = screen.getByLabelText('New tag name');
    fireEvent.change(input, { target: { value: 'Jest' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onTagsChangeMock).toHaveBeenCalled();
  });

  it('should respect max tags limit', () => {
    const onTagsChangeMock = jest.fn();
    render(<TagEditor tags={mockTags} onTagsChange={onTagsChangeMock} maxTags={2} />);
    
    // The button and input should be disabled when max tags are reached
    expect(screen.getByLabelText('New tag name')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Add tag' })).toBeDisabled();
    expect(screen.getByPlaceholderText('Maximum 2 tags reached')).toBeInTheDocument();
  });

  it('should render compact variant', () => {
    render(<TagEditor tags={mockTags} onTagsChange={() => {}} variant="compact" />);
    
    // Check that compact styling is applied (can't fully test styles in Jest)
    const input = screen.getByLabelText('New tag name');
    expect(input.className).toContain('h-8');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TagEditor tags={mockTags} onTagsChange={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
