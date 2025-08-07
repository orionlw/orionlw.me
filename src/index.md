---
title: Orion Leidl Wilson
layout: base.njk
description: "Electric Bassist & Composer from Grand Pré, Nova Scotia. Specializing in jazz, contemporary classical, and electronic music."
eleventyNavigation:
  key: "Home"
  order: 1
---

# {{ site.author.name }}

## Electric Bassist & Composer

{{ site.location }}

Welcome! I'm a bassist and composer exploring jazz, contemporary classical, and electronic music from the beautiful landscape of Nova Scotia.

## Explore

- **[Blog](/blog/)** - Musical thoughts and recent experiences
- **[Shows](/shows/)** - Performance calendar and recent gigs  
- **[Media](/media/)** - Audio samples and recordings
- **[Music](/music/)** - Portfolio and compositions

## Active Projects

- **[Mitchell McFadgen Trio](https://mitchellmcfadgentrio.live/)** - Jazz standards and original arrangements
- **SUPERVI11AIN** - Experimental drum & bass duo
- **Doublespeak** - Singer-songwriter quartet

## Latest from the Blog

{% set latestPosts = collections.blog | reverse | limit(3) %}
{% if latestPosts.length %}
<div class="latest-blog-posts">
{% for post in latestPosts %}
  <article class="blog-post-preview">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <time datetime="{{ post.data.date | dateToRfc3339 }}" class="post-date">
      {{ post.data.date | readableDate }}
    </time>
    {% if post.data.excerpt %}
      <p>{{ post.data.excerpt }}</p>
    {% endif %}
    <a href="{{ post.url }}" class="read-more">Read more</a>
  </article>
{% endfor %}
</div>
<p><a href="/blog/" class="read-more">View all blog posts →</a></p>
{% endif %}

## Connect

**[Email](mailto:{{ site.author.email }})** • **[Mastodon]({{ site.social.mastodon }})** • **[Contact Page](/contact/)** for collaborations
