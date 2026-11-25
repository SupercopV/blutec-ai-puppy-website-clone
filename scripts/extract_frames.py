import cv2
import os

video_path = r"C:/Users/lenovo/.gemini/antigravity/brain/c80489f5-acc8-4589-bac1-a1bce88e9cd8/.user_uploaded/media_1795550453329_71e01f77.mp4"
output_dir = r"c:\Users\lenovo\Desktop\Blutec Ai\scripts\video_frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps if fps > 0 else 0
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Video metadata: {width}x{height}, {fps:.2f} FPS, {total_frames} frames, {duration:.2f}s")

# Extract 1 frame per 0.5s or at key points
step = max(1, int(fps * 0.75)) # roughly every 0.75 seconds
count = 0
extracted = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    if count % step == 0:
        time_sec = count / fps
        frame_name = f"frame_{extracted:03d}_{time_sec:.2f}s.jpg"
        out_path = os.path.join(output_dir, frame_name)
        cv2.imwrite(out_path, frame)
        extracted += 1
        print(f"Extracted {frame_name}")
    count += 1

cap.release()
print(f"Done. Extracted {extracted} frames.")
