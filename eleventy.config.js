import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-toc-done-right";
import CleanCSS from "clean-css";
import { minify } from "terser";

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {import("@11ty/eleventy").EleventyConfig}
 */
export default function (eleventyConfig) {
  // Add the navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Add passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/bundle.css");
  eleventyConfig.addPassthroughCopy("src/_includes/playfair.woff2");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Configure dev server settings
  eleventyConfig.setServerOptions({
    // Show local network IP for mobile testing
    showAllHosts: true,
    // Enable live reload
    liveReload: true,
    // Watch these additional files for changes
    watch: ["./src/assets/js/**/*.js", "./src/assets/css/**/*.css"],
  });

  // Add useful shortcodes
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  eleventyConfig.addShortcode(
    "image",
    (src, alt, className = "", sizes = "100vw") => {
      return `<img src="${src}" alt="${alt}" class="${className}" sizes="${sizes}" loading="lazy">`;
    },
  );

  // Add useful filters
  eleventyConfig.addFilter("readableDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // RSS feed date filter
  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    return new Date(date).toISOString();
  });

  // Get newest collection item date
  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || collection.length === 0) {
      return new Date();
    }
    return new Date(Math.max(...collection.map((item) => new Date(item.date))));
  });

  // HTML to absolute URLs for RSS
  eleventyConfig.addFilter("htmlToAbsoluteUrls", (htmlContent, base) => {
    if (!htmlContent) return htmlContent;
    return htmlContent
      .replace(/src="\/([^"]+)"/g, `src="${base}/$1"`)
      .replace(/href="\/([^"]+)"/g, `href="${base}/$1"`);
  });

  // Configure Markdown with plugins
  const markdownOptions = {
    html: true,
    breaks: false,
    linkify: true,
  };

  const markdownLibrary = markdownIt(markdownOptions)
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
      level: [2, 3, 4, 5, 6], // Only apply to h2-h6, exclude h1
    })
    .use(markdownItToc);

  eleventyConfig.setLibrary("md", markdownLibrary);

  // Environment check
  const isProduction = process.env.NODE_ENV === "production";

  // Log environment
  console.log(
    `Building in ${isProduction ? "PRODUCTION" : "DEVELOPMENT"} mode`,
  );

  // Minify CSS in production
  eleventyConfig.addFilter("cssmin", function (code) {
    if (!isProduction) return code;
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS in production
  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      if (!isProduction) {
        callback(null, code);
        return;
      }
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        callback(null, code);
      }
    },
  );

  // Configure image optimization if available in your Eleventy version
  try {
    const Image = eleventyConfig.getImagePlugin();
    eleventyConfig.addPlugin(Image, {
      formats: ["webp", "jpeg"],
      urlPath: "/images/",
    });
  } catch (e) {
    console.log("Note: Image plugin not available in this Eleventy version");
  }

  // Create blog collection
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // Configure directory options
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    // Template formats to process
    templateFormats: ["md", "njk", "html"],
    // Set as universal to work with ES modules
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/", // useful if site is deployed to a subdirectory
  };
}
