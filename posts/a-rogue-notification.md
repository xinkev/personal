---
title: A rouge notification problem
date: 2022-09-16
author: xinkev
tags:
  - androiddev
  - notifications
summary: Recently, a project that I was working on, had a strange bug–a blank notification appeared when you open the app for the first time.
---

Recently, a project that I was working on, had a strange bug–a blank notification appeared when you open the app for the first time.

We're using Firebase messaging service in our project for push notifications. So, at first, I thought we were receving a message with an empty `data` field. But when I checked, the method `onMessageReceived(remoteMessage: RemoteMessage)` wasn't even triggered once.

So, what went wrong? Turns out, all notification channels were registered with the same id! After making sure no notification channels is has the same id, the rogue notification no longer appear on first startup.

It was a weird bug even though it makes sense to not register notification channels with the same id.