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

Welcome to my website! I'm an emerging artist with a passion for jazz, contemporary classical, and electronic music. I enjoy cats, cycling, beer, coffee, movies, and music.

## About Me

I specialize in electric bass performance and contemporary composition, with experience in jazz ensemble, electronic music, and applied composition. My musical journey spans multiple genres and collaborative projects, from traditional jazz standards to experimental electronic music.

Based in the beautiful landscape of Nova Scotia, I draw inspiration from both the rich musical heritage of the Maritimes and contemporary musical innovations. My work explores the intersection of traditional jazz language with modern electronic textures and contemporary classical techniques.

## Current Projects

<div class="projects-list">
{% for project in site.projects %}
  <div>
    <h3><a href="{{ project.url }}" target="_blank" rel="noopener">{{ project.name }}</a></h3>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
</div>

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

## Get in Touch

<div class="contact-links">
  <a href="mailto:{{ site.author.email }}" target="_blank" rel="noopener">Email</a>
  <a href="{{ site.social.mastodon }}" target="_blank" rel="noopener me">Mastodon</a>
</div>

## Around the Web

<div class="contact-links">
  <a href="{{ site.social.github }}" target="_blank" rel="noopener">GitHub</a>
  <a href="{{ site.social.letterboxd }}" target="_blank" rel="noopener">Movie Reviews</a>
  <a href="{{ site.social.listenbrainz }}" target="_blank" rel="noopener">Music Scrobbles</a>
</div>

---

*Feel free to reach out if you'd like to collaborate or learn more about my work! I'm always interested in connecting with fellow musicians and music enthusiasts.*
