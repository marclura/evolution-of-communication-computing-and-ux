# Print PDF Fix Plan

## Problem Summary
The Reveal.js presentation displays correctly on web but when using `?print-pdf`, slides are too large and content is cut off vertically.

## Root Causes
1. Slide dimensions (1920x1200) are too large for standard PDF paper sizes
2. CSS uses viewport-based units (`vh`) that don't work well in print
3. Missing print-specific CSS media queries
4. Incomplete PDF export configuration

## Solution Steps

### Step 1: Adjust Reveal.js Configuration in index.html
**File**: `index.html` (lines 33-45)

**Changes needed**:
- Reduce slide dimensions to PDF-friendly size: `width: 1024, height: 768` (4:3 ratio works better for PDF)
- Add `margin` configuration to ensure content doesn't touch edges
- Add `pdfSeparateFragments: false` to avoid fragment-based page breaks
- Keep `pdfMaxPagesPerSlide: 1` but ensure proper scaling

**New configuration**:
```javascript
Reveal.initialize({
  hash: true,
  slideNumber: 'c/t',
  progress: true,
  plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ],
  minScale: 0.2,
  maxScale: 2.0,
  width: 1024,
  height: 768,
  margin: 0.1,
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1
});
```

### Step 2: Add Print-Specific CSS
**File**: `assets/style.css`

**Add print media queries** to handle viewport units in print mode:

```css
/* Print-specific styles */
@media print {
  /* Override viewport-based heights for print */
  .container-images img {
    min-height: auto !important;
    max-height: 500px !important;
  }
  
  .container-images > img:only-child {
    max-height: 500px !important;
  }
  
  .container-images > figure:only-child > img {
    max-height: 500px !important;
  }
  
  .container-images > img:not(:only-child) {
    max-height: 500px !important;
  }
  
  .container-images > figure:not(:only-child) > img {
    max-height: 500px !important;
  }
  
  /* Ensure proper page breaks */
  .reveal .slides section {
    page-break-after: always;
    page-break-inside: avoid;
  }
  
  /* Reduce font sizes if needed */
  .reveal h1 { font-size: 2.5em; }
  .reveal h2 { font-size: 2em; }
  .reveal h3 { font-size: 1.5em; }
}
```

### Step 3: Add Reveal.js Print Stylesheet
**File**: `index.html` (in the `<head>` section)

Add the print-specific stylesheet from Reveal.js CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/print.css" />
```

This should be added after the theme stylesheet (line 10).

### Step 4: Test and Iterate
1. Open the presentation with `?print-pdf` query parameter
2. Use browser's print preview to check layout
3. Adjust `max-height` values in print CSS if images are still too large
4. If content still overflows, further reduce slide dimensions or adjust margins

## Expected Outcome
- Slides will fit properly on standard PDF paper sizes (A4/Letter)
- Images will be constrained to fit within slide boundaries
- No content will be cut off vertically
- Print output will match the visual presentation quality

## Alternative Approach (if above doesn't work)
If the standard approach doesn't fully resolve the issue, consider:
1. Using Reveal.js's built-in PDF export tool (requires Node.js)
2. Using a headless browser tool like Puppeteer with custom page size
3. Exporting to HTML first, then converting to PDF with proper page sizing

## Files to Modify
1. `index.html` - Update Reveal.js configuration and add print stylesheet
2. `assets/style.css` - Add print media queries
