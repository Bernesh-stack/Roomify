export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || "";

// Storage Paths
export const STORAGE_PATHS = {
    ROOT: "roomify",
    SOURCES: "roomify/sources",
    RENDERS: "roomify/renders",
} as const;

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500;
export const PROGRESS_INCREMENT = 15;
export const REDIRECT_DELAY_MS = 600;
export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_STEP = 5;

// UI Constants
export const GRID_OVERLAY_SIZE = "60px 60px";
export const GRID_COLOR = "#3B82F6";

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403];

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024;

export const ROOMIFY_RENDER_PROMPT = `
Convert this 2D floor plan into a realistic top-down 3D render.

REQUIREMENTS:
1. No text/labels. Walls/floors must be continuous.
2. Maintain exact wall/door/window positions.
3. Orthographic top-down view only. No perspective.
4. Realistic lighting but keep the layout exactly as is.
5. High Resolution & Clarity: 8k resolution, highly detailed, sharp focus.
6. FIT TO CANVAS: The rendered floor plan should fill the image area. Minimal whitespace.

DETAILS:
- Extrude walls efficiently.
- Convert arcs to open doors.
- Windows as glass.
- Sharp edges, no blur.

FURNITURE (if shown):
- Bed: realistic bedding.
- Sofa: modern style.
- Table: with chairs.
- Kitchen: counters, sink, stove.
- Bathroom: toilet, sink, tub/shower.
`.trim();