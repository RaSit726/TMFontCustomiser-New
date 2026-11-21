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
- Make sure to first have gone through the prerequisites before going to the instsallation of this script.
- find the file in this repo with name `TMCustomFont.user.js`, then click on it.
- On the top right of the code window you will see a button with text `Raw`. Click that.
- Tampermonkey should then ask you if you want to install the script. Agree.
- You now have the script installed. Make sure to give Tampermonkey the appropriate permissions too, and if it asks you to allow to download, look at the URL, and if it looks like something about fonts, allow them then.
- If it isn't already turned on, turn the script on in the dashboard
- The script accesses these sites for fonts:
```
"https://fonts.cdnfonts.com/css/open-dyslexic",
"https://fonts.cdnfonts.com/css/open-sans",
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
```
- This script should be auto-updating, so going back to here is not necessary unless something breaks.

### Usage
- A red dot, usually containing an "A", but sometimes nothing or an unknown character box, should appear on the bottom right corner of the website viewport.
- Clicking on it reveals a menu on the top right. From there,
  - You can set the strength (category)
  - Set the font (category)
  - Line Spacing (slider)
  - Letter Spacing (slider)
  - Font Size (slider)
- If it does not modify the text on the site,
  - Try to first switch from strength "Soft" to "Force"
  - Then only to "Nuclear Option"
  - If you see that the slider values modify the text even at the higher levels while not the fonts, this means that the website most probably has font-src restrictions.
    - To bypass, switching to a font installed on the system (Like OpenDyslexic (as system font)), usually fixes this.
    - If not, well shit. Open a github issue. Maybe I'll fix it.

### Attributions
- Tong-JT, who started this project for themselves personally.
- Abbie Gonzalez (Antijingoist), for the OpenDyslexic font.
- Jan Biniok for making Tampermonkey, which this whole thing leans upon.


### Fork's History
- Made on the 21st November, 2026
- And completed by then.

### Support
- Maybe
