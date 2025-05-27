// General types
export interface FileUpload {
  file: File;
  url: string;
  type: "video" | "image" | "lottie" | "tgs";
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface ExportOptions {
  format: "png" | "jpg" | "webp";
  quality: number;
  dimensions?: Dimensions;
  background?: "transparent" | "white" | "black" | "checkerboard";
  resolution?: number;
  useCustomResolution?: boolean;
  customWidth?: number;
  customHeight?: number;
}

// Video types
export interface VideoFrame {
  id: string;
  timestamp: number;
  thumbnail: string;
  selected?: boolean;
}

export interface VideoMetadata {
  duration: number;
  fps: number;
  width: number;
  height: number;
}

// Lottie types
export interface LottieFrame {
  id: string;
  frame: number;
  timestamp: number;
  thumbnail: string;
  selected?: boolean;
}

// Base64 types
export interface Base64Options {
  size: number; // 4-32px
  format: "dataUri" | "base64";
}

export interface Base64Result {
  original: {
    width: number;
    height: number;
    size: number;
  };
  preview: {
    width: number;
    height: number;
    dataUri: string;
    base64: string;
  };
}

// Text thumbnail types
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  strokeColor?: string;
  strokeWidth?: number;
  rotation?: number;
  alignment: "left" | "center" | "right";
}

export interface TextBackground {
  type: "solid" | "gradient" | "image";
  value: string | GradientBackground | File;
}

export interface GradientBackground {
  type: "linear" | "radial";
  angle?: number;
  colors: string[];
  positions?: number[];
}

export interface TextLayer {
  id: string;
  text: string;
  style: TextStyle;
  position: {
    x: number;
    y: number;
  };
}

// Watermark types
export interface Watermark {
  type: "text" | "image";
  content: string | File;
  position: WatermarkPosition;
  opacity: number;
  size: number;
  rotation?: number;
}

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | { x: number; y: number };

// Export types
export interface BatchExport {
  files: ExportFile[];
  format: ExportOptions["format"];
  includeWatermark?: boolean;
}

export interface ExportFile {
  name: string;
  blob: Blob;
  url: string;
}
