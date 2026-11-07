---
title: Now
layout: base.njk
description: "What Orion Leidl Wilson is reading, watching, listening to, and working on right now."
eleventyNavigation:
  key: Now
  order: 2
---

# Now

A snapshot of the present. The lists below update themselves; everything else is hand-written and therefore only as current as my last edit.

## Working on
{% for item in now.working %}
- {{ item | md | safe }}
{% endfor %}

## Listening

{% if listening %}
{% for a in listening -%}
- *{{ a.album }}* — {{ a.artist }}
{% endfor %}

[More on ListenBrainz →]({{ site.social.listenbrainz }})
{% else %}
See [ListenBrainz]({{ site.social.listenbrainz }}).
{% endif %}

## Watching

{% if watching %}
{% for f in watching -%}
- {% if f.link %}[{{ f.title }}]({{ f.link }}){% else %}{{ f.title }}{% endif %}
{% endfor %}

[More on Letterboxd →]({{ site.social.letterboxd }})
{% else %}
See [Letterboxd]({{ site.social.letterboxd }}).
{% endif %}

## Reading

{% if reading %}
{% for b in reading -%}
- [{{ b.title }}]({{ b.link }})
{% endfor %}

[More on Storygraph →]({{ site.social.storygraph }})
{% else %}
See [Storygraph]({{ site.social.storygraph }}).
{% endif %}

<p class="muted"><small>This page rebuilds daily and pulls from ListenBrainz, Letterboxd, and Storygraph.</small></p>
