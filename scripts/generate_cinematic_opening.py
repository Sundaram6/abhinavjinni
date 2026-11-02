import os, sys, math, time
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont

OUTPUT_DIR = 'public/assets/cinematic_opening'
FRAMES_DIR = 'temp_cinematic_frames'
os.makedirs(FRAMES_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 720, 1280
FPS = 30
TOTAL_FRAMES = 186  # ~6.2 seconds

print(f"--- Preparing Base Assets for {TOTAL_FRAMES} frames ({TOTAL_FRAMES/FPS:.2f}s @ {FPS}fps) ---")

# 1. Load source images
start_raw = Image.open(f'{OUTPUT_DIR}/01_START_Shiva_Parvati.png').convert('RGB')
ref1_raw = Image.open(f'{OUTPUT_DIR}/03_REFERENCE_1.png').convert('RGB')
ref2_raw = Image.open(f'{OUTPUT_DIR}/04_REFERENCE_2.png').convert('RGB')
ref3_raw = Image.open(f'{OUTPUT_DIR}/05_REFERENCE_3.png').convert('RGB')
ref4_raw = Image.open(f'{OUTPUT_DIR}/06_REFERENCE_4.png').convert('RGB')
ref5_raw = Image.open(f'{OUTPUT_DIR}/07_REFERENCE_5.png').convert('RGB')
real_end_raw = Image.open(f'{OUTPUT_DIR}/02_END_Abhinav_Mansi_rings.jpg').convert('RGB')

def scale_cover(img, target_w, target_h):
    iw, ih = img.size
    scale = max(target_w / iw, target_h / ih)
    nw, nh = int(math.ceil(iw * scale)), int(math.ceil(ih * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - target_w) // 2
    top = (nh - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))

# Base frames prepared to 720x1280
start_base = scale_cover(start_raw, W, H)
ref1_base = scale_cover(ref1_raw, W, H)
ref2_base = scale_cover(ref2_raw, W, H)
ref3_base = scale_cover(ref3_raw, W, H)
ref4_base = scale_cover(ref4_raw, W, H)
ref5_base = scale_cover(ref5_raw, W, H)

# Build authentic Real End composite
bg_real = real_end_raw.resize((W, H), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(32))
bg_real_arr = np.array(bg_real, dtype=np.float32) * 0.72
bg_real = Image.fromarray(bg_real_arr.astype(np.uint8))

photo_w = 750
photo_h = int(photo_w * (real_end_raw.height / real_end_raw.width))
crisp_real = real_end_raw.resize((photo_w, photo_h), Image.Resampling.LANCZOS)

mask = Image.new('L', (photo_w, photo_h), 255)
feather = 50
for y in range(feather):
    alpha = int(255 * (y / feather))
    for x in range(photo_w):
        mask.putpixel((x, y), alpha)
        mask.putpixel((x, photo_h - 1 - y), alpha)

real_end_base = bg_real.copy()
real_end_base.paste(crisp_real, ((W - photo_w) // 2, (H - photo_h) // 2), mask)

# Convert to float numpy arrays for high-speed blending
np_start = np.array(start_base, dtype=np.float32)
np_ref1 = np.array(ref1_base, dtype=np.float32)
np_ref2 = np.array(ref2_base, dtype=np.float32)
np_ref3 = np.array(ref3_base, dtype=np.float32)
np_ref4 = np.array(ref4_base, dtype=np.float32)
np_ref5 = np.array(ref5_base, dtype=np.float32)
np_real = np.array(real_end_base, dtype=np.float32)

print("Base assets prepared. Generating animation frames...")

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

# Pre-generate petals/particles data for consistency
np.random.seed(42)
N_PETALS = 28
petals = []
for i in range(N_PETALS):
    petals.append({
        'x': np.random.uniform(20, W - 20),
        'y': np.random.uniform(-100, H),
        'speed_y': np.random.uniform(1.2, 3.2),
        'speed_x': np.random.uniform(-0.8, 0.8),
        'size': np.random.uniform(3, 7),
        'alpha': np.random.uniform(60, 160),
        'color': (245, np.random.randint(190, 220), np.random.randint(140, 175))
    })

# Typography font
try:
    font_serif_large = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 44)
    font_serif_small = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 20)
    font_serif_date = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 16)
except Exception:
    font_serif_large = ImageFont.load_default()
    font_serif_small = ImageFont.load_default()
    font_serif_date = ImageFont.load_default()

t_start = time.time()

for f in range(TOTAL_FRAMES):
    time_sec = f / FPS
    
    # 1. Determine keyframe blending weights
    # Sequence timeline:
    # 0 - 24: Start artwork pure with Om radiance pulse
    # 24 - 40: Blend Start -> Ref 1
    # 40 - 58: Blend Ref 1 -> Ref 2
    # 58 - 78: Blend Ref 2 -> Ref 3 (with divine golden light bloom)
    # 78 - 98: Blend Ref 3 -> Ref 4
    # 98 - 118: Blend Ref 4 -> Ref 5
    # 118 - 130: Blend Ref 5 -> REAL END
    # 130 - 165: 100% Authentic photograph pause (rings hero)
    # 165 - 186: Authentic photo + luxury typography overlay
    
    if f < 24:
        blend_np = np_start.copy()
    elif f < 40:
        w = smoothstep(24, 40, f)
        blend_np = (1.0 - w) * np_start + w * np_ref1
    elif f < 58:
        w = smoothstep(40, 58, f)
        blend_np = (1.0 - w) * np_ref1 + w * np_ref2
    elif f < 78:
        w = smoothstep(58, 78, f)
        blend_np = (1.0 - w) * np_ref2 + w * np_ref3
    elif f < 98:
        w = smoothstep(78, 98, f)
        blend_np = (1.0 - w) * np_ref3 + w * np_ref4
    elif f < 118:
        w = smoothstep(98, 118, f)
        blend_np = (1.0 - w) * np_ref4 + w * np_ref5
    elif f < 130:
        w = smoothstep(118, 130, f)
        blend_np = (1.0 - w) * np_ref5 + w * np_real
    else:
        # 100% Authentic original photograph!
        blend_np = np_real.copy()

    # 2. Golden Om mandala glow (frames 0 to 45)
    if f < 45:
        # Center of Om mandala is approximately (360, 360)
        pulse = 0.5 + 0.5 * math.sin(f * 0.18)
        glow_intensity = (1.0 - f / 45.0) * pulse * 45.0
        # Add soft radial gold
        y_grid, x_grid = np.ogrid[:H, :W]
        dist_sq = (x_grid - 360)**2 + (y_grid - 360)**2
        radius = 180.0
        mask_glow = np.clip(1.0 - np.sqrt(dist_sq) / radius, 0.0, 1.0)
        mask_glow = mask_glow[:, :, np.newaxis]
        gold_color = np.array([255, 215, 120], dtype=np.float32)
        blend_np += mask_glow * (gold_color - blend_np) * (glow_intensity / 100.0)

    # 3. Sacred light bloom during posture reframing (frames 58 to 86)
    if 58 <= f <= 86:
        bloom_factor = math.sin((f - 58) / (86 - 58) * math.pi)
        # Center around fingertips/rings (360, 640)
        y_grid, x_grid = np.ogrid[:H, :W]
        dist_sq = (x_grid - 360)**2 + (y_grid - 640)**2
        radius = 240.0
        mask_bloom = np.clip(1.0 - np.sqrt(dist_sq) / radius, 0.0, 1.0)
        mask_bloom = mask_bloom[:, :, np.newaxis]
        bloom_color = np.array([255, 235, 180], dtype=np.float32)
        blend_np += mask_bloom * (bloom_color - blend_np) * (bloom_factor * 0.42)

    # Convert back to PIL Image for camera motion, particles, and typography
    frame_img = Image.fromarray(np.clip(blend_np, 0, 255).astype(np.uint8))

    # 4. Subtle continuous camera push (scale 1.000 to 1.045)
    # Easing for cinematic depth
    zoom_progress = f / (TOTAL_FRAMES - 1)
    scale = 1.000 + 0.045 * (zoom_progress ** 1.3)
    zw = int(W * scale)
    zh = int(H * scale)
    zoomed = frame_img.resize((zw, zh), Image.Resampling.BILINEAR)
    # Center crop back to W, H
    x0 = (zw - W) // 2
    y0 = (zh - H) // 2
    frame_img = zoomed.crop((x0, y0, x0 + W, y0 + H))

    # 5. Golden dust / rose petals (subtle drift during transition, fading out for real photo)
    if f < 135:
        petal_alpha_mul = 1.0 if f < 110 else max(0.0, (135 - f) / 25.0)
        draw = ImageDraw.Draw(frame_img, 'RGBA')
        for p in petals:
            curr_y = (p['y'] + p['speed_y'] * f) % (H + 50) - 20
            curr_x = (p['x'] + math.sin((f + p['size']) * 0.05) * 15) % W
            rad = p['size']
            a = int(p['alpha'] * petal_alpha_mul)
            r, g, b = p['color']
            # Draw glowing petal
            draw.ellipse([curr_x - rad, curr_y - rad, curr_x + rad, curr_y + rad], fill=(r, g, b, a))

    # 6. Luxury typography overlay (frames 165 to 186)
    if f >= 165:
        t_prog = smoothstep(165, 182, f)
        text_alpha = int(255 * t_prog)
        overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_txt = ImageDraw.Draw(overlay)
        
        # Vignette behind text to ensure readability
        vignette_alpha = int(140 * t_prog)
        draw_txt.rectangle([0, H - 360, W, H], fill=(15, 8, 10, vignette_alpha))
        
        # Title "Abhinav & Mansi"
        title = "Abhinav & Mansi"
        bbox1 = draw_txt.textbbox((0, 0), title, font=font_serif_large)
        tw1 = bbox1[2] - bbox1[0]
        tx1 = (W - tw1) // 2
        ty1 = H - 290
        
        # Golden shadow
        draw_txt.text((tx1 + 1, ty1 + 2), title, font=font_serif_large, fill=(0, 0, 0, int(text_alpha * 0.7)))
        draw_txt.text((tx1, ty1), title, font=font_serif_large, fill=(245, 222, 170, text_alpha))
        
        # Subtitle "TOGETHER, FOREVER"
        sub = "TOGETHER, FOREVER"
        bbox2 = draw_txt.textbbox((0, 0), sub, font=font_serif_small)
        tw2 = bbox2[2] - bbox2[0]
        tx2 = (W - tw2) // 2
        ty2 = H - 225
        draw_txt.text((tx2, ty2), sub, font=font_serif_small, fill=(255, 248, 235, int(text_alpha * 0.9)))
        
        # Date "03 DECEMBER 2026"
        date_str = "03 DECEMBER 2026"
        bbox3 = draw_txt.textbbox((0, 0), date_str, font=font_serif_date)
        tw3 = bbox3[2] - bbox3[0]
        tx3 = (W - tw3) // 2
        ty3 = H - 185
        draw_txt.text((tx3, ty3), date_str, font=font_serif_date, fill=(212, 175, 55, int(text_alpha * 0.85)))
        
        # Merge overlay
        frame_img = Image.alpha_composite(frame_img.convert('RGBA'), overlay).convert('RGB')

    # Save frame
    frame_path = f'{FRAMES_DIR}/frame_{f:04d}.jpg'
    frame_img.save(frame_path, quality=94)

print(f"Generated all {TOTAL_FRAMES} frames in {time.time() - t_start:.2f}s!")
