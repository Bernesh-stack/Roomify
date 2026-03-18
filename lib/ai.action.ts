import puter from "@heyputer/puter.js";
import { ROOMIFY_RENDER_PROMPT } from "./constant";

export async function fetchAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }
  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}




export function getImageDimensions(src: string): Promise<{width: number, height: number}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({width: img.width, height: img.height});
    img.onerror = reject;
    img.src = src;
  });
}

export const generate3DView = async({sourceImage}:Generate3DViewParams) => {
  const dataUrl = sourceImage.startsWith("data:") 
    ? sourceImage 
    : await fetchAsDataUrl(sourceImage);

  const base64Data = dataUrl.split(',')[1];
  const mimeType = dataUrl.split(';')[0].split(':')[1];

  if(!base64Data || !mimeType) throw new Error("Invalid source URL");

  try {
    // Calculate optimal dimensions preserving aspect ratio
    const {width, height} = await getImageDimensions(dataUrl);
    const MAX_DIM = 1024;
    let finalWidth = width;
    let finalHeight = height;

    if (finalWidth > MAX_DIM || finalHeight > MAX_DIM) {
      const ratio = Math.min(MAX_DIM / finalWidth, MAX_DIM / finalHeight);
      finalWidth *= ratio;
      finalHeight *= ratio;
    }

    // Round to nearest 64 for best AI model compatibility
    finalWidth = Math.round(finalWidth / 64) * 64;
    finalHeight = Math.round(finalHeight / 64) * 64;

    const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
      image_base64: base64Data,
      width: finalWidth,
      height: finalHeight,
      // Higher steps for better quality
      steps: 30,
      // Guidance scale for prompt adherence
      guidance_scale: 7.5,
      // Model hinting can help quality
      provider: 'openai',
      model: 'dall-e-3', 
      input_image: base64Data,
      input_image_mime_type: mimeType
    });

    if (!response) {
      throw new Error('No response from AI generation');
    }

    // Handle HTMLImageElement response from Puter SDK
    let renderedImage: string | null = null;
    
    if (response instanceof HTMLImageElement || (response as any).src) {
      const src = (response as any).src;
      renderedImage = src.startsWith("data:") ? src : await fetchAsDataUrl(src);
    } else if (typeof response === 'string') {
      renderedImage = (response as string).startsWith("data:") ? response : await fetchAsDataUrl(response);
    }

    if (!renderedImage) return {renderedImage: null, renderedPath: undefined};

    return {renderedImage, renderedPath: undefined};
  } catch (error) {
    console.error("Error generating 3D view:", JSON.stringify(error, null, 2));
    // Return null instead of throwing to prevent crashing the UI completely
    return {renderedImage: null, renderedPath: undefined};
  }
}
