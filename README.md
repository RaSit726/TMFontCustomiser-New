## Originally,
```## Font Customiser Tampermonkey Script

A script for TamperMonkey built using **JavaScript** to improve readability of websites for users with accessibility needs.

### Features

- **Font Style Customisation**: Change the font of a webpage to a predefined accessible fonts like **Arial**, **Verdana**, and **Comic Sans**.
- **Font Size, Letter Spacing, Line Spacing Customisation**: Sliders for users the flexibility to customise the appearance of text on their screen.

### Language

**JavaScript**: This script, including its UI, was built using pure JavaScript, which dynamically applies custom CSS styles directly to a webpage's DOM

### Installation

To use this script, you need to have [Tampermonkey](https://www.tampermonkey.net/) installed in your browser. This can be installed from your chosen browser's extension store.

The script will automatically run on the websites that you visit.

### History
*Developed as a personal project*

- Created/Completed: 5th December 2024
```
- By Tong-JT
## Now,

### Changes
- Switched from linking the fonts from the CDNs themselves to saving as files, fixing (some) font-src errors on (some) websites.
- Added an option for loading OpenDyslexic as a system font (since loading system fonts shouldn't cause font-src errors)
- Added 3 escalation levels:
  - Soft: Only modifies body {}
  - Force: Modifies pretty much everything
  - Nuclear Option: Takes the CSS file from the website, and manually horrifically mangles and REGEXes out every different font for your wanted font. (may cause broken pages)

### Installation
- Copy and pasting is difficult, trust me bro. Do this instead:
```

```
