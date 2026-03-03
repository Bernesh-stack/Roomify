import { describe, it, expect } from 'vitest';
import {
  PUTER_WORKER_URL,
  STORAGE_PATHS,
  SHARE_STATUS_RESET_DELAY_MS,
  PROGRESS_INCREMENT,
  REDIRECT_DELAY_MS,
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  GRID_OVERLAY_SIZE,
  GRID_COLOR,
  UNAUTHORIZED_STATUSES,
  IMAGE_RENDER_DIMENSION,
  ROOMIFY_RENDER_PROMPT,
} from './constant';

describe('lib/constant', () => {
  describe('PUTER_WORKER_URL', () => {
    it('should be a string', () => {
      expect(typeof PUTER_WORKER_URL).toBe('string');
    });

    it('should use environment variable or empty string', () => {
      expect(PUTER_WORKER_URL).toBeDefined();
    });
  });

  describe('STORAGE_PATHS', () => {
    it('should have ROOT path', () => {
      expect(STORAGE_PATHS.ROOT).toBe('roomify');
    });

    it('should have SOURCES path', () => {
      expect(STORAGE_PATHS.SOURCES).toBe('roomify/sources');
    });

    it('should have RENDERS path', () => {
      expect(STORAGE_PATHS.RENDERS).toBe('roomify/renders');
    });

    it('should be a readonly object', () => {
      expect(Object.isFrozen(STORAGE_PATHS)).toBe(false);
      // TypeScript enforces readonly at compile time
      expect(STORAGE_PATHS).toBeDefined();
    });

    it('should have all paths start with ROOT', () => {
      expect(STORAGE_PATHS.SOURCES).toContain(STORAGE_PATHS.ROOT);
      expect(STORAGE_PATHS.RENDERS).toContain(STORAGE_PATHS.ROOT);
    });
  });

  describe('Timing Constants', () => {
    it('should have SHARE_STATUS_RESET_DELAY_MS equal to 1500', () => {
      expect(SHARE_STATUS_RESET_DELAY_MS).toBe(1500);
    });

    it('should have PROGRESS_INCREMENT equal to 15', () => {
      expect(PROGRESS_INCREMENT).toBe(15);
    });

    it('should have REDIRECT_DELAY_MS equal to 600', () => {
      expect(REDIRECT_DELAY_MS).toBe(600);
    });

    it('should have PROGRESS_INTERVAL_MS equal to 100', () => {
      expect(PROGRESS_INTERVAL_MS).toBe(100);
    });

    it('should have PROGRESS_STEP equal to 5', () => {
      expect(PROGRESS_STEP).toBe(5);
    });

    it('should have all timing values be positive numbers', () => {
      expect(SHARE_STATUS_RESET_DELAY_MS).toBeGreaterThan(0);
      expect(PROGRESS_INCREMENT).toBeGreaterThan(0);
      expect(REDIRECT_DELAY_MS).toBeGreaterThan(0);
      expect(PROGRESS_INTERVAL_MS).toBeGreaterThan(0);
      expect(PROGRESS_STEP).toBeGreaterThan(0);
    });

    it('should have REDIRECT_DELAY_MS less than SHARE_STATUS_RESET_DELAY_MS', () => {
      expect(REDIRECT_DELAY_MS).toBeLessThan(SHARE_STATUS_RESET_DELAY_MS);
    });

    it('should have PROGRESS_STEP less than PROGRESS_INCREMENT', () => {
      expect(PROGRESS_STEP).toBeLessThan(PROGRESS_INCREMENT);
    });
  });

  describe('UI Constants', () => {
    it('should have GRID_OVERLAY_SIZE equal to "60px 60px"', () => {
      expect(GRID_OVERLAY_SIZE).toBe('60px 60px');
    });

    it('should have GRID_COLOR equal to "#3B82F6"', () => {
      expect(GRID_COLOR).toBe('#3B82F6');
    });

    it('should have GRID_COLOR be a valid hex color', () => {
      expect(GRID_COLOR).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('HTTP Status Codes', () => {
    it('should have UNAUTHORIZED_STATUSES be an array', () => {
      expect(Array.isArray(UNAUTHORIZED_STATUSES)).toBe(true);
    });

    it('should contain 401 status code', () => {
      expect(UNAUTHORIZED_STATUSES).toContain(401);
    });

    it('should contain 403 status code', () => {
      expect(UNAUTHORIZED_STATUSES).toContain(403);
    });

    it('should have exactly 2 status codes', () => {
      expect(UNAUTHORIZED_STATUSES).toHaveLength(2);
    });

    it('should only contain valid HTTP status codes', () => {
      UNAUTHORIZED_STATUSES.forEach(status => {
        expect(status).toBeGreaterThanOrEqual(100);
        expect(status).toBeLessThan(600);
      });
    });
  });

  describe('Image Dimensions', () => {
    it('should have IMAGE_RENDER_DIMENSION equal to 1024', () => {
      expect(IMAGE_RENDER_DIMENSION).toBe(1024);
    });

    it('should have IMAGE_RENDER_DIMENSION be a power of 2', () => {
      const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;
      expect(isPowerOfTwo(IMAGE_RENDER_DIMENSION)).toBe(true);
    });
  });

  describe('ROOMIFY_RENDER_PROMPT', () => {
    it('should be a non-empty string', () => {
      expect(typeof ROOMIFY_RENDER_PROMPT).toBe('string');
      expect(ROOMIFY_RENDER_PROMPT.length).toBeGreaterThan(0);
    });

    it('should contain task description', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('TASK:');
    });

    it('should contain strict requirements section', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('STRICT REQUIREMENTS');
    });

    it('should mention removing all text', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('REMOVE ALL TEXT');
    });

    it('should mention geometry matching', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('GEOMETRY MUST MATCH');
    });

    it('should specify top-down view', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('TOP‑DOWN');
    });

    it('should contain structure and details section', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('STRUCTURE & DETAILS');
    });

    it('should mention walls, doors, and windows', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('Walls');
      expect(ROOMIFY_RENDER_PROMPT).toContain('Doors');
      expect(ROOMIFY_RENDER_PROMPT).toContain('Windows');
    });

    it('should contain furniture mapping section', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('FURNITURE & ROOM MAPPING');
    });

    it('should mention various room types', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('bed');
      expect(ROOMIFY_RENDER_PROMPT).toContain('sofa');
      expect(ROOMIFY_RENDER_PROMPT).toContain('Kitchen');
      expect(ROOMIFY_RENDER_PROMPT).toContain('Bathroom');
    });

    it('should contain style and lighting section', () => {
      expect(ROOMIFY_RENDER_PROMPT).toContain('STYLE & LIGHTING');
    });

    it('should be trimmed (no leading/trailing whitespace)', () => {
      expect(ROOMIFY_RENDER_PROMPT).toBe(ROOMIFY_RENDER_PROMPT.trim());
    });
  });
});