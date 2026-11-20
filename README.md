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
- Tong-JT, 2024
## Now,

### Changes
- Switched from linking the fonts from the CDNs themselves to saving as files, fixing (some) font-src errors on (some) websites.
- Added an option for loading OpenDyslexic as a system font
- Added 3 escalation levels:
  - Soft: Only modifies body {}.
  - Force: Modifies pretty much everything.
  - Nuclear Option: Takes the CSS file from the website, and manually horrifically mangles and REGEXes out every different font for your wanted font. (may cause broken pages)
- Optimized changing the fonts by not appending again and again but instead replacing the one that already exists

### Prerequsites
- Install Tampermonkey. It's a Tampermonkey script, after all.
- ``https://www.tampermonkey.net/``
- Give it the appropriate permissions
- For the "Open Dyslexic (As System Font)" option, you need to have OpenDyslexic installed, recognized, and loadable by your system.
  - Why should you use it in favor of the other option?
    - loading system fonts causes many less font-src errors. Strict websites may enforce that their fonts may only come from their CDNs. Even if you set strength to "Nuclear Option".
  - I tested it only with this OpenDyslexic font: ``https://antijingoist.itch.io/opendyslexic``
  - You can donate to their project. It's the first thing you see once you click "Download".
  - Otherwise you may click "No thanks, just take me to the downloads" and download the one titled "OpenDyslexic (Newest)"
  - On windows,
    - Extract the zip
    - double click the .otf 's
  - On linux,
    - Extract the zip
    - copy the .otf files to ~/.local/share/fonts/ (for local install) or /usr/share/fonts/ (for system-wide install)
    - Linux usually reloads the font cache automatically, though to be on the safe side, you can also ``fc-cache -f``
    - ``fc-list | grep -i "OpenDyslexic"`` and you should see the fonts.

### Installation
- Selecting all, then copy and pasting is difficult, trust me bro. Take this instead:
```https://raw.githubusercontent.com/RaSit726/TMFontCustomiser-New/refs/heads/main/TMCustomFont.js```
- Go into your Tampermonkey dashboard.
- Then into the tab "utilities" (right hand side).
- Paste in the link to into the box labeled "Import from URL".
- Click install. It is right of the input box.
- You now have the script installed. Make sure to give Tampermonkey the appropriate permissions too, and if it asks you to allow to download, look at the URL, and if it looks like something about fonts, allow them then.
- The script accesses these sites for fonts:
```
"https://fonts.cdnfonts.com/css/open-dyslexic",
"https://fonts.cdnfonts.com/css/open-sans",
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
```

### Attributions
- Tong-JT, who started this project for themselves personally.
- Abbie Gonzalez (Antijingoist), for the OpenDyslexic font.
- Jan Biniok for making Tampermonkey, which this whole thing leans upon.
