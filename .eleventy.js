const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

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

  eleventyConfig.addPassthroughCopy("src/font/font.woff2");
  eleventyConfig.addPassthroughCopy("src/media");
  // Add a custom filter (example)
  eleventyConfig.addFilter("myFilter", function (value) {
    return value.toUpperCase();
  });

  eleventyConfig.addFilter("slice", function (arr, start, end) {
    return (arr || []).slice(start, end);
  });

  eleventyConfig.addFilter("date", function (dateObj, format = "yyyy-MM-dd") {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  });

  // All posts, sorted by date
  eleventyConfig.addCollection("postsByYearMonth", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const archive = {};
    posts.forEach((post) => {
      const date = post.date;
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 1-based
      if (!archive[year]) archive[year] = {};
      if (!archive[year][month]) archive[year][month] = [];
      archive[year][month].push(post);
    });
    return archive;
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
