---
title: Orion Leidl Wilson
layout: base.njk
description: "Bassist and composer in Grand Pré, Nova Scotia. Coordinator of the Al Whittle Theatre."
eleventyNavigation:
  key: Home
  order: 1
---

# {{ site.author.name }}

<p class="lead">{{ home.lead }}</p>

{% for paragraph in home.bio %}{{ paragraph | mdBlock | safe }}
{% endfor %}

## Music

Compositions, recordings, and performances:

- **[Music](/music/)** — compositions and what I'm playing
- **[Media](/media/)** — recordings, setup, and samples
- **[Shows](/shows/)** — where I'm playing next

## Projects

Software, hardware, and other things I've built:

- **[Projects](/projects/)** — instruments, tools, scripts, and this website

## Now

What I'm reading, watching, listening to, and working on:

- **[Now](/now/)** — a snapshot of the present

## Elsewhere

<p class="contact-links">
<a href="mailto:{{ site.author.email }}">Email</a>
<a href="{{ site.social.github }}">GitHub</a>
<a href="{{ site.social.mastodon }}">Mastodon</a>
<a href="{{ site.social.letterboxd }}">Letterboxd</a>
<a href="{{ site.social.listenbrainz }}">ListenBrainz</a>
<a href="/cv/">CV</a>
</p>
