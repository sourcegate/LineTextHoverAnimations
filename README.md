# GRANTBOT WISHES - AI Automation Dreams

Share your AI automation wishes and see what others dream of automating in their business and personal workflows. Built with beautiful terminal-like hover animations and an interactive wish submission system.

![GRANTBOT WISHES Screenshot](https://via.placeholder.com/800x400/1a1a1a/8adcc0?text=GRANTBOT+WISHES)

## ✨ Features

- **Interactive Wish Submission**: Submit your AI automation dreams with an animated typing effect
- **Smart Categorization**: Automatic category detection based on wish content
- **Terminal Aesthetics**: Beautiful hover animations with a cyberpunk terminal feel
- **Live Updates**: See wishes appear in real-time with smooth animations
- **Load More**: Progressive loading of automation wishes
- **Like System**: Thumbs up your favorite automation ideas

## 🚀 Quick Start

### Local Development

```bash
# Run local development server
npm run dev
# or
npx live-server --port=3000
```

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
# For first deployment
vercel

# For production deployment
npm run deploy
# or
vercel --prod
```

3. **One-click Deploy**: 
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/grantbot-wishes)

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Animations**: GSAP (GreenSock Animation Platform)
- **Text Effects**: SplitType library
- **Deployment**: Vercel (optimized static site)
- **Styling**: Custom CSS with terminal/cyberpunk aesthetics

## 📁 Project Structure

```
LineTextHoverAnimations/
├── index.html              # Main application file
├── css/
│   └── base.css            # Core styles and animations
├── js/
│   ├── effect-2/           # Main animation scripts
│   ├── gsap.min.js         # GSAP animation library
│   └── split-type.min.js   # Text splitting library
├── img/
│   ├── grantbotlogo.svg    # GrantBot logo
│   └── bg.jpg              # Background image
├── vid/
│   └── bg-animation.mp4    # Background video
├── vercel.json             # Vercel deployment config
├── package.json            # Project configuration
└── README.md               # This file
```

## 🎨 Customization

### Adding New Wish Categories
Edit the `categoryKeywords` object in `index.html` to add new categories:

```javascript
const categoryKeywords = {
  'Your Category': ['keyword1', 'keyword2', 'keyword3'],
  // ... existing categories
};
```

### Modifying Typing Animation
Update the `automationIdeas` array to change the placeholder text:

```javascript
const automationIdeas = [
  "Your custom automation idea...",
  // ... existing ideas
];
```

## 🚀 Deployment Options

### Vercel (Recommended)
- Automatic deployments from Git
- Global CDN
- Zero configuration
- Custom domains

### Other Platforms
- **Netlify**: Drag and drop the project folder
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Firebase Hosting**: Use Firebase CLI to deploy

## 📝 License

[MIT](LICENSE) - Feel free to use this project for your own automation wish collection!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Credits

- **Original Terminal Animations**: Based on effects from [Codrops](https://tympanus.net/codrops/)
- **Inspiration**: Terminal aesthetics from [jeandawson.com](https://www.jeandawson.com/)
- **Built with**: ❤️ by the GrantBot team





