---
title: Better Tank Movement
description: A proposal for better designed tank movement
pubDate: 2024-09-22 11:13
author: Zachary Leong
tags:
  - Unity
imgUrl: ../../assets/city_gen.png
layout: ../../layouts/BlogPost.astro
---
>This post focuses solely on the tank hull/body movement controls (not turret controls or camera movement)
## Rethinking Traditional Tank Controls
In most traditional computer tank games, movement is controlled by 2 keys for rotating the hull, a key for moving forward, and a key for moving backward.

<div style="display: flex; justify-content: center;">
  <iframe src="/html/tanks/demo_1.html" 
          width="320"
          height="320" 
          style="overflow: hidden;" 
          allow="fullscreen">
  </iframe>
</div>
<p style="margin-top: 5px; text-align: center; color: grey">Demo of traditional tank controls (WASD)</p>

## Proposal: Auto Tank Rotation

<div style="display: flex; justify-content: center;">
  <iframe src="/html/tanks/demo_2.html" 
          width="320"
          height="320" 
          style="overflow: hidden;" 
          allow="fullscreen">
  </iframe>
</div>
<p style="margin-top: 5px; text-align: center; color: grey">Demo of improved tank controls (WASD)</p>