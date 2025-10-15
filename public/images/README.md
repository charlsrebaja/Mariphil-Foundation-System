# Images Directory

This directory is for storing local images used throughout the website.

## Directory Structure

```
public/images/
├── hero/          # Hero section background images
├── projects/      # Project images
├── news/          # News article images
├── team/          # Team member photos
├── gallery/       # General gallery images
└── logo/          # Logo and branding assets
```

## Usage in Components

To use images from this directory in your components:

```tsx
import Image from 'next/image';

// Example 1: Using static import (recommended for critical images)
<Image 
  src="/images/logo/mariphil-logo.png" 
  alt="Mariphil Foundation Logo"
  width={200}
  height={100}
/>

// Example 2: Dynamic path
<Image 
  src={`/images/projects/${project.image}`}
  alt={project.title}
  fill
  className="object-cover"
/>
```

## Image Guidelines

- **Format**: Use WebP for modern browsers, with JPG/PNG fallbacks
- **Size**: Optimize images before uploading
  - Hero images: 1920x1080px
  - Project/News: 800x600px
  - Thumbnails: 400x300px
- **Naming**: Use lowercase with hyphens (e.g., `education-program-2024.jpg`)
- **Optimization**: Use tools like TinyPNG or Squoosh before uploading

## Note

Images in the `public` folder are served at the root level. For example:
- File: `public/images/logo/mariphil.png`
- URL: `/images/logo/mariphil.png`