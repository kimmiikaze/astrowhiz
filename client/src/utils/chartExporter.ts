import { ExportOptions } from '../types/chart';

export class ChartExporter {
  // Export SVG as downloadable file
  static exportSVG(svgContent: string, filename: string = 'astrology-chart.svg'): void {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  // Convert SVG to PNG and export
  static async exportPNG(
    svgContent: string, 
    options: ExportOptions,
    filename: string = 'astrology-chart.png'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Create an image element
      const img = new Image();
      
      // Create canvas for high-resolution rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Set canvas size for high resolution
      const scale = window.devicePixelRatio || 1;
      canvas.width = options.width * scale;
      canvas.height = options.height * scale;
      canvas.style.width = options.width + 'px';
      canvas.style.height = options.height + 'px';
      
      // Scale context for high DPI
      ctx.scale(scale, scale);
      
      // Set image smoothing for high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      img.onload = () => {
        // Clear canvas with transparent background if specified
        if (options.transparent) {
          ctx.clearRect(0, 0, options.width, options.height);
        } else {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, options.width, options.height);
        }
        
        // Draw the SVG image
        ctx.drawImage(img, 0, 0, options.width, options.height);
        
        // Convert to blob and download
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = filename;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              resolve();
            } else {
              reject(new Error('Failed to create PNG blob'));
            }
          },
          'image/png',
          options.quality || 0.95
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load SVG image'));
      };

      // Create data URL from SVG
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      img.src = svgUrl;
    });
  }

  // Get SVG as data URL for preview
  static getSVGDataURL(svgContent: string): string {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    return URL.createObjectURL(svgBlob);
  }

  // Validate export options
  static validateExportOptions(options: Partial<ExportOptions>): ExportOptions {
    return {
      format: options.format || 'svg',
      width: Math.max(options.width || 800, 100),
      height: Math.max(options.height || 800, 100),
      quality: Math.min(Math.max(options.quality || 0.95, 0.1), 1),
      transparent: options.transparent ?? true
    };
  }

  // Generate high-resolution SVG for print
  static generatePrintSVG(svgContent: string, dpi: number = 300): string {
    // Calculate scale factor for desired DPI (default 72 DPI to target DPI)
    const scaleFactor = dpi / 72;
    
    // Parse SVG to update dimensions
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (!svgElement) {
      throw new Error('Invalid SVG content');
    }

    // Get current dimensions
    const currentWidth = parseFloat(svgElement.getAttribute('width') || '600');
    const currentHeight = parseFloat(svgElement.getAttribute('height') || '600');
    
    // Update dimensions for high resolution
    svgElement.setAttribute('width', (currentWidth * scaleFactor).toString());
    svgElement.setAttribute('height', (currentHeight * scaleFactor).toString());
    
    // Ensure viewBox is preserved for scalability
    if (!svgElement.getAttribute('viewBox')) {
      svgElement.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);
    }

    return new XMLSerializer().serializeToString(svgElement);
  }
}