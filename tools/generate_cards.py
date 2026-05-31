from PIL import Image
import os

PAIRS = [
    ("img/patronaje-portada.jpg", "img/patronaje-portada-card.jpg"),
    ("img/diseño-portada.jpg", "img/diseño-portada-card.jpg"),
]

TARGET_W = 900
TARGET_H = 540


def center_crop_to_aspect(img, target_w, target_h):
    src_w, src_h = img.size
    target_ar = target_w / target_h
    src_ar = src_w / src_h

    if src_ar > target_ar:
        # source is wider -> crop sides
        new_w = int(target_ar * src_h)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        # source is taller -> crop top/bottom
        new_h = int(src_w / target_ar)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))
    return img


def generate():
    for src, dst in PAIRS:
        if not os.path.exists(src):
            print(f"SKIP: source not found: {src}")
            continue

        with Image.open(src) as im:
            im = im.convert("RGB")
            im = center_crop_to_aspect(im, TARGET_W, TARGET_H)
            im = im.resize((TARGET_W, TARGET_H), Image.LANCZOS)
            # Ensure output dir exists
            out_dir = os.path.dirname(dst)
            if out_dir and not os.path.exists(out_dir):
                os.makedirs(out_dir, exist_ok=True)
            im.save(dst, format="JPEG", quality=85)
            print(f"WROTE: {dst}")


if __name__ == '__main__':
    generate()
