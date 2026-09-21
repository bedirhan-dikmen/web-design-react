# /public/images

Web-delivery assets only.

Nothing lands here by being copied. Each file is a deliberate export from a
source master in `/static_design`, sized against the rules in
`docs/ASSET_MANIFEST.md` and `lib/assets.ts`.

| Directory | Holds |
| --- | --- |
| `hero/` | Art-directed hero background variants (mobile / tablet / 1920 / 2560 / 3840) |
| `product/` | Flat NeXa UI screenshots used inside device frames |
| `sectors/` | "Kimler için?" section photography |

Never place a file from `/reference` here. Those are full-page design mockups
for visual comparison, and at 1024x1536 they cannot serve any production slot.
