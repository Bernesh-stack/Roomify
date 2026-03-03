import { describe, it, expect } from 'vitest';
import routes from './routes';

describe('app/routes', () => {
  it('should export an array of route configurations', () => {
    expect(Array.isArray(routes)).toBe(true);
  });

  it('should have at least one route', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have exactly 2 routes', () => {
    expect(routes.length).toBe(2);
  });

  describe('index route', () => {
    it('should have an index route as first element', () => {
      const indexRoute = routes[0];
      expect(indexRoute).toBeDefined();
      expect(indexRoute).toHaveProperty('index', true);
    });

    it('should point to home.tsx file', () => {
      const indexRoute = routes[0];
      expect(indexRoute).toHaveProperty('file', 'routes/home.tsx');
    });
  });

  describe('visualizer route', () => {
    it('should have a visualizer route with id parameter', () => {
      const visualizerRoute = routes[1];
      expect(visualizerRoute).toBeDefined();
      expect(visualizerRoute).toHaveProperty('path');
    });

    it('should have correct path pattern', () => {
      const visualizerRoute = routes[1];
      expect(visualizerRoute.path).toBe('visualizer/:id');
    });

    it('should point to visualizer.$id.tsx file', () => {
      const visualizerRoute = routes[1];
      expect(visualizerRoute).toHaveProperty('file', './routes/visualizer.$id.tsx');
    });

    it('should have a dynamic id parameter', () => {
      const visualizerRoute = routes[1];
      expect(visualizerRoute.path).toContain(':id');
    });
  });

  describe('route structure', () => {
    it('should have valid route objects', () => {
      routes.forEach(route => {
        expect(route).toBeDefined();
        expect(typeof route).toBe('object');
      });
    });

    it('should have file property for all routes', () => {
      routes.forEach(route => {
        expect(route).toHaveProperty('file');
        expect(typeof route.file).toBe('string');
      });
    });

    it('should have file paths point to tsx files', () => {
      routes.forEach(route => {
        expect(route.file).toMatch(/\.tsx$/);
      });
    });
  });

  describe('route order', () => {
    it('should have index route before other routes', () => {
      expect(routes[0]).toHaveProperty('index', true);
    });

    it('should have visualizer route after index', () => {
      expect(routes[1].path).toBe('visualizer/:id');
    });
  });

  describe('edge cases', () => {
    it('should not have duplicate paths', () => {
      const paths = routes
        .filter(route => 'path' in route)
        .map(route => route.path);
      const uniquePaths = new Set(paths);
      expect(paths.length).toBe(uniquePaths.size);
    });

    it('should have only one index route', () => {
      const indexRoutes = routes.filter(route => 'index' in route && route.index === true);
      expect(indexRoutes.length).toBe(1);
    });

    it('should not have empty file paths', () => {
      routes.forEach(route => {
        expect(route.file).toBeTruthy();
        expect(route.file.length).toBeGreaterThan(0);
      });
    });
  });
});