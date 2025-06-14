---
layout: layout.liquid
title: Orion Leidl Wilson
---

Welcome to my personal website! Here you will find information about me, my projects, and my blog posts. Feel free to explore and connect with me! This site is very much a work in progress, and will be evolving over the summer.

## About Me

I am a musician located in Grand Pré, Nova Scotia, Canada. My main instrument is electric bass. I am also a composer. Other interests include cycling, computers, and film/tv.

## Blog

{% for post in collections.post %}

### [{{ post.data.title }}]({{ post.url }})

{{ post.content }}
{% endfor %}
