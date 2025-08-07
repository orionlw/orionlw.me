---
title: Blog
layout: base.njk
eleventyNavigation:
  key: "Blog"
  order: 2
pagination:
  data: collections.blog
  size: 10
  reverse: true
  alias: posts
---

# Blog

Welcome to my blog where I share thoughts on music, bass playing, composition, and life as a musician in Nova Scotia.

{% if posts.length %}
<div class="blog-posts">
{% for post in posts %}
  <article class="blog-post-preview">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <time datetime="{{ post.data.date | date('Y-m-d') }}" class="post-date">
      {{ post.data.date | readableDate }}
    </time>
    {% if post.data.excerpt %}
      <p class="post-excerpt">{{ post.data.excerpt }}</p>
    {% endif %}
    <a href="{{ post.url }}" class="read-more">Read more</a>
  </article>
{% endfor %}
</div>

{% if pagination.href.next or pagination.href.previous %}
<nav class="pagination" aria-label="Blog pagination">
  {% if pagination.href.previous %}
    <a href="{{ pagination.href.previous }}" class="pagination-link pagination-prev">← Newer Posts</a>
  {% endif %}
  {% if pagination.href.next %}
    <a href="{{ pagination.href.next }}" class="pagination-link pagination-next">Older Posts →</a>
  {% endif %}
</nav>
{% endif %}

{% else %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}