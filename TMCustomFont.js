// ==UserScript==
// @name         Font Customiser
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Allows the user to change the font, font size, letter spacing, and line spacing of simple HTML webpage with sliders
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// @connect      *
// @connect      fonts.cdnfonts.com
// @connect      cdnjs.cloudflare.com
// ==/UserScript==

(function() {
    'use strict';

    let links = [
        "https://fonts.cdnfonts.com/css/open-dyslexic",
        "https://fonts.cdnfonts.com/css/open-sans",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    ];

    links.forEach(cssUrl => {
        GM_xmlhttpRequest({
            method: 'GET',
            url: cssUrl,
            onload: async (response) => {
                let cssText = response.responseText;

                // Convert external/relative font URLs (.woff, .woff2, .ttf) into Base64 data URIs
                // so strict sites (like GitHub) don't block them via font-src CSP
                const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
                const matches = [...cssText.matchAll(urlRegex)];

                for (const match of matches) {
                    const fullMatch = match[0];
                    const rawPath = match[1];
                    if (rawPath.startsWith('data:')) continue;

                    // Resolves both absolute URLs (cdnfonts) and relative paths (Font Awesome ../webfonts/)
                    const absoluteFontUrl = new URL(rawPath, cssUrl).href;
                    const dataUri = await fetchAsDataURL(absoluteFontUrl);
                    if (dataUri) {
                        cssText = cssText.replace(fullMatch, `url('${dataUri}')`);
                    }
                }

                GM_addStyle(cssText);
            }
        });
    });

    function fetchAsDataURL(url) {
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                responseType: 'blob',
                onload: (res) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(res.response);
                },
                onerror: () => resolve(null)
            });
        });
    }

    function createFontCustomiserBox() {
        let fontCustomiserBox = document.createElement('div');
        fontCustomiserBox.style.position = 'fixed';
        fontCustomiserBox.style.top = '10px';
        fontCustomiserBox.style.right = '10px';
        fontCustomiserBox.style.zIndex = 10000;
        fontCustomiserBox.style.padding = '20px';
        fontCustomiserBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        fontCustomiserBox.style.color = '#fff';
        fontCustomiserBox.style.borderRadius = '8px';
        fontCustomiserBox.style.fontFamily = 'Arial, sans-serif';
        fontCustomiserBox.style.fontSize = '14px';
        fontCustomiserBox.style.display = 'none';
        return fontCustomiserBox;
    }

    function createStrengthSelect() {
        let strengthLabel = document.createElement('label');
        strengthLabel.style.paddingRight = '5px';
        strengthLabel.innerText = 'Strength: ';
        let strengthSelect = document.createElement('select');
        strengthSelect.innerHTML = `
            <option value=0>Soft</option>
            <option value=1>Force</option>
            <option value=2>Nuclear Option</option>
        `;
        return { strengthLabel, strengthSelect};
    }

    function createFontSelect() {
        let fontLabel = document.createElement('label');
        fontLabel.style.paddingRight = '5px';
        fontLabel.innerText = 'Font: ';
        let fontSelect = document.createElement('select');
        fontSelect.innerHTML = `
            <option value="none">No Font Change</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Tahoma, sans-serif">Tahoma</option>
            <option value="Century Gothic, sans-serif">Century Gothic</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Open-Dyslexic', sans-serif">Open Dyslexic</option>
            <option value="Comic Sans MS, sans-serif">Comic Sans</option>
            <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
            <option value="Calibri, sans-serif">Calibri</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="OpenDyslexic, sans-serif">Open Dyslexic (As System Font)</option>
        `;
        return { fontLabel, fontSelect };
    }

    function createLineSpacingSlider() {
        let lineSpacingLabel = document.createElement('label');
        lineSpacingLabel.innerText = 'Line Spacing: ';
        let lineSpacingSlider = document.createElement('input');
        lineSpacingSlider.type = 'range';
        lineSpacingSlider.min = 1;
        lineSpacingSlider.max = 2;
        lineSpacingSlider.step = 0.1;
        lineSpacingSlider.value = 1.4;
        lineSpacingSlider.style.width = '100%';
        return { lineSpacingLabel, lineSpacingSlider };
    }

    function createLetterSpacingSlider() {
        let letterSpacingLabel = document.createElement('label');
        letterSpacingLabel.innerText = 'Letter Spacing: ';
        let letterSpacingSlider = document.createElement('input');
        letterSpacingSlider.type = 'range';
        letterSpacingSlider.min = -1;
        letterSpacingSlider.max = 2;
        letterSpacingSlider.step = 0.2;
        letterSpacingSlider.value = 0.1;
        letterSpacingSlider.style.width = '100%';
        return { letterSpacingLabel, letterSpacingSlider };
    }

    function createFontSizeSlider() {
        let fontSizeLabel = document.createElement('label');
        fontSizeLabel.innerText = 'Font Size: ';
        let fontSizeSlider = document.createElement('input');
        fontSizeSlider.type = 'range';
        fontSizeSlider.min = 10;
        fontSizeSlider.max = 30;
        fontSizeSlider.step = 2;
        fontSizeSlider.value = 18;
        fontSizeSlider.style.width = '100%';
        return { fontSizeLabel, fontSizeSlider };
    }

    function fetchRawCSS(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: (response) => resolve(response.responseText),
                onerror: (err) => reject(err)
            });
        });
    }

    function CSSModifier(CSSFile, font) {
        return CSSFile.replace(/font-family\s*:[^;\}]+/gi, `font-family: ${font} !important`);
    }

    function variableStrengthStyleAdder(fontStyle, string, overrideAllCSSFiles, selectedFont) {

        let styleTag = document.getElementById('font-customiser-injected-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'font-customiser-injected-style';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = `
            #font-customisation-box {
                font-family: Arial, sans-serif !important;
                font-size: 14px !important;
                line-height: normal !important;
                letter-spacing: normal !important;
            }
            #font-customizer-hover-button {
                font-family: initial !important;
                font-size: 20px !important;
                line-height: normal !important;
                letter-spacing: normal !important;
                background-color: #E30B5D !important;
                color: white !important;
            }
            ${string} {
                ${fontStyle}
            }
        `;

        if (overrideAllCSSFiles && selectedFont !== 'none') {
            for (const sheet of document.styleSheets) {
                try {
                    const rules = sheet.cssRules;
                    for (const rule of rules) {
                        if (rule.style) {
                            rule.style.setProperty('font-family', selectedFont, 'important');
                        }
                    }
                } catch (e) {
                    console.log('Cross origin stylesheet:', sheet.href, ' Handling.');
                    const linkElement = sheet.ownerNode;
                    if (sheet.href) {
                        fetchRawCSS(sheet.href).then(rawCSS => CSSModifier(rawCSS, selectedFont)).then(modifiedCSS => {
                            const blob = new Blob([modifiedCSS], { type: 'text/css' });
                            const virtualFileUrl = URL.createObjectURL(blob);
                            if (linkElement) {
                                linkElement.removeAttribute('integrity');
                                linkElement.href = virtualFileUrl;
                            }
                        });
                    }
                }
            }
        }
    }

    function applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect) {
        let selectedFont = fontSelect.value;
        let selectedLineSpacing = lineSpacingSlider.value;
        let selectedLetterSpacing = letterSpacingSlider.value;
        let selectedFontSize = fontSizeSlider.value;
        let selectedStrength = strengthSelect.value;

        let fontStyle = '';

        if (selectedFont !== 'none') {
            fontStyle += `font-family: ${selectedFont} !important; `;
        }
        if (selectedLineSpacing) {
            fontStyle += `line-height: ${selectedLineSpacing} !important; `;
        }
        if (selectedLetterSpacing) {
            fontStyle += `letter-spacing: ${selectedLetterSpacing}px !important; `;
        }
        if (selectedFontSize) {
            fontStyle += `font-size: ${selectedFontSize}px !important; `;
        }

        if (selectedStrength == 0) {
            variableStrengthStyleAdder(fontStyle, `body`, false);
        } else if (selectedStrength == 1) {
            variableStrengthStyleAdder(fontStyle, `:root:root:root *:not(i):not(.fa):not(.material-icons):not([class*="icon"]):not(#font-customisation-box):not(#font-customisation-box *):not(#font-customizer-hover-button):not(#font-customizer-hover-button *)`, false);
        } else if (selectedStrength == 2) {
            variableStrengthStyleAdder(fontStyle, `:root:root:root *:not(i):not(.fa):not(.material-icons):not([class*="icon"]):not(#font-customisation-box):not(#font-customisation-box *):not(#font-customizer-hover-button):not(#font-customizer-hover-button *)`, true, selectedFont);
        }
    }

    function createHoverButton() {
        let hoverButton = document.createElement('div');
        hoverButton.id = 'font-customizer-hover-button';
        hoverButton.innerHTML = '<i class="fa-solid fa-font"></i>';
        hoverButton.style.position = 'fixed';
        hoverButton.style.bottom = '10px';
        hoverButton.style.right = '10px';
        hoverButton.style.zIndex = '1000';
        hoverButton.style.display = 'flex';
        hoverButton.style.justifyContent = 'center';
        hoverButton.style.alignItems = 'center';
        hoverButton.style.backgroundColor = '#E30B5D';
        hoverButton.style.width = '50px';
        hoverButton.style.height = '50px';
        hoverButton.style.borderRadius = '50%';
        hoverButton.style.color = 'white';
        hoverButton.style.cursor = 'pointer';
        hoverButton.style.fontSize = '20px';

        hoverButton.addEventListener('click', function() {
            let fontCustomiserBox = document.getElementById('font-customisation-box');

            if (fontCustomiserBox.style.display === 'none') {
                fontCustomiserBox.style.display = 'block';
            } else {
                fontCustomiserBox.style.display = 'none';
            }
        });

        return hoverButton;
    }

    function createCustomisationUI() {
        let fontCustomiserBox = createFontCustomiserBox();
        fontCustomiserBox.id = 'font-customisation-box';

        let { strengthLabel, strengthSelect } = createStrengthSelect();
        let { fontLabel, fontSelect } = createFontSelect();
        let { lineSpacingLabel, lineSpacingSlider } = createLineSpacingSlider();
        let { letterSpacingLabel, letterSpacingSlider } = createLetterSpacingSlider();
        let { fontSizeLabel, fontSizeSlider } = createFontSizeSlider();

        fontCustomiserBox.appendChild(strengthLabel);
        fontCustomiserBox.appendChild(strengthSelect);
        fontCustomiserBox.appendChild(document.createElement('br'));
        fontCustomiserBox.appendChild(document.createElement('br'));

        fontCustomiserBox.appendChild(fontLabel);
        fontCustomiserBox.appendChild(fontSelect);
        fontCustomiserBox.appendChild(document.createElement('br'));
        fontCustomiserBox.appendChild(document.createElement('br'));

        fontCustomiserBox.appendChild(lineSpacingLabel);
        fontCustomiserBox.appendChild(lineSpacingSlider);
        fontCustomiserBox.appendChild(document.createElement('br'));

        fontCustomiserBox.appendChild(letterSpacingLabel);
        fontCustomiserBox.appendChild(letterSpacingSlider);
        fontCustomiserBox.appendChild(document.createElement('br'));

        fontCustomiserBox.appendChild(fontSizeLabel);
        fontCustomiserBox.appendChild(fontSizeSlider);
        fontCustomiserBox.appendChild(document.createElement('br'));

        strengthSelect.addEventListener('change', function() {
            applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect);
        });
        fontSelect.addEventListener('change', function() {
            applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect);
        });
        lineSpacingSlider.addEventListener('input', function() {
            applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect);
        });
        letterSpacingSlider.addEventListener('input', function() {
            applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect);
        });
        fontSizeSlider.addEventListener('input', function() {
            applyFontSettings(fontSelect, lineSpacingSlider, letterSpacingSlider, fontSizeSlider, strengthSelect);
        });
        document.body.appendChild(fontCustomiserBox);
    }

    createCustomisationUI();
    let hoverButton = createHoverButton();
    document.body.appendChild(hoverButton);

})();
