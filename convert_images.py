import os
import fitz # PyMuPDF
from PIL import Image

ASSETS_DIR = r"c:\Users\Josh\Desktop\JoshAguiluz-Portfolio\src\assets"

files_to_convert = [
    ("phpBasics.pdf", "phpBasics.webp"),
    ("comptiaReal.png", "comptiaReal.webp"),
    ("ccna.pdf", "ccna.webp"),
    ("aws.pdf", "aws.webp"),
    ("profile_professional.png", "profile_professional.webp"),
    ("casualProf.jpg", "casualProf.webp"),
]

print("Starting conversions...")
for src_name, dest_name in files_to_convert:
    src_path = os.path.join(ASSETS_DIR, src_name)
    if not os.path.exists(src_path):
        if src_name == "916057e4d784a6f22523da6d03e95bf8726dd99b.png":
            src_path = os.path.join(ASSETS_DIR, "comptia.png")
            
    dest_path = os.path.join(ASSETS_DIR, dest_name)
    
    if not os.path.exists(src_path):
        print(f"Skipping {src_name} - file not found!")
        continue
        
    print(f"Converting {src_name} -> {dest_name}...")
    try:
        if src_path.lower().endswith(".pdf"):
            # open doc
            doc = fitz.open(src_path)
            page = doc.load_page(0) # first page
            pix = page.get_pixmap(dpi=150) # 150 DPI for good quality thumbnail
            
            # create PIL image
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            img.save(dest_path, "webp", quality=90)
            print(f"  -> SUCCESS")
            
        elif src_path.lower().endswith((".png", ".jpg", ".jpeg")):
            img = Image.open(src_path).convert("RGB")
            img.save(dest_path, "webp", quality=90)
            print(f"  -> SUCCESS")
            
    except Exception as e:
        print(f"  -> FAILED: {str(e)}")

print("Done!")
