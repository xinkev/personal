---
title: App Builds Successfully, but Changes Aren't Visible
publishedAt: 2023-02-23
author: xinkev
tags: ["androiddev", "Android Studio"]
description: A few weeks ago, I joined a new project and started working on it by cloning the repository. After performing Gradle sync and running the app, everything seemed to be working fine. However...
isPublish: true
---

A few weeks ago, I joined a new project and started working on it by cloning the repository. After performing Gradle sync and running the app, everything seemed to be working fine. However, while working on a fix for an issue, I noticed that changes were not being reflected in the app despite successful installation and launch.After hours of struggling I found out that I can make the changes appear by rebuilding the project first and run after that. But that is quite cubersome. So, I searched on the internet and found  [this answer](https://stackoverflow.com/a/59611475) on Stackoverflow. So, I thought I might make a note about it.

Here's the gist of it.

> In `Edit Configuration` for **app**, Go to `General` Tab and check that you should have `Gradle-aware Make` added in the general configuration's settings field for `Before-launch`
> 
> If it's not added yet than add it by pressing the **+** icon available with `Before-launch`
> 
> This solution is applied for **Android Studio 3.3.2 and above**.
> 
> For reference see below image.
> ![Pasted image 20230221181127](https://user-images.githubusercontent.com/11447571/220938654-ca70bfb9-6e4a-4fb1-af5f-ed77fb988a82.png)
