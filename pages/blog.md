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
      <span> / </span>
      <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    </li>
    <p>---</p>
  {% endfor %}
</ul>
