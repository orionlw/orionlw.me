module.exports = function(eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Add a custom filter (example)
  eleventyConfig.addFilter("myFilter", function(value) {
    return value.toUpperCase();
  });

  // Set the template engine
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};