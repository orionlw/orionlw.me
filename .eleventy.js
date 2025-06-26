const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
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

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/darkmode.css");
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy("src/guitar-solid.svg");
  // Or for SVG:
  // eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Universal filters (available in all template engines)
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

  eleventyConfig.addCollection("postsByYearMonth", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const archive = {};
    posts.forEach((post) => {
      const date = post.date;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if (!archive[year]) archive[year] = {};
      if (!archive[year][month]) archive[year][month] = [];
      archive[year][month].push(post);
    });
    return archive;
  });

  eleventyConfig.addCollection("postsByYear", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const years = {};
    posts.forEach((post) => {
      const year = post.date.getFullYear();
      if (!years[year]) years[year] = [];
      years[year].push(post);
    });
    return Object.entries(years)
      .sort((a, b) => b[0] - a[0])
      .map(([year, posts]) => ({
        year,
        posts: posts.sort((a, b) => b.date - a.date),
      }));
  });

  // Universal filters
  eleventyConfig.addFilter("unique", (arr) => [...new Set(arr)]);
  eleventyConfig.addFilter("sort", (arr, desc = false) => {
    if (!Array.isArray(arr)) return [];
    const sorted = [...arr].sort();
    return desc ? sorted.reverse() : sorted;
  });
  eleventyConfig.addFilter("reverse", (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].reverse();
  });
  eleventyConfig.addFilter("map", (arr, prop) => {
    if (!Array.isArray(arr)) return [];
    if (typeof prop === "function") return arr.map(prop);
    if (typeof prop === "string") {
      if (prop.includes(".")) {
        return arr.map((item) => {
          return prop
            .split(".")
            .reduce((obj, key) => (obj ? obj[key] : undefined), item);
        });
      }
      return arr.map((item) => item[prop]);
    }
    return arr;
  });
  eleventyConfig.addFilter("selectattr", (arr, attr, op, val) => {
    if (!Array.isArray(arr)) return [];
    if (op === "equalto") {
      return arr.filter((item) => {
        let v = attr.split(".").reduce((o, k) => (o ? o[k] : undefined), item);
        return v == val;
      });
    }
    if (op === "search") {
      const re = new RegExp(val);
      return arr.filter((item) => {
        let v = attr.split(".").reduce((o, k) => (o ? o[k] : undefined), item);
        return re.test(v);
      });
    }
    return arr;
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
