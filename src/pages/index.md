---
layout: layout.liquid
title: Orion Leidl Wilson
---

Welcome to my personal website! Here you will find information about me, my projects, and my blog posts. Feel free to explore and connect with me!

{% for post in collections.post %}

## [{{ post.data.title }}]({{ post.url }})

{{ post.content }}
{% endfor %}
