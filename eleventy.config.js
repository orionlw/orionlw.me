import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import CleanCSS from "clean-css";
import { minify } from "terser";
import path from "path";
import fs from "fs/promises";

// Add image optimization plugin
const Image = eleventyConfig.getImagePlugin();
eleventyConfig.addPlugin(Image, {
  formats: ["webp", "jpeg"],
  urlPath: "/images/",
});

// Environment check
const isProduction = process.env.NODE_ENV === "production";

// Minify CSS in production
eleventyConfig.addFilter("cssmin", function (code) {
  if (!isProduction) return code;
  return new CleanCSS({}).minify(code).styles;
});

// Minify JS in production
eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
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
});

export default function (eleventyConfig) {
  // Add the navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Set the input directory where your source files reside
  eleventyConfig.setInputDirectory("src");
  // Add explicit output directory
  eleventyConfig.setOutputDirectory("_site");

  // Add passthrough copy for static assets (e.g., CSS, images)
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/bundle.css");
  eleventyConfig.addPassthroughCopy("src/_includes/playfair.woff2");

  // Configure directory options (optional, as setInputDirectory handles input)
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
