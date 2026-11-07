---
title: Projects
layout: base.njk
description: "Software, hardware, and musical projects by Orion Leidl Wilson."
eleventyNavigation:
  key: Projects
  order: 4
---

# Projects

Things I've built, fixed, or got working well enough to keep.

<ul class="projects-list">
{%- for project in projects.items %}
  <li>
    <h3><a href="{{ project.url }}">{{ project.name }}</a></h3>
    <p>{{ project.description }}</p>
  </li>
{%- endfor %}
</ul>

## Self-hosting

Most of what I use day to day runs on a machine at home: a media server, a few dashboards, and backups.

## Elsewhere

More code is at [github.com/orionlw]({{ site.social.github }}).
