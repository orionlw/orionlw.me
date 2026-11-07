---
title: Shows
layout: base.njk
description: "Performance calendar for Orion Leidl Wilson."
eleventyNavigation:
  key: Shows
  order: 5
---

# Shows

## Upcoming

Dates are kept on the trio's calendar: **[the Mitchell McFadgen Trio events page]({{ shows.calendarUrl }})**.

If you'd like to book something, [get in touch](/contact/).

## Recent
{% for show in shows.recent %}
**{{ show.title }}** — {{ show.venue }}, {{ show.date }}
{% endfor %}
## Past
{% for show in shows.past %}
**{{ show.title }}** — {{ show.venue }}{% if show.note %} ({{ show.note }}){% endif %}
{% endfor %}
---

For Mitchell McFadgen Trio bookings: [mitchellmcfadgentrio.live/contact](https://mitchellmcfadgentrio.live/contact/)
For other projects: **[orionlw@pm.me](mailto:orionlw@pm.me)**
