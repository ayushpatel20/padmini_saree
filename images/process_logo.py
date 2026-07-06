from PIL import Image, ImageDraw

def process_logo():
    # Load the logo image
    img_path = r"C:\Users\shukl\.gemini\antigravity-ide\brain\f377c0ea-fc29-42c0-8be4-752e1a6ebbf7\media__1782899236574.jpg"
    img = Image.open(img_path).convert("RGBA")
    
    width, height = img.size
    print(f"Original Logo size: {width}x{height}")
    
    # We want to create a circular mask
    # The circle should be centered and span almost the height of the image
    center_x = width // 2 + 10  # Slight offset if needed
    center_y = height // 2
    
    # Calculate radius: the golden circle spans almost the full height
    radius = min(width, height) // 2 - 5
    
    # Create the mask
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((center_x - radius, center_y - radius, center_x + radius, center_y + radius), fill=255)
    
    # Apply mask
    output = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    
    # Crop to the bounding box of the circle to remove empty space
    cropped = output.crop((center_x - radius, center_y - radius, center_x + radius, center_y + radius))
    
    # Save the output
    save_path = r"c:\Users\shukl\OneDrive\Documents\Akaya Project\images\logo_cutout.png"
    cropped.save(save_path, "PNG")
    print(f"Processed logo saved to: {save_path}")

if __name__ == "__main__":
    process_logo()
