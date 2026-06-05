Image Compressor App
A lightweight Angular web application that compresses images directly in the browser — no backend, no uploads, no data leaves your device.

 Features

Client-side compression — uses HTML5 Canvas API to resize and compress images entirely in the browser
Live preview — displays both the original and compressed image side by side
JPEG quality control — compresses to 30% JPEG quality with max width scaling (400px)
Size reporting — logs original vs compressed file size (in KB) and compression percentage to the console
Zero dependencies — no third-party image libraries needed

Tech Stack
LayerTechnologyFrontendAngular 21CompressionHTML5 Canvas APILanguageTypeScript
Getting Started
Prerequisites

Node.js (v18+)
Angular CLI

bashnpm install -g @angular/cli
Installation
bash# Clone the repository
git clone https://github.com/your-username/practice-app.git
cd practice-app

# Install dependencies
npm install

# Start the development server
ng serve
Open your browser and navigate to http://localhost:4200.
Project Structure
src/
└── app/
    ├── app.ts          # Core compression logic (Canvas API)
    ├── app.html        # Upload input & image preview UI
    └── app.css         # Styles
How It Works

User selects an image file via the file input.
The image is read as a Base64 data URL using FileReader.
An off-screen <canvas> element draws the image at a scaled-down max width of 400px.
The canvas exports the result as a JPEG at 0.3 quality (70% reduction).
Original and compressed images are displayed side by side with size stats logged to the console.

Notes

The image-compress-api/ folder contains a placeholder Node.js backend (currently unused).
Compression is lossy — best suited for preview/thumbnail use cases.
