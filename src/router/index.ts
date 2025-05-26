import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Import views
import HomePage from "@/views/HomePage.vue";
import VideoThumbnailPage from "@/views/VideoThumbnailPage.vue";
import LottieThumbnailPage from "@/views/LottieThumbnailPage.vue";
import Base64ConverterPage from "@/views/Base64ConverterPage.vue";
import TextThumbnailPage from "@/views/TextThumbnailPage.vue";
import WatermarkToolPage from "@/views/WatermarkToolPage.vue";
import PrivacyPolicyPage from "@/views/PrivacyPolicyPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      title: "ThumbGen - Free Online Thumbnail Generator",
      description:
        "Generate beautiful thumbnails from videos, animations, images, and text. Free online tool with no registration required.",
    },
  },
  {
    path: "/video-thumbnail-generator",
    name: "video-thumbnail",
    component: VideoThumbnailPage,
    meta: {
      title:
        "Video Thumbnail Generator - Extract Frames from Videos | ThumbGen",
      description:
        "Extract perfect frames from your videos to create engaging thumbnails. Support for MP4, WebM, and OGG formats. Free online tool.",
    },
  },
  {
    path: "/lottie-thumbnail-generator",
    name: "lottie-thumbnail",
    component: LottieThumbnailPage,
    meta: {
      title:
        "Lottie & TGS Thumbnail Generator - Extract Animation Frames | ThumbGen",
      description:
        "Generate thumbnails from Lottie animations and Telegram stickers. Extract any frame from your animated content.",
    },
  },
  {
    path: "/base64-image-converter",
    name: "base64-converter",
    component: Base64ConverterPage,
    meta: {
      title: "Image to Base64 Converter - Create Tiny Placeholders | ThumbGen",
      description:
        "Convert images to base64 data URIs for progressive loading. Create ultra-light placeholders that enhance user experience.",
    },
  },
  {
    path: "/text-thumbnail-generator",
    name: "text-thumbnail",
    component: TextThumbnailPage,
    meta: {
      title: "Text Thumbnail Generator - Create Custom Text Images | ThumbGen",
      description:
        "Design stunning text-based thumbnails with custom fonts, colors, and backgrounds. Perfect for social media and blog headers.",
    },
  },
  {
    path: "/watermark-tool",
    name: "watermark-tool",
    component: WatermarkToolPage,
    meta: {
      title: "Watermark Tool - Add Watermarks to Images | ThumbGen",
      description:
        "Protect your images with custom watermarks. Add text or image watermarks with full control over positioning and opacity.",
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicyPage,
    meta: {
      title: "Privacy Policy | ThumbGen",
      description:
        "Learn about how ThumbGen protects your privacy. All processing happens in your browser - we never store your data.",
    },
  },
  // Catch-all 404 route - must be last
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: {
      title: "404 - Page Not Found | ThumbGen",
      description: "The page you're looking for doesn't exist.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

// Update page title and meta tags
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || "ThumbGen";

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      (to.meta.description as string) || "",
    );
  }

  next();
});

export default router;
