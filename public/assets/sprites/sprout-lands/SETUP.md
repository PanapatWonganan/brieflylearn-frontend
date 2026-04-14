# Sprout Lands Asset Setup

After purchasing and downloading the Sprout Lands asset pack from
https://cupnooble.itch.io/sprout-lands-asset-pack, extract and organize
the files into this directory as follows:

```
sprout-lands/
  crops/
    crops.png           <- Main crop sprite sheet (all growth stages)
  characters/
    basic-character.png  <- Character sprite sheet (idle, walk, water, etc.)
  tiles/
    grass.png           <- Grass tile sprites
  trees/
    trees.png           <- Tree sprites (optional)
  objects/
    objects.png         <- Decorative objects (optional)
  animals/
    animals.png         <- Animal sprites (optional)
```

## After placing files

The sprite coordinates in `src/lib/garden/spriteConfig.ts` are placeholder
estimates. Open the actual sprite sheet PNGs and verify/adjust:

1. `x`, `y` coordinates for each crop row
2. `width`, `height` of each frame (likely 16x16 or 32x32)
3. Number of growth stages per crop type
4. Character animation frame positions

Use any sprite sheet viewer or open the PNG in an image editor with a grid
overlay set to the tile size (16px or 32px) to identify exact coordinates.
