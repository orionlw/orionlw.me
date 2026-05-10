---
title: Currently
layout: base.njk
eleventyNavigation:
  key: "Currently"
  order: 2
---

# Currently

**Listening**: {% if listening %}*{{ listening.track }}* — {{ listening.artist }}{% else %}see [ListenBrainz]({{ site.social.listenbrainz }}){% endif %}  
**Watching**: {% if watching %}{% if watching.link %}[{{ watching.title }}]({{ watching.link }}){% else %}{{ watching.title }}{% endif %}{% else %}see [Letterboxd]({{ site.social.letterboxd }}){% endif %}  
**Reading**: see [Storygraph]({{ site.social.storygraph }})

<p class="muted"><small>Listening and watching pull from ListenBrainz and Letterboxd at build time.</small></p>
