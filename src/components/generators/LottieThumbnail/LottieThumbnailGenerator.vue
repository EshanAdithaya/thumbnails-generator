<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-4 mb-8">
      <h2 class="text-3xl font-bold text-gray-900">
        Lottie/TGS Thumbnail Generator
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Extract frames from Lottie animations and Telegram stickers. Perfect for
        creating static previews of your animated content.
      </p>

      <!-- Use Cases -->
      <div class="bg-blue-50 rounded-lg p-4 space-y-2">
        <h3 class="font-semibold text-gray-900 flex items-center gap-2">
          <svg
            class="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Perfect for:
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Animation portfolio preview images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Telegram sticker pack previews</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>App loading animation screenshots</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>UI/UX animation documentation</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Marketing material from animations</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Social media static posts from animations</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Upload Section -->
    <div v-if="!animationFile">
      <DropZone
        accept="application/json,.json,.tgs"
        :icon="CirclePlayIcon"
        title="Drop your Lottie/TGS file here"
        subtitle="or click to browse"
        :formats="['JSON', 'TGS']"
        allow-url
        @files="handleFileUpload"
        @url="handleAnimationUrl"
        @error="errorMessage = $event"
      />

      <!-- Example Section -->
      <div
        class="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 mt-1">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-gray-900 mb-2">
              Try with Example TGS File
            </h4>
            <p class="text-sm text-gray-600 mb-3">
              Test the generator with this beautiful animated country flag from
              our collection:
            </p>
            <div
              class="flex items-center justify-between bg-white p-3 rounded border"
            >
              <div class="flex-1">
                <code class="text-xs text-gray-800 break-all">
                  https://malith-rukshan.github.io/animated-country-flags/tgs/US.tgs
                </code>
              </div>
              <button
                @click="loadExampleTGS"
                class="ml-3 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Load Example
              </button>
            </div>
            <div class="mt-2 flex items-center text-xs text-gray-500">
              <span>✨ Source: </span>
              <a
                href="https://github.com/Malith-Rukshan/animated-country-flags"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                Beautiful animated country flags in multiple formats for your
                projects! 🚀
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animation Player Section -->
    <div v-else class="space-y-6">
      <!-- Animation Info Bar -->
      <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div class="flex items-center space-x-3">
          <CirclePlayIcon class="w-5 h-5 text-gray-600" />
          <div>
            <p class="text-sm font-medium text-gray-900">
              {{ animationFile.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatFileSize(animationFile.size) }} •
              {{ totalFrames }} frames • {{ formatDuration(duration) }}
            </p>
          </div>
        </div>
        <button
          @click="resetAnimation"
          class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Lottie Player -->
      <LottiePlayer
        :animation-data="animationData"
        @loaded="handleAnimationLoaded"
        @frame-captured="handleFrameCapture"
        @error="errorMessage = $event"
      />

      <!-- Captured Frames -->
      <div v-if="capturedFrames.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">
            Captured Frames ({{ capturedFrames.length }})
          </h3>
          <div class="flex items-center space-x-2">
            <button
              @click="selectAllFrames"
              class="text-sm text-blue-600 hover:underline"
            >
              Select All
            </button>
            <span class="text-gray-400">•</span>
            <button
              @click="deselectAllFrames"
              class="text-sm text-blue-600 hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>

        <!-- Frames Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="frame in capturedFrames"
            :key="frame.id"
            class="relative group"
          >
            <div
              @click="toggleFrameSelection(frame.id)"
              :class="[
                'relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200',
                frame.selected
                  ? 'ring-2 ring-blue-600 transform scale-95'
                  : 'hover:ring-2 hover:ring-gray-300',
              ]"
            >
              <img
                :src="frame.thumbnail"
                :alt="`Frame ${frame.frame}`"
                class="w-full h-auto"
              />

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div
                  class="absolute bottom-2 left-2 right-2 flex items-center justify-between"
                >
                  <span class="text-xs text-white font-medium">
                    Frame {{ frame.frame }}
                  </span>
                  <button
                    @click.stop="removeFrame(frame.id)"
                    class="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <TrashIcon class="w-3 h-3" />
                  </button>
                </div>
              </div>

              <!-- Selection indicator -->
              <div
                v-if="frame.selected"
                class="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Export Options -->
        <div class="mt-6 p-6 bg-gray-50 rounded-lg space-y-4">
          <h4 class="text-base font-medium text-gray-900">Export Options</h4>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Format -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                v-model="exportOptions.format"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <!-- Quality -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Quality ({{ exportOptions.quality }}%)
              </label>
              <input
                v-model.number="exportOptions.quality"
                type="range"
                min="10"
                max="100"
                step="10"
                class="w-full"
              />
            </div>

            <!-- Background -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Background
              </label>
              <select
                v-model="exportOptions.background"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="transparent">Transparent</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="checkerboard">Checkerboard</option>
              </select>
            </div>
          </div>

          <!-- Export buttons -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="exportSelectedFrames"
              :disabled="selectedFrames.length === 0 || isExporting"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              <DownloadIcon class="w-4 h-4" />
              Export Selected ({{ selectedFrames.length }})
            </button>
            <button
              @click="exportAllFrames"
              :disabled="capturedFrames.length === 0 || isExporting"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
            >
              <DownloadIcon class="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <Transition name="fade">
      <div
        v-if="errorMessage"
        class="p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CirclePlayIcon,
  XIcon,
  CheckIcon,
  TrashIcon,
  DownloadIcon,
} from "lucide-vue-next";
import pako from "pako";
import DropZone from "@/components/common/DropZone.vue";
import LottiePlayer from "./LottiePlayer.vue";
import {
  formatFileSize,
  formatDuration,
  downloadMultipleFiles,
  generateFileName,
} from "@/utils/fileHelpers";
import { canvasToBlob, createCheckerboardCanvas } from "@/utils/canvas";
import type { LottieFrame, ExportOptions } from "@/types";

const animationFile = ref<File | null>(null);
const animationData = ref<any>(null);
const totalFrames = ref(0);
const duration = ref(0);
const capturedFrames = ref<LottieFrame[]>([]);
const errorMessage = ref("");
const isExporting = ref(false);

const exportOptions = ref<ExportOptions>({
  format: "png",
  quality: 90,
  background: "transparent",
});

const selectedFrames = computed(() =>
  capturedFrames.value.filter((frame) => frame.selected),
);

async function handleFileUpload(files: File[]) {
  const file = files[0];
  animationFile.value = file;
  errorMessage.value = "";

  try {
    let data: any;

    if (file.name.endsWith(".tgs")) {
      // Handle TGS (gzipped Lottie)
      const arrayBuffer = await file.arrayBuffer();
      const inflated = pako.inflate(new Uint8Array(arrayBuffer));
      const text = new TextDecoder().decode(inflated);
      data = JSON.parse(text);
    } else {
      // Handle regular JSON Lottie
      const text = await file.text();
      data = JSON.parse(text);
    }

    animationData.value = data;
  } catch (error) {
    errorMessage.value = "Failed to parse animation file";
    console.error(error);
    animationFile.value = null;
  }
}

async function handleAnimationUrl(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const contentType = response.headers.get("content-type");
    let data: any;

    if (
      url.endsWith(".tgs") ||
      contentType?.includes("application/x-tgsticker")
    ) {
      // Handle TGS
      const arrayBuffer = await response.arrayBuffer();
      const inflated = pako.inflate(new Uint8Array(arrayBuffer));
      const text = new TextDecoder().decode(inflated);
      data = JSON.parse(text);
    } else {
      // Handle JSON
      data = await response.json();
    }

    animationData.value = data;
    animationFile.value = new File(
      [JSON.stringify(data)],
      "animation-from-url.json",
    );
  } catch (error) {
    errorMessage.value = "Failed to load animation from URL";
    console.error(error);
  }
}

function loadExampleTGS() {
  const exampleUrl =
    "https://malith-rukshan.github.io/animated-country-flags/tgs/US.tgs";
  handleAnimationUrl(exampleUrl);
}

function handleAnimationLoaded(frames: number, animDuration: number) {
  totalFrames.value = frames;
  duration.value = animDuration;
}

function handleFrameCapture(frame: LottieFrame) {
  capturedFrames.value.push({
    ...frame,
    selected: false,
  });
}

function toggleFrameSelection(frameId: string) {
  const frame = capturedFrames.value.find((f) => f.id === frameId);
  if (frame) {
    frame.selected = !frame.selected;
  }
}

function selectAllFrames() {
  capturedFrames.value.forEach((frame) => {
    frame.selected = true;
  });
}

function deselectAllFrames() {
  capturedFrames.value.forEach((frame) => {
    frame.selected = false;
  });
}

function removeFrame(frameId: string) {
  capturedFrames.value = capturedFrames.value.filter((f) => f.id !== frameId);
}

function resetAnimation() {
  animationFile.value = null;
  animationData.value = null;
  totalFrames.value = 0;
  duration.value = 0;
  capturedFrames.value = [];
  errorMessage.value = "";
}

async function exportFrames(frames: LottieFrame[]) {
  isExporting.value = true;

  try {
    const files = await Promise.all(
      frames.map(async (frame, index) => {
        // Load the thumbnail image
        const img = new Image();
        img.src = frame.thumbnail;
        await new Promise((resolve) => (img.onload = resolve));

        // Create canvas with proper background
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply background
        if (exportOptions.value.background === "white") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (exportOptions.value.background === "black") {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (exportOptions.value.background === "checkerboard") {
          const checkerboard = createCheckerboardCanvas(
            canvas.width,
            canvas.height,
          );
          ctx.drawImage(checkerboard, 0, 0);
        }

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Convert to blob
        const blob = await canvasToBlob(canvas, exportOptions.value);

        return {
          blob,
          name: generateFileName(
            `lottie_frame_${frame.frame}`,
            index,
            exportOptions.value.format,
          ),
        };
      }),
    );

    await downloadMultipleFiles(files);
  } catch (error) {
    errorMessage.value = "Failed to export frames";
    console.error(error);
  } finally {
    isExporting.value = false;
  }
}

function exportSelectedFrames() {
  exportFrames(selectedFrames.value);
}

function exportAllFrames() {
  exportFrames(capturedFrames.value);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
