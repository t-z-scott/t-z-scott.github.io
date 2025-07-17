---
layout: default
title: 404 On the Floor - Posts
description: List of all my blog posts.
permalink: /blog/
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    <li>
        <p>{{ post.excerpt }}</p>
    </li>
    <p>---</p>
  {% endfor %}
</ul>