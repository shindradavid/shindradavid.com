---
title: Maurice Cakes & Events — E-commerce & Operations Platform
description: A connected commerce and operations platform that helps a busy bakery manage orders, customer communication, payments, fulfilment, and daily finances.
thumbnailUrl: /images/my-work/maurice-cakes-and-events/cover.webp
publishedOn: 2026-03-31
category: software
isFeatured: true
featuredRank: 1
serviceTypes:
  - ecommerce
  - business-system
technologies:
  - Svelte
  - SvelteKit
  - PostgreSQL
  - WebSockets
  - WhatsApp Business Platform
  - PesaPal
  - UGSMS
client: Maurice Cakes & Events
role: Full-stack developer
duration: Ongoing partnership
liveUrl: https://www.mauricecakesandevents.com
playStoreUrl: https://play.google.com/store/apps/details?id=com.kesdigital.mymaurice
appStoreUrl: https://apps.apple.com/ug/app/my-maurice/id6451052006
outcomes:
  - Replaced paper records and scattered chats with one shared order workflow for management, bakers, and delivery riders.
  - Gave authorised staff a real-time customer inbox without limiting support and marketing work to a handful of linked phones.
  - Automated permission-based order updates, reminders, and thank-you messages across WhatsApp and SMS.
  - Connected the website and mobile shopping experience to the product catalogue, online payments, fulfilment, and daily finance reporting.
isPublished: true
---

## The challenge

Maurice Cakes & Events was coordinating a high volume of custom orders through paper books and separate WhatsApp conversations. That made it difficult for management, bakers, customer-facing staff, and delivery riders to see the same order status, follow up consistently, and reconcile each day’s business activity.

I designed and built a connected platform around the company’s real workflow: sell through the web and mobile apps, manage the cake catalogue, move each order through production and delivery, communicate with customers, collect payments, and close the day’s finances.

## One order workflow for the whole team

The operations system gives management and bakers a shared view of every order, including its delivery date, production status, payment position, specifications, and handoff history. Statuses such as baking, completed, and delivered make the next action visible without searching through a book or chat thread.

Delivery coordination is intentionally practical: the team records which rider took a cake and its destination. It supports responsibility and handoff visibility without pretending to be a live GPS or route-tracking product.

<figure class="case-study-visual">
  <img src="/images/my-work/maurice-cakes-and-events/order-workflow.webp" alt="Maurice Cakes order-management screen showing production statuses and redacted customer details" width="1797" height="875" loading="lazy" decoding="async">
  <figcaption>A shared production queue helps staff see what is overdue, in progress, completed, or ready for delivery. Customer details have been redacted.</figcaption>
</figure>

## A real-time, multi-user WhatsApp workspace

I integrated the official WhatsApp Business Platform and built a WebSocket-powered inbox so authorised team members can handle conversations from the business system. The company is no longer restricted to the small number of people who can share linked devices, and incoming messages and replies appear in real time.

The same integration supports automatic order-status notifications, reminders around customer-approved important dates, and permission-based campaigns using approved message templates. This makes communication more consistent while keeping consent and platform policy part of the workflow.

<figure class="case-study-visual">
  <img src="/images/my-work/maurice-cakes-and-events/whatsapp-inbox.webp" alt="Real-time multi-user WhatsApp inbox with customer identities and message previews redacted" width="1796" height="876" loading="lazy" decoding="async">
  <figcaption>The shared inbox surfaces unread conversations, reply windows, and live connection state. Customer data has been redacted.</figcaption>
</figure>

## Storefront, catalogue, and online payments

The public storefront turns the managed cake catalogue—categories, products, photos, and prices—into a complete e-commerce experience. Customers can browse products and place orders on the website or through the Android and iOS apps.

Checkout is integrated with PesaPal, allowing customers to pay online with MTN MoMo, Airtel Money, Visa, or Mastercard. That payment path connects the customer-facing order to the internal operations workflow instead of creating another record for staff to reconcile manually.

<figure class="case-study-visual">
  <img src="/images/my-work/maurice-cakes-and-events/storefront.webp" alt="Maurice Cakes and Events storefront featuring an elaborate wedding cake" width="1796" height="876" loading="lazy" decoding="async">
  <figcaption>The customer-facing storefront is backed by the same catalogue and order platform used by the operations team.</figcaption>
</figure>

## Daily finance and customer follow-up

Management can close out the day with a consolidated report covering sales, bank and mobile-money deposits, cash on delivery, expenses, PesaPal payments, and banked totals. The report connects finance to the actual orders completed that day, giving the team a clearer reconciliation trail.

When an order is completed, the platform also uses UGSMS to send an automatic thank-you message. Together with WhatsApp updates and reminders, this creates a consistent follow-up experience without adding repetitive work for staff.

<figure class="case-study-visual">
  <img src="/images/my-work/maurice-cakes-and-events/daily-finance.webp" alt="Daily sales and finance report with names, messages, and financial values redacted" width="1797" height="875" loading="lazy" decoding="async">
  <figcaption>Daily reporting brings sales, deposits, expenses, and order completion into one view. Sensitive values have been redacted.</figcaption>
</figure>

## Mobile reach and an ongoing partnership

The My Maurice apps provide a full shopping experience on both Android and iOS. The Android app had reached **10K+ downloads on Google Play as of August 2026**, extending the platform beyond the website and giving returning customers a direct way to browse and order.

This remains an ongoing partnership. The core result is not a collection of disconnected features, but a working digital backbone that connects the customer journey with day-to-day bakery operations—from catalogue and checkout to production, communication, delivery handoff, and finance.
