# Grocery Store Management System 🛒

## Overview

The Grocery Store Management System is a full-stack Python-based desktop application designed to streamline day-to-day grocery store operations. It handles everything from product inventory and GST-based billing to cart management, stock updates, and generating detailed customer receipts.

## Features

- 🔍 **Product Search** by name or category
- 🛒 **Smart Cart** system with quantity and subtotal
- 📦 **Inventory Management** with real-time stock updates
- 💸 **Discount & GST Calculator** based on Indian tax slabs (0%, 5%, 12%, 18%)
- 🧾 **Bill Generator** with itemized receipt
- 🖼️ **GUI Interface** built using Tkinter (or your GUI of choice)
- 📊 **Data Source** powered by a real-world Kaggle dataset

## Tech Stack

- **Python**
- **Pandas**
- **Tkinter** for GUI
- **CSV/Excel** or **SQLite** for storage
- **Custom GST Engine**

## GST Logic

- Tax applied based on category:
  - 0% → Essentials (e.g., grains, milk)
  - 5% → Packaged food (bread, butter)
  - 12%/18% → Premium & processed goods

Each product in the dataset is mapped to the appropriate GST slab before calculating the total bill.

## How It Works

1. User adds products to cart using search.
2. System computes total price, applicable discounts, and GST.
3. Final bill is displayed and printable as receipt.
4. Stock updates automatically post-checkout.

## Future Enhancements

- 📱 Mobile version (using Kivy or React Native)
- ☁️ Cloud-based inventory syncing
- 🧑‍💼 Admin dashboard with sales analytics

## Screenshots

_Include UI screenshots here if available (e.g., `/project-images/grocery-ui.png`)._

## GitHub Repo

[👉 View Source Code on GitHub](https://github.com/yourusername/grocery-store-management)

## Live Demo

_This is a desktop app, no live demo. You can add a YouTube link or demo video if available._

---

