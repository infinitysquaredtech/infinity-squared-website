# ∞² Infinity Squared Technologies Website

Official website for Infinity Squared Technologies - delivering AR/VR development, AI/ML solutions, and web services.

## 🌐 Live Website

[https://infinitysquaredtech.com](https://infinitysquaredtech.com)

## 📋 Table of Contents

- [Overview](#dart-overview)
- [Features](#sparkles-features)
- [Project Structure](#file-folder-project-structure)
- [Prerequisites](#wrench-prerequisites)
- [Getting Started](#rocket-getting-started)
- [Development](#computer-development)
- [Build](#building-construction-build)
- [Deployment](#ship-deployment)
- [Technologies Used](#hammer-and-wrench-technologies-used)
- [License](#memo-license)
- [Contributing](#handshake-contributing)
- [Important Notes](#mag-important-notes)

## 🎯 Overview

Infinity Squared Technologies website showcases innovative AR/VR experiences, AI/ML solutions, and web development services. The site features interactive 3D models, immersive portfolio demos, and comprehensive service offerings.

## ✨ Features

- **Interactive 3D Models** - Three.js powered 3D visualizations
- **AR/VR Demos** - Image tracking and portal experiences
- **Virtual Tours** - 360° interactive property tours
- **Responsive Design** - Mobile-first responsive layout
- **Fast Loading** - Optimized assets and minified code
- **SEO Optimized** - Comprehensive meta tags and sitemap

## 📁 Project Structure

```
.
├── .babelrc                # Babel configuration
├── .gitignore              # Git ignore rules
├── app.js                  # Main application entry point (source)
├── main.css                # Main stylesheet (source)
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── favicon.ico             # Website favicon
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── schema.json             # Structured data schema
├── CNAME                   # Custom domain configuration
├── components/             # React/JS components (source)
│   ├── About.min.js
│   ├── Clients.min.js
│   ├── Contact.min.js
│   ├── Footer.min.js
│   ├── Header.min.js
│   ├── Hero.min.js
│   ├── PortfolioScroller.min.js
│   ├── ScrollToTop.min.js
│   ├── Services.min.js
│   └── ThreeModel.min.js
├── pages/                  # Page components (source)
│   ├── AIMLPage.min.js
│   ├── ARVRPage.min.js
│   └── WebDevPage.min.js
├── utils/                  # Utility functions (source)
│   ├── dragHandler.min.js
│   └── router.min.js
├── lib/                    # Compiled/built files (generated)
│   ├── app.min.js
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
│       ├── main.min.css
│       └── tail.min.css
├── asset/                  # Static assets
│   ├── clients/
│   ├── images/
│   ├── logos/
│   └── video/
├── tours/                  # Virtual tour projects
│   ├── ambit/
│   ├── demo/
│   └── rajshree/
└── webar-demos/            # WebAR demonstration projects
    ├── multi-img/
    ├── portal-img/
    └── single-img/
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)

### Check Your Installations

```bash
node --version
npm --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/infinitysquaredtech/infinitysquaredtech.github.io.git
cd infinitysquaredtech.github.io
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Babel (for JS transpilation and React JSX support)
- Tailwind CSS (for utility-first styling)
- PostCSS & cssnano (for CSS processing and minification)
- npm-run-all (for parallel script execution)

### 3. Start Development

```bash
npm run watch
```

This command will:
- Watch for changes in source files
- Automatically rebuild on file changes
- Compile JavaScript with Babel
- Generate Tailwind CSS
- Output files to the `lib/` directory

### 4. Open the Website

Open `index.html` in your web browser or use a local development server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server -p 8000
```

Then navigate to: `http://localhost:8000`

## 💻 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run watch` | Start development mode with file watching (all files) |
| `npm run build` | Build all components for production |
| `npm run clean` | Remove all built files from lib/ directory |
| `npm run build:app` | Build main application file (app.js → lib/app.min.js) |
| `npm run build:components` | Build all components |
| `npm run build:pages` | Build all page components |
| `npm run build:utils` | Build utility functions |
| `npm run build:tailwind` | Build Tailwind CSS (lib/styles/tail.min.css) |
| `npm run build:styles` | Build and minify main CSS (main.css → lib/styles/main.min.css) |
| `npm run watch:app` | Watch and rebuild app.js |
| `npm run watch:components` | Watch and rebuild components |
| `npm run watch:pages` | Watch and rebuild pages |
| `npm run watch:utils` | Watch and rebuild utils |
| `npm run watch:tailwind` | Watch and rebuild Tailwind CSS |
| `npm run watch:styles` | Watch and rebuild main CSS |

### Development Workflow

1. **Make Changes** - Edit source files:
   - `app.js` - Main application logic
   - `main.css` - Custom CSS styles
   - `components/` - React components
   - `pages/` - Page-level components
   - `utils/` - Utility functions
2. **Watch Rebuild** - The watch script automatically rebuilds changed files
3. **Refresh Browser** - Reload your browser to see changes
4. **Test** - Verify functionality across different browsers and devices

### File Organization

- **Source Files**: Edit files in root-level directories:
  - `app.js` - Main application entry point
  - `main.css` - Main stylesheet with custom styles
  - `components/`, `pages/`, `utils/` - Component and utility modules
- **Built Files**: Generated files in `lib/` directory (do not edit directly):
  - `lib/app.min.js` - Compiled application
  - `lib/styles/main.min.css` - Minified main styles
  - `lib/styles/tail.min.css` - Generated Tailwind CSS
  - `lib/components/`, `lib/pages/`, `lib/utils/` - Compiled modules
- **Assets**: Static files in `asset/` directory (images, videos, logos)
- **Configuration**:
  - `.babelrc` - Babel transpilation settings
  - `.gitignore` - Git ignore patterns

## 🏗️ Build

### Production Build

To create an optimized production build:

```bash
npm run build
```

This will:
- Transpile and minify all JavaScript files with Babel
- Process and minify CSS files with PostCSS and cssnano
- Generate optimized Tailwind CSS
- Output production-ready files to `lib/` directory

### Clean Build

To start fresh:

```bash
npm run clean
npm run build
```

## 🚢 Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment:

1. Push changes to the `main` branch
2. GitHub Pages automatically serves the site
3. Custom domain configured via `CNAME` file

### Manual Deployment

For other hosting platforms:

1. Run production build: `npm run build`
2. Upload all necessary files to your web server:
   - `index.html` and other HTML files
   - `lib/` directory (all compiled assets)
   - `asset/` directory (images, videos, etc.)
   - `tours/` and `webar-demos/` directories (if needed)
   - `favicon.ico`, `robots.txt`, `sitemap.xml`, `schema.json`
3. Ensure proper file permissions and accessibility
4. Configure your server to serve `index.html` as the default document
5. Set up proper MIME types for `.js`, `.css`, and `.webp` files

## 🛠️ Technologies Used

### Build Tools
- **Babel** - JavaScript transpilation and minification with React JSX support
- **PostCSS** - CSS processing and transformation
- **cssnano** - CSS minification and optimization
- **Tailwind CSS** - Utility-first CSS framework
- **npm-run-all** - Parallel script execution for efficient builds

### Frontend Technologies
- **React/JSX** - Component-based UI architecture (transpiled with Babel)
- **Three.js** - 3D graphics library for interactive models
- **WebAR** - AR.js / MindAR for augmented reality experiences
- **360° Tours** - Virtual tour rendering engine for immersive property tours

### Configuration
- **Babel Config** - `.babelrc` with @babel/preset-env and @babel/preset-react
- **Git** - Version control with `.gitignore` for dependency management

## 📝 License

See [LICENSE.md](LICENSE.md) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔍 Important Notes

- **Source Files**: The `.min.js` extension on source files in `components/`, `pages/`, and `utils/` is for organizational purposes only. These files contain unminified JSX/React code that gets transpiled and minified by Babel during the build process.
- **Main Entry**: The main application file is `app.js` (not `app.min.js`) which contains React components and routing logic.
- **CSS Processing**: The project uses both custom CSS (`main.css`) and Tailwind CSS, both processed and optimized during build.
- **Output Directory**: All compiled files are generated in the `lib/` directory, which should not be edited manually.
- **Watch Mode**: During development, use `npm run watch` to automatically rebuild files on changes for a smoother development experience.
