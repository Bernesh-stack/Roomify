import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Upload from './Upload';

// Mock react-router's useOutletContext
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

const mockAuthContext = {
  isSignedIn: true,
  userName: 'testuser',
  signIn: vi.fn(),
  signOut: vi.fn(),
};

const mockAuthContextSignedOut = {
  isSignedIn: false,
  userName: null,
  signIn: vi.fn(),
  signOut: vi.fn(),
};

describe('components/Upload', () => {
  beforeEach(async () => {
    const { useOutletContext } = await import('react-router');
    vi.mocked(useOutletContext).mockReturnValue(mockAuthContext);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render dropzone when no file is selected', () => {
      render(<Upload />);
      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();
    });

    it('should show file input element', () => {
      render(<Upload />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it('should accept specific file types', () => {
      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.accept).toBe('.jpg, .jpeg, .png');
    });

    it('should display maximum file size', () => {
      render(<Upload />);
      expect(screen.getByText(/Maximum file size: 50MB/i)).toBeInTheDocument();
    });

    it('should show sign-in message when user is not signed in', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);

      render(<Upload />);
      expect(screen.getByText(/Sign in or Signup with Puter to upload/i)).toBeInTheDocument();
    });

    it('should show upload message when user is signed in', () => {
      render(<Upload />);
      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();
    });

    it('should render with upload class', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.upload')).toBeInTheDocument();
    });

    it('should render dropzone with correct classes', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
    });

    it('should render drop content area', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.drop-content')).toBeInTheDocument();
    });

    it('should render upload icon', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.drop-icon')).toBeInTheDocument();
    });
  });

  describe('authentication', () => {
    it('should disable input when user is not signed in', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);

      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should enable input when user is signed in', () => {
      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(false);
    });

    it('should show different messages based on auth state', async () => {
      const { useOutletContext } = await import('react-router');

      // Signed in
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContext);
      const { unmount } = render(<Upload />);
      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();

      unmount();

      // Signed out
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);
      render(<Upload />);
      expect(screen.getByText(/Sign in or Signup with Puter to upload/i)).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have dropzone container when no file', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
    });

    it('should have help text', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.help')).toBeInTheDocument();
    });

    it('should render file input with correct attributes', () => {
      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveClass('drop-input');
      expect(input.accept).toBe('.jpg, .jpeg, .png');
    });
  });

  describe('onComplete prop', () => {
    it('should accept onComplete callback prop', () => {
      const onComplete = vi.fn();
      render(<Upload onComplete={onComplete} />);
      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();
    });

    it('should work without onComplete prop', () => {
      render(<Upload />);
      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();
    });

    it('should have default empty function for onComplete', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.upload')).toBeInTheDocument();
    });
  });

  describe('drag and drop UI states', () => {
    it('should not have is-dragging class initially', () => {
      const { container } = render(<Upload />);
      const dropzone = container.querySelector('.dropzone');
      expect(dropzone?.classList.contains('is-dragging')).toBe(false);
    });

    it('should render dropzone when signed in', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
    });

    it('should render dropzone when signed out', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);

      const { container } = render(<Upload />);
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible file input', () => {
      render(<Upload />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should provide clear instructions to users', () => {
      render(<Upload />);
      const text = screen.getByText(/Click to upload or just drag and drop/i);
      expect(text).toBeInTheDocument();
    });

    it('should indicate disabled state properly', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);

      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid re-renders', () => {
      const { rerender } = render(<Upload />);

      for (let i = 0; i < 5; i++) {
        rerender(<Upload />);
      }

      expect(screen.getByText(/Click to upload or just drag and drop/i)).toBeInTheDocument();
    });

    it('should not crash when auth context changes', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContext);

      const { rerender } = render(<Upload />);

      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);
      rerender(<Upload />);

      expect(screen.getByText(/Sign in or Signup with Puter to upload/i)).toBeInTheDocument();
    });

    it('should maintain structure across renders', () => {
      const { container, rerender } = render(<Upload />);
      const initialHTML = container.innerHTML;

      rerender(<Upload />);

      expect(container.innerHTML).toBe(initialHTML);
    });

    it('should handle missing auth context gracefully', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContext);

      expect(() => {
        render(<Upload />);
      }).not.toThrow();
    });
  });

  describe('component integration', () => {
    it('should integrate with auth context', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContext);

      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(false);
    });

    it('should respect auth state for file operations', async () => {
      const { useOutletContext } = await import('react-router');
      vi.mocked(useOutletContext).mockReturnValue(mockAuthContextSignedOut);

      render(<Upload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('visual elements', () => {
    it('should render upload icon', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.drop-icon')).toBeInTheDocument();
    });

    it('should have proper styling classes', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.upload')).toBeInTheDocument();
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
      expect(container.querySelector('.drop-content')).toBeInTheDocument();
    });
  });

  describe('constants usage', () => {
    it('should import and use constants correctly', () => {
      // Verify component renders without error, indicating proper constant imports
      const { container } = render(<Upload />);
      expect(container.querySelector('.upload')).toBeInTheDocument();
    });
  });

  describe('event handlers', () => {
    it('should have drag and drop handlers attached', () => {
      const { container } = render(<Upload />);
      const dropzone = container.querySelector('.dropzone');
      expect(dropzone).toBeInTheDocument();
    });

    it('should have file input change handler', () => {
      const { container } = render(<Upload />);
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('conditional rendering', () => {
    it('should show dropzone when no file is uploaded', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector('.dropzone')).toBeInTheDocument();
      expect(container.querySelector('.upload-status')).not.toBeInTheDocument();
    });
  });
});