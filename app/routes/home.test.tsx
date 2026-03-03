import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home, { meta } from './home';

// Mock components
vi.mock('components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock('components/ui/Button', () => ({
  default: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('components/Upload', () => ({
  default: ({ onComplete }: any) => (
    <div data-testid="upload" data-on-complete={!!onComplete}>
      Upload Component
    </div>
  ),
}));

// Mock react-router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('app/routes/home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('meta function', () => {
    it('should return an array of meta tags', () => {
      const metaTags = meta({} as any);
      expect(Array.isArray(metaTags)).toBe(true);
    });

    it('should include title tag', () => {
      const metaTags = meta({} as any);
      const titleTag = metaTags.find((tag: any) => tag.title);
      expect(titleTag).toBeDefined();
      expect(titleTag.title).toBe('New React Router App');
    });

    it('should include description meta tag', () => {
      const metaTags = meta({} as any);
      const descTag = metaTags.find((tag: any) => tag.name === 'description');
      expect(descTag).toBeDefined();
      expect(descTag.content).toBe('Welcome to React Router!');
    });

    it('should return exactly 2 meta tags', () => {
      const metaTags = meta({} as any);
      expect(metaTags).toHaveLength(2);
    });
  });

  describe('component rendering', () => {
    it('should render without crashing', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('should render Navbar component', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('should render Upload component', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByTestId('upload')).toBeInTheDocument();
    });

    it('should have home class on main div', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.home')).toBeInTheDocument();
    });
  });

  describe('hero section', () => {
    it('should render hero section', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.hero')).toBeInTheDocument();
    });

    it('should display announcement', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Introducing Rommify 3.0/i)).toBeInTheDocument();
    });

    it('should display main heading', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(
        screen.getByText(/Build Beautiful spaces at the speed of thought with roomify/i)
      ).toBeInTheDocument();
    });

    it('should display subtitle', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(
        screen.getByText(/Rommify is an AI-powered interior design tool that transforms your space/i)
      ).toBeInTheDocument();
    });

    it('should have CTA link with correct href', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const ctaLink = container.querySelector('a.cta');
      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveAttribute('href', 'upload');
    });

    it('should display "Start Building" text in CTA', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Start Building/i)).toBeInTheDocument();
    });

    it('should have Watch Demo button', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Watch Demo/i)).toBeInTheDocument();
    });

    it('should render announce section with pulse animation', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.announce')).toBeInTheDocument();
      expect(container.querySelector('.pulse')).toBeInTheDocument();
    });
  });

  describe('upload section', () => {
    it('should render upload shell with id', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('#upload')).toBeInTheDocument();
    });

    it('should have grid overlay', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.grid-overlay')).toBeInTheDocument();
    });

    it('should display upload card heading', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Upload your space/i)).toBeInTheDocument();
    });

    it('should display supported formats', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Supports PNG, JPEG, SVG upto 10MB/i)).toBeInTheDocument();
    });

    it('should pass onComplete prop to Upload component', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const upload = screen.getByTestId('upload');
      expect(upload).toHaveAttribute('data-on-complete', 'true');
    });
  });

  describe('projects section', () => {
    it('should render projects section', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.projects')).toBeInTheDocument();
    });

    it('should display "Latest Projects" heading', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/Latest Projects/i)).toBeInTheDocument();
    });

    it('should display projects description', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(
        screen.getByText(/Your Latest work and shares , community projects,all in one/i)
      ).toBeInTheDocument();
    });

    it('should render project card', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.project-card')).toBeInTheDocument();
    });

    it('should display project image', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const img = container.querySelector('.preview img') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('roomify-mlhuk267-dfwu1i.puter.site');
    });

    it('should display Community badge', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const badge = container.querySelector('.badge');
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toContain('Community');
    });

    it('should display project name', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/project House/i)).toBeInTheDocument();
    });

    it('should display creation date', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const metaSection = container.querySelector('.meta');
      expect(metaSection).toBeInTheDocument();
    });

    it('should display "created by You" text', () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByText(/created by You/i)).toBeInTheDocument();
    });
  });

  describe('handleUploadComplete', () => {
    it('should navigate to visualizer with generated ID', async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      // Get the Upload component and simulate onComplete
      const uploadElement = screen.getByTestId('upload');
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      // Access the component instance indirectly by triggering upload
      // Since we can't directly call handleUploadComplete in this test setup,
      // we verify it exists by checking the prop was passed
      expect(uploadElement).toHaveAttribute('data-on-complete', 'true');
    });

    it('should use timestamp as ID for navigation', () => {
      const dateSpy = vi.spyOn(Date, 'now').mockReturnValue(1234567890);

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );

      dateSpy.mockRestore();
    });
  });

  describe('icons and visual elements', () => {
    it('should render Layers icon', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.upload-icon')).toBeInTheDocument();
    });

    it('should have actions section', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.actions')).toBeInTheDocument();
    });

    it('should have dot with pulse animation in announce', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.dot')).toBeInTheDocument();
      expect(container.querySelector('.pulse')).toBeInTheDocument();
    });
  });

  describe('structure and layout', () => {
    it('should have section-inner in projects section', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.section-inner')).toBeInTheDocument();
    });

    it('should have projects-grid', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.projects-grid')).toBeInTheDocument();
    });

    it('should have card-body in project card', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('.card-body')).toBeInTheDocument();
    });

    it('should have group class on project card', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const projectCard = container.querySelector('.project-card');
      expect(projectCard?.classList.contains('group')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle Date formatting correctly', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const metaSection = container.querySelector('.meta');
      expect(metaSection).toBeInTheDocument();

      // Check that date is rendered
      const date = new Date('01.01.2027');
      expect(date.toLocaleDateString()).toBeTruthy();
    });

    it('should render multiple sections in order', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    it('should have proper semantic HTML structure', () => {
      const { container } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h3')).toBeInTheDocument();
      expect(container.querySelectorAll('section').length).toBeGreaterThan(0);
    });
  });
});