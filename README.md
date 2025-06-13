# Eleventy Personal Website

This is a personal website built using Eleventy (11ty), a simple and flexible static site generator. The project is structured to allow for easy customization and deployment.

## Project Structure

```
eleventy-personal-website
├── src
│   ├── _includes        # Reusable templates and partials
│   ├── _data           # Data files for dynamic content
│   ├── assets          # Static assets (images, fonts, etc.)
│   ├── pages           # Markdown files for pages
│   │   └── index.md    # Main page of the website
│   └── styles          # CSS styles
│       └── main.css    # Main stylesheet
├── .github
│   └── workflows
│       └── deploy.yml   # GitHub Actions workflow for CI/CD
├── .eleventy.js        # Eleventy configuration file
├── package.json        # npm configuration file
├── .gitignore          # Files and directories to ignore by Git
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd eleventy-personal-website
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npx eleventy --serve
   ```

4. **Build the project:**
   ```
   npx eleventy
   ```

## Deployment

This project uses GitHub Actions for CI/CD to deploy the site to an FTP server. The workflow is defined in `.github/workflows/deploy.yml`. Make sure to configure your FTP credentials in the GitHub repository secrets.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements!