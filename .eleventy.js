const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Orion Leidl Wilson",
      subtitle: "Musician, Bassist, and Composer",
      base: "https://orionlw.me",
      author: {
        name: "Orion Leidl Wilson",
        email: "orionlw@pm.me",
      },
    },
  });
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Passthrough for CSS 

  eleventyConfig.addPassthroughCopy("bundle.css");

  // Add a custom filter (example)
  eleventyConfig.addFilter("myFilter", function (value) {
    return value.toUpperCase();
  });

  // Set the template engine
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
