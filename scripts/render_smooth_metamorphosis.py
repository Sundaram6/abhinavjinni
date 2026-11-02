import os, sys, math, time
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont

OUTPUT_DIR = 'public/assets/cinematic_opening'
FRAMES_DIR = 'temp_smooth_frames'
os.makedirs(FRAMES_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 720, 1280
FPS = 30
TOTAL_FRAMES = 186  # 6.2 seconds

print(f"--- Rendering Direct Smooth Sacred Metamorphosis ({TOTAL_FRAMES} frames @ {FPS}fps) ---")

# 1. Load the TWO authentic images (NO intermediary storyboard slide jumps!)
start_raw = Image.open(f'{OUTPUT_DIR}/01_START_Shiva_Parvati.png').convert('RGB')
end_raw = Image.open(f'{OUTPUT_DIR}/02_END_Abhinav_Mansi_rings.jpg').convert('RGB')

def scale_cover(img, target_w, target_h):
    iw, ih = img.size
    scale = max(target_w / iw, target_h / ih)
    nw, nh = int(math.ceil(iw * scale)), int(math.ceil(ih * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - target_w) // 2
    top = (nh - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))

# Base Start Artwork: fitted to 720x1280
start_base = scale_cover(start_raw, W, H)

# Base End Photograph: high-res photo centered with feathered ambient bokeh background
bg_real = end_raw.resize((W, H), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(36))
bg_real_arr = np.array(bg_real, dtype=np.float32) * 0.70
bg_real = Image.fromarray(bg_real_arr.astype(np.uint8))

photo_w = 760
photo_h = int(photo_w * (end_raw.height / end_raw.width))
crisp_real = end_raw.resize((photo_w, photo_h), Image.Resampling.LANCZOS)

mask = Image.new('L', (photo_w, photo_h), 255)
feather = 55
for y in range(feather):
    alpha = int(255 * (y / feather))
    for x in range(photo_w):
        mask.putpixel((x, y), alpha)
        mask.putpixel((x, photo_h - 1 - y), alpha)

real_end_base = bg_real.copy()
offset_x = (W - photo_w) // 2
offset_y = (H - photo_h) // 2
real_end_base.paste(crisp_real, (offset_x, offset_y), mask)

# Coordinates of key elements:
# In real_end_base:
# Bride's diamond solitaire ring is at approx (288, offset_y + 90 = 477)
# Groom's band is at approx (488, offset_y + 85 = 472)
# Hands touchpoint / center is approx (360, 620)

np_start = np.array(start_base, dtype=np.float32)
np_end = np.array(real_end_base, dtype=np.float32)

# Create a color-warmed version of start artwork where blue skin is warmed to golden/skin tones
# Identify blue pixels: high B, low R
np_start_warm = np_start.copy()
r_ch, g_ch, b_ch = np_start[:, :, 0], np_start[:, :, 1], np_start[:, :, 2]
blue_mask = (b_ch > r_ch + 20) & (b_ch > 80)
# Shift blue pixels to warm skin tone (higher R, moderate G, lower B)
np_start_warm[blue_mask, 0] = np.clip(np_start[blue_mask, 0] * 1.8 + 40, 0, 255)
np_start_warm[blue_mask, 1] = np.clip(np_start[blue_mask, 1] * 1.1 + 10, 0, 255)
np_start_warm[blue_mask, 2] = np.clip(np_start[blue_mask, 2] * 0.55, 0, 255)

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

# Pre-generate petals/sparkles
np.random.seed(108)
N_PETALS = 32
petals = []
for i in range(N_PETALS):
    petals.append({
        'x': np.random.uniform(20, W - 20),
        'y': np.random.uniform(-100, H),
        'speed_y': np.random.uniform(1.0, 2.8),
        'speed_x': np.random.uniform(-0.6, 0.6),
        'size': np.random.uniform(3, 6),
        'alpha': np.random.uniform(70, 180),
        'color': (np.random.randint(240, 255), np.random.randint(185, 220), np.random.randint(130, 170))
    })

# Load fonts
try:
    font_large = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 44)
    font_small = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 19)
    font_date = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 16)
except Exception:
    font_large = font_small = font_date = ImageFont.load_default()

# Precompute coordinate grids for fast light bloom
y_grid, x_grid = np.ogrid[:H, :W]

t_start = time.time()

for f in range(TOTAL_FRAMES):
    time_sec = f / FPS
    
    # ================= TIMELINE CHOREOGRAPHY =================
    # Frame 0 to 40 (0.0s - 1.33s):
    #   Divine Beginning: Pure Shiva-Parvati artwork, breathing Om mandala glow, swaying petals.
    # Frame 40 to 105 (1.33s - 3.50s):
    #   Sacred Metamorphosis:
    #   - 40 to 65: Shiva's blue hand warms into golden skin tone via np_start_warm
    #   - 55 to 105: Sacred golden light bloom ignites at center touchpoint, expands outward
    #   - 65 to 105: Smooth morphing dissolve into the authentic rings photo under the light bloom
    # Frame 105 to 160 (3.50s - 5.33s):
    #   The Human Union: Light bloom clears to reveal 100% AUTHENTIC original photograph
    #   Diamond solitaire and groom's band sparkle with specular starbursts.
    #   Emotional pause of 1.8 seconds!
    # Frame 160 to 186 (5.33s - 6.20s):
    #   Reveal luxury typography overlay, smooth fade to website hero.
    
    if f < 40:
        # Phase 1: Pure artwork
        curr_frame_np = np_start.copy()
    elif f < 65:
        # Phase 2a: Blue skin warming to human tone
        warm_prog = smoothstep(40, 65, f)
        curr_frame_np = (1.0 - warm_prog) * np_start + warm_prog * np_start_warm
    elif f < 105:
        # Phase 2b: Smooth transformation into the authentic rings photograph
        morph_prog = smoothstep(65, 105, f)
        # Use S-curve interpolation for ultra-smooth transition
        w = 0.5 - 0.5 * math.cos(morph_prog * math.pi)
        curr_frame_np = (1.0 - w) * np_start_warm + w * np_end
    else:
        # Phase 3 & 4: 100% Authentic Original Photograph
        curr_frame_np = np_end.copy()

    # 1. Om Mandala Golden Radiance Pulse (frames 0 to 50)
    if f < 50:
        pulse = 0.5 + 0.5 * math.sin(f * 0.16)
        om_intensity = (1.0 - f / 50.0) * pulse * 40.0
        dist_sq = (x_grid - 360)**2 + (y_grid - 370)**2
        om_mask = np.clip(1.0 - np.sqrt(dist_sq) / 190.0, 0.0, 1.0)[:, :, np.newaxis]
        gold_color = np.array([255, 215, 120], dtype=np.float32)
        curr_frame_np += om_mask * (gold_color - curr_frame_np) * (om_intensity / 100.0)

    # 2. Sacred Divine Light Bloom at Hands Touchpoint (frames 45 to 115)
    # Ignites at (360, 600) and expands smoothly, peaking at frame 80
    if 45 <= f <= 115:
        bloom_factor = math.sin((f - 45) / (115 - 45) * math.pi)
        # Center starts at touchpoint (360, 600) and gently drifts up towards rings (360, 520)
        center_y = 600 - 80 * smoothstep(45, 105, f)
        dist_sq = (x_grid - 360)**2 + (y_grid - center_y)**2
        # Expanding radius
        radius = 160.0 + 220.0 * bloom_factor
        bloom_mask = np.clip(1.0 - np.sqrt(dist_sq) / radius, 0.0, 1.0)
        # Quadratic falloff for soft celestial diffusion
        bloom_mask = (bloom_mask ** 1.6)[:, :, np.newaxis]
        
        # Celestial golden white light
        bloom_color = np.array([255, 240, 195], dtype=np.float32)
        curr_frame_np += bloom_mask * (bloom_color - curr_frame_np) * (bloom_factor * 0.65)

    # Convert to PIL Image for camera motion, ring sparkles, petals, and typography
    frame_img = Image.fromarray(np.clip(curr_frame_np, 0, 255).astype(np.uint8))

    # 3. Continuous Cinematic Camera Push (scale 1.000 to 1.055)
    zoom_progress = f / (TOTAL_FRAMES - 1)
    scale = 1.000 + 0.055 * (zoom_progress ** 1.25)
    zw, zh = int(W * scale), int(H * scale)
    zoomed = frame_img.resize((zw, zh), Image.Resampling.BILINEAR)
    x0 = (zw - W) // 2
    y0 = (zh - H) // 2
    frame_img = zoomed.crop((x0, y0, x0 + W, y0 + H))

    draw = ImageDraw.Draw(frame_img, 'RGBA')

    # 4. Ring Sparkles (frames 85 to 145)
    # Bride's diamond solitaire ring: approx (288, 477)
    # Groom's band: approx (488, 472)
    if 85 <= f <= 145:
        # Bride ring sparkle
        sparkle_t = (f - 85) / 60.0
        sparkle_alpha = math.sin(sparkle_t * math.pi)
        if sparkle_alpha > 0.05:
            bx, by = int(288 * scale - x0), int(477 * scale - y0)
            s_len = int(18 * sparkle_alpha)
            s_col = (255, 255, 240, int(230 * sparkle_alpha))
            # 4-point diamond star
            draw.line([(bx - s_len, by), (bx + s_len, by)], fill=s_col, width=2)
            draw.line([(bx, by - s_len), (bx, by + s_len)], fill=s_col, width=2)
            draw.ellipse([bx - 4, by - 4, bx + 4, by + 4], fill=(255, 250, 220, int(255 * sparkle_alpha)))

        # Groom band gleam (delayed by 10 frames)
        if f >= 95:
            g_t = (f - 95) / 50.0
            g_alpha = math.sin(g_t * math.pi)
            if g_alpha > 0.05:
                gx, gy = int(488 * scale - x0), int(472 * scale - y0)
                g_len = int(14 * g_alpha)
                g_col = (255, 235, 180, int(200 * g_alpha))
                draw.line([(gx - g_len, gy), (gx + g_len, gy)], fill=g_col, width=2)
                draw.line([(gx, gy - g_len), (gx, gy + g_len)], fill=g_col, width=2)
                draw.ellipse([gx - 3, gy - 3, gx + 3, gy + 3], fill=(255, 240, 200, int(240 * g_alpha)))

    # 5. Floating Golden Dust & Rose Petals (drifting continuously)
    petal_alpha_mul = 1.0 if f < 115 else max(0.0, (140 - f) / 25.0)
    for p in petals:
        curr_y = (p['y'] + p['speed_y'] * f) % (H + 40) - 20
        curr_x = (p['x'] + math.sin((f + p['size']) * 0.04) * 12) % W
        rad = p['size']
        a = int(p['alpha'] * petal_alpha_mul)
        r, g, b = p['color']
        draw.ellipse([curr_x - rad, curr_y - rad, curr_x + rad, curr_y + rad], fill=(r, g, b, a))

    # 6. Luxury Typography Overlay (frames 158 to 186)
    if f >= 158:
        t_prog = smoothstep(158, 178, f)
        text_alpha = int(255 * t_prog)
        overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_txt = ImageDraw.Draw(overlay)
        
        # Soft dark gradient at bottom for contrast
        vignette_alpha = int(140 * t_prog)
        draw_txt.rectangle([0, H - 360, W, H], fill=(12, 6, 8, vignette_alpha))
        
        # Title "Abhinav & Mansi"
        title = "Abhinav & Mansi"
        bbox1 = draw_txt.textbbox((0, 0), title, font=font_large)
        tw1 = bbox1[2] - bbox1[0]
        tx1 = (W - tw1) // 2
        ty1 = H - 290
        draw_txt.text((tx1 + 1, ty1 + 2), title, font=font_large, fill=(0, 0, 0, int(text_alpha * 0.7)))
        draw_txt.text((tx1, ty1), title, font=font_large, fill=(245, 222, 170, text_alpha))
        
        # Subtitle "TOGETHER, FOREVER"
        sub = "TOGETHER, FOREVER"
        bbox2 = draw_txt.textbbox((0, 0), sub, font=font_small)
        tw2 = bbox2[2] - bbox2[0]
        tx2 = (W - tw2) // 2
        ty2 = H - 225
        draw_txt.text((tx2, ty2), sub, font=font_small, fill=(255, 248, 235, int(text_alpha * 0.9)))
        
        # Date "03 DECEMBER 2026"
        date_str = "03 DECEMBER 2026"
        bbox3 = draw_txt.textbbox((0, 0), date_str, font=font_date)
        tw3 = bbox3[2] - bbox3[0]
        tx3 = (W - tw3) // 2
        ty3 = H - 185
        draw_txt.text((tx3, ty3), date_str, font=font_date, fill=(212, 175, 55, int(text_alpha * 0.85)))
        
        frame_img = Image.alpha_composite(frame_img.convert('RGBA'), overlay).convert('RGB')

    # Save frame
    frame_path = f'{FRAMES_DIR}/frame_{f:04d}.jpg'
    frame_img.save(frame_path, quality=94)

print(f"Generated all {TOTAL_FRAMES} frames in {time.time() - t_start:.2f}s!")
