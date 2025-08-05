import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
  // Add the navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Set the input directory where your source files reside
  eleventyConfig.setInputDirectory("src");

  // Add passthrough copy for static assets (e.g., CSS, images)
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/bundle.css");
  eleventyConfig.addPassthroughCopy("src/_includes/playfair.woff2");

  // Configure directory options (optional, as setInputDirectory handles input)
  return {
    dir: {
      includes: "_includes", // Directory for includes, layouts, partials
      layouts: "_layouts", // Directory for layouts (can be separate from includes)
      data: "_data", // Directory for global data files
    },
  };
}
