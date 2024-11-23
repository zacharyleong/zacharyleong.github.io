---
title: "Descent: Snowboard Game"
pubDate: 2024-10-22 9:41
author: Zachary Leong
tags:
  - Unity
  - Blender
description: An endless, zen snowboard run down a procedurally-generated mountain.
imgUrl: ../../assets/descent.png
layout: ../../layouts/BlogPost.astro
---

## Overview
- Carve left and right to avoid obstacles
- Build speed on downhills and gain airtime by crouching and jumping
- Spin in midair by holding a direction to trick
- Gain more points for flashier tricks
## Terrain Generation
- Procedural 
	- Perlin noise
	- Chunking
	- Threading
	- Inspired by Sebastian Lague
- Object Scattering
	- Vertices assigned probability based on probability map
	- Layered noise for controlled cluster scattering
	- Object pooling for performance
![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUe0u4XFQ_kxjabXDqdFaL_9jVJMiTqsPDt-HeNeKDnC6s2GCWLQOLBk7ijGO-AgY1J9QcXdQy28UB7xXEZeb8CqlPO2fk9FUcp_0q1GOCW47SMBRlgkMP9to22LdV-QKENELogAzXDwk09vSLUhVNwPjNNrJ3E4=s2048?key=mVCR3USuA6ZO9EWRprgqyw)
![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUdGHGjQzNhZhauyTJaE4ZtXAiNfpoBSpIA1CXmCkuh2pRaHBi2IqEp-u2lOS2M4hDW9cibOD2dO4KjlSAS7IDJYICNrGLFBtLTaGo-xyiU-OjQa6BXA5clLIzXA7LAg6WHUl0GX4twlVwCTaTGimALDmp11KMw8=s2048?key=mVCR3USuA6ZO9EWRprgqyw)
![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUfEtstGDYAhnd3ZwpQnp10X_kTkKoG2k0nhauzdXAmPUzEhJSew9tI2D-WHCGEla6d1jAoHLe0XyzBfQfKAelGkuY8ThZWmmPECuPiW4c0OV8Gy2kvWonPaeyQo0vVCbtxj7YbMTgopmXOnLGIkvD7wuj5y2vZ4=s2048?key=mVCR3USuA6ZO9EWRprgqyw)
![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcsr063NMfjF-pbjGT_D5mnhTccyLytwXo9Ce9xK213XQjEUxGV7Bp5KO1rGuUKoVKJydaZG8K1I6OA32qwRCVtlqLKw4vb0WfYswnOP7NzR5mqlr2_5al8ZWcs-Eg0iZmNshNKkWVv9Pz3mwRhjg5EHAhAUbc1=s2048?key=mVCR3USuA6ZO9EWRprgqyw)