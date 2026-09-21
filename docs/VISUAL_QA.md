# Visual QA and Acceptance Criteria

## Required viewport matrix

Verify the homepage hero at least at:

- 1366 × 768
- 1440 × 900
- 1920 × 1080
- 2560 × 1440
- 3840 × 2160
- 1024 × 768
- 768 × 1024
- 390 × 844

## Acceptance criteria

The Phase 1 hero is accepted only when all of the following are true:

- No production component imports a full-page reference screenshot.
- The desktop hero fills the intended first viewport without exposing accidental white gaps inside the hero.
- The white next section begins cleanly after the hero.
- Main subjects are not awkwardly cropped at 16:9 desktop sizes.
- Device/product UI remains visibly sharp at 1080p and 1440p.
- At 4K, the composition does not enlarge small UI assets past their safe size.
- Headline and CTA text are real DOM text and remain crisp at any zoom level.
- Logos and iconography are vector where source vectors exist.
- No image is stretched out of aspect ratio.
- Responsive layout does not rely on one desktop screenshot crop for mobile.
- No horizontal overflow occurs.
- The hero does not introduce obvious layout shift while loading.

## Visual verification procedure

Before declaring completion:

1. Run the application in production-like mode when practical.
2. Capture screenshots for the required viewport matrix using an existing browser/testing workflow. If Playwright already exists, use it. Do not add a large new test dependency solely for this step without approval.
3. Compare the hero against the approved reference for hierarchy, subject placement, spacing, and color/contrast.
4. Zoom or inspect the product/device UI at 100% CSS scale. Confirm that small text is not visibly smeared by upscaling.
5. Inspect browser network output or generated markup enough to confirm appropriately sized responsive images are being selected.

## Required completion report

Return:

```text
Changed files:
- ...

Asset decisions:
- source -> role -> max rendered size

Viewports verified:
- ...

Known differences from reference:
- ...

Missing assets or follow-up work:
- ...
```

Do not use “looks good” as verification. Report concrete checks.
