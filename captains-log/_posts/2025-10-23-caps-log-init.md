---
layout: default
title: "Captain's Log 1: Initialization"
description: How I built my site, plus some tips.
published: 2025-10-23
updated:
category: captains-log
tags:
  - tech
  - captains-log
  - blog
  - jekyll
  - github-pages
---
Welcome to my Captain's Log, the more rambling informal posts where I discuss ~~how hard coding is~~ how I'm building this site! Hope you enjoy.
# Website Hosting
The sheer amount of choices for this can be overwhelming. I've narrowed it down to four questions:
1. How much do you know about web development?
2. How much site upkeep work can or will you do? This includes work like updating dependencies and scaling for increased traffic.
3. How much control do you want?
4. What type of content will you be posting?

If you want to *write and post with no upkeep*, a content management system (**CMS**) like Ghost, WordPress, or Medium is your best bet. On the other hand, if you want *complete control over your site*, the upkeep for your systems is on you. Also, be sure that whatever you choose can support the features you need, such as video embedding.

I have previous experience in website development. I wanted as much control as possible on a budget of "not much", and I was willing to do the upkeep required. I didn't need any custom features, just Markdown sites online. This made GitHub Pages the obvious choice. Here's how I did it.

---
# 1. Configuring GitHub Pages and Jekyll
I'm one of the few who doesn't mind Ruby. If my alternative is any of JavaScript's awful frameworks, I'll do literally anything else.[^1] For building static sites, Jekyll is powerful and relatively easy to implement.

I wish I had known more about it before I got started.

First, I made the repository `<USERNAME>.github.io` on GitHub. My first mistake was making a README. For what I wanted to build, creating the Markdown sites first was the wrong decision. 

I launched the site on the README on Pages, then started adding the configuration and layout files. I finally noticed there was a problem when the theme I picked, Hacker, stopped showing up on the page. Long, long story short, this is when I realized that Pages is powered by Jekyll and Jekyll is powered by Ruby, so I need a Gemfile to change my theme. I downloaded the repo to my computer and created an actual Jekyll page using [this Jekyll documentation page](https://jekyllrb.com/docs/). I'm not proud of how long it took me to find the problem 🫣
# 2. Domain Hosting
By default, GitHub Pages websites domains are `<USERNAME>.github.io`. Pretty unmemorable and utilitarian. Time to spice things up! My [first post](/blog/2025/07/23/blog-name.html) explains why I chose the name 404 On The Floor, but what I don't mention is it being *memorable*. If anyone ever asks you about your blog, you can tell them the name and they can type it in their browser.

I picked [Porkbun](www.porkbun.com) for the included security features, custom email hosting, and ease of use. No problems with it so far 🤞🏾 Other sites I've seen people use are [Namecheap](www.namecheap), [Hostinger](www.hostinger.com), and [GoDaddy](www.godaddy.com). I used [this GitHub help page]() [this Porkbun help page]() to set this up. Now my 404 On The Floor domain redirects to this `<USERNAME>.github.io` site.

# 3. Features
Now it's time for the fun part: doing whatever I wanted! I knew before I started building this site that I wanted a navigation bar at the top, so that's where I started.

The navbar started pretty basic, just links on the top of the screen, which I knew how to do in HTML. But how do I add a drop-down menu to this navbar? I knew [w3schools.com](https://w3schools.com) was the best resource for this, so I edited some code I found there until it fit the look and feel I was going for. Here's the CodePens for a [regular drop-down](https://codepen.io/typestooloud/pen/bNVYWYb) and a [drop-down in the navbar](https://codepen.io/typestooloud/details/myeqmoY).

Now that I had a working version of the navbar, the last steps were editing it for 4OTF and uploading! This only took some text changes and was done pretty quickly.

Lastly, I wanted to make the navbar *responsive* - I wanted it to have a collapsed menu for smaller screens, like phones. I also [tested this on CodePen](https://codepen.io/typestooloud/pen/XJmVMJo), and then tested again for the [flexbox version](https://codepen.io/typestooloud/pen/gbazMpK).

"Now that I had a working version of the navbar, the last steps were editing it for 4OTF and uploading. This only took some text changes and was done pretty quickly"... is what I would've said if this feature was *working*! Yeah, for reasons I haven't figured out yet, this feature is not currently functional on my site. Error handling is extremely hard for this, so I'm still trying to find the issue months later. I love coding, I do, but this bug is starting to test my patience 🫠

But don't worry! In the meantime, I'm writing, a lot. I've been feverishly brainstorming and researching posts for this site because I love doing this too. Nothing could keep me from that. Hopefully in my next Captain's Log I'll have this fixed.

---

# Lessons Learned
Don't struggle like I did. Here's what I should've done:
1. Decide if you want to use Jekyll *prior* to making the repo.
	- If you use Pages without Jekyll, you'll have to create a `.nojekyll` file, use a different static site generator with GitHub Actions, or just post Markdown files.
	- If you're using Jekyll and you don't have previous experience with it, set up the site files on your machine before publishing to Pages.
2. Design the layout of your site prior to implementation.
	- This is one of the basics of web dev that I forgot, and it's making my life much harder right now. More on that later.
3. Test elsewhere, then integrate into your site.

# Future Plans
Here's what I'm thinking of doing with 4OTF in the future:

- [ ] I plan to implement a search bar with tag filters, *without* using Google.
- [ ] I have a big repository in Obsidian full of cybersecurity information that I started in college. My original idea for this site was a digitization of these notes, so that it could be accessible to everyone, including me. (This is not very useful without search.)
- [ ] I want to have pagination based on category. Being able to flip through this site like a book is a must for me.
- [ ] I want to conduct a penetration test this site, create a pentest report, remediate the vulnerabilities found, and then write about my experience.
- [ ] Write-ups! Well, more write-ups. I *may* have some in the works 🤫 

Until then, thanks for reading! Be sure to check out the sites in the navbar above; I worked ***really hard*** on everything that's here 🙂

[^1]: I *hate* JavaScript, and I avoid CSS if I can. Why did I decide to make a website? Because it's fun! ...And because I knew I could use Ruby and YAML instead.
