# Valentine's Invitation - Setup Guide 💕

## How to Add Your Music and Photos

### 🎵 Adding Background Music

#### Option 1: Using Your MP3 File (Recommended for Best Quality)

1. **Prepare your music file:**
   - Make sure it's in MP3 format
   - Recommended: Keep file size under 10MB for faster loading
   - Name it something simple like `valentine-song.mp3`

2. **For deployment platforms:**

   **StackBlitz:**
   - Upload your MP3 to the `public` folder
   - Change line 30 in the code from:
     ```jsx
     <source src="/your-music-file.mp3" type="audio/mpeg" />
     ```
     to:
     ```jsx
     <source src="/valentine-song.mp3" type="audio/mpeg" />
     ```

   **Netlify/Vercel:**
   - Place your MP3 in the `public` folder
   - Update the src path as above

   **CodePen:**
   - Upload your MP3 to a file hosting service (Dropbox, Google Drive with public link, or use a service like Cloudinary)
   - Get the direct link to the file
   - Update the src to the full URL:
     ```jsx
     <source src="https://your-url.com/song.mp3" type="audio/mpeg" />
     ```

#### Option 2: Using a Hosted URL

If you have your song on a cloud service:
- Get the direct download link (must end in .mp3)
- Replace the src in line 30 with your URL

**Popular hosting options:**
- **Dropbox**: Upload → Share → Change `dl=0` to `dl=1` in the URL
- **Google Drive**: Not recommended (hard to get direct links)
- **Cloudinary** (free): Upload and get direct link

---

### 📸 Adding Your Photos

Your photos appear as beautiful blurred backgrounds at each stage. Here's how to add them:

#### Step 1: Prepare Your Photos

1. **Choose 6 photos** (one for each stage):
   - Landing page (your favorite couple photo)
   - Trivia stage (a fun memory)
   - Reveal stage (an intimate moment)
   - Countdown stage (a romantic setting)
   - RSVP stage (looking at camera together)
   - Celebration stage (pure joy/happiness)

2. **Optimize photos:**
   - Resize to 1200px wide (smaller = faster loading)
   - Use JPEG format
   - Use free tools like [TinyPNG.com](https://tinypng.com) to compress

#### Step 2: Upload Photos

**Easy Method - Use Free Image Hosting:**

1. Go to [Imgur.com](https://imgur.com) or [ImgBB.com](https://imgbb.com)
2. Upload your 6 photos
3. Get the direct image URL for each (right-click → "Copy image address")
4. Replace the URLs in lines 18-24 of the code:

```jsx
const photos = {
  landing: 'YOUR_PHOTO_1_URL_HERE',
  trivia: 'YOUR_PHOTO_2_URL_HERE',
  reveal: 'YOUR_PHOTO_3_URL_HERE',
  countdown: 'YOUR_PHOTO_4_URL_HERE',
  rsvp: 'YOUR_PHOTO_5_URL_HERE',
  celebration: 'YOUR_PHOTO_6_URL_HERE'
};
```

**Advanced Method - Include in Project:**

If using StackBlitz/Netlify/Vercel:
1. Create an `images` folder in your project
2. Add your 6 photos with simple names: `photo1.jpg`, `photo2.jpg`, etc.
3. Update the code:

```jsx
const photos = {
  landing: '/images/photo1.jpg',
  trivia: '/images/photo2.jpg',
  reveal: '/images/photo3.jpg',
  countdown: '/images/photo4.jpg',
  rsvp: '/images/photo5.jpg',
  celebration: '/images/photo6.jpg'
};
```

---

### ⚠️ Important Notes

**About Autoplay:**
- Modern browsers (Chrome, Safari, Firefox) often block autoplay with sound
- The music will try to play automatically, but if blocked:
  - User just needs to click anywhere on the page to start it
  - The mute button in the top-right corner lets them control it

**Photo Tips:**
- Photos are blurred and dimmed for background effect
- Choose photos with good lighting and your faces visible
- Horizontal/landscape photos work best
- The same photo can be used multiple times if you don't have 6

**File Paths:**
- Always use forward slashes `/` in paths
- Relative paths start with `/` (e.g., `/music.mp3`)
- Full URLs start with `https://`

---

### 🎨 Customization Checklist

- [ ] Add your 6 photos (lines 18-24)
- [ ] Add your music file (line 30)
- [ ] Change trivia question and answer (line 63)
- [ ] Update hidden love message (lines 225-230)
- [ ] Update "What's Next?" details (lines 355-360)

---

### 🆘 Troubleshooting

**Music not playing?**
- Check if file path is correct
- Make sure the file is in MP3 format
- Try clicking anywhere on the page (browsers block autoplay)
- Check browser console for errors (F12)

**Photos not showing?**
- Verify URLs are direct image links (should end in .jpg or .png)
- Test URL by pasting in browser - should show just the image
- Make sure images are publicly accessible

**Need help?**
- Test each URL individually in your browser
- Check file names match exactly (case-sensitive!)
- Use browser Developer Tools (F12) to see errors

---

### 📱 Testing

Before sending to your Valentine:
1. Test on your phone (different screen size)
2. Test with sound on/off
3. Try clicking through all stages
4. Verify all photos load
5. Check trivia answer works

---

Good luck! 💕 Your Valentine is going to love this!
