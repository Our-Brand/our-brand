# Careers System Guide

This document explains how the Careers system works, how to create new roles, how links behave, how translations work, and how the frontend dynamically renders everything.

It includes:

- The structure of a career object
- How to add new career entries
- How optional values behave
- How page navigation and anchors work
- How the frontend uses translations
- How the “Our Brand” section is generated dynamically

---

## 📁 Where Career Positions Are Stored

All career positions are stored inside: src/assets/careers/careers.json

This file contains an array of objects. Each object represents **one career position**.

When you add a new entry to this JSON file, the **Careers page automatically displays it** through the `useCareers` hook.

---

## 📦 Career Object Structure

Each position must follow this exact structure:

```ts
{
  id: number;
  title: string;
  description: string;
  link: string;
  type?: string;
  location?: string;
  requirements?: string;
  extra?: string;
}
```

If the property includes a '?' it means it's optional.

Before adding ask permission to: CTO @assebc
