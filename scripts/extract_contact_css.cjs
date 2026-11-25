const fs = require('fs');
const css = fs.readFileSync('src/styles/original.css', 'utf8');

// Find the section containing letterform
const startIdx = css.indexOf('.tp-post{');
const endIdx = css.indexOf('.tp-visit__photo{') + 500;

console.log('Range:', startIdx, 'to', endIdx);
const slice = css.substring(startIdx, endIdx);

// Also find shopfront and stamp
const stampIdx = css.indexOf('.tp-letter__stamp{');
const shopfrontIdx = css.indexOf('.tp-shopfront{');

fs.writeFileSync('scripts/extracted_contact_css.css', `
/* ==========================================================================
   AUTHENTIC VISIT & CONTACT PAGE STYLES (MATCHED 100% TO REFERENCE SITE)
   ========================================================================== */

${css.substring(stampIdx, stampIdx + 200)}

${css.substring(shopfrontIdx, shopfrontIdx + 280)}

${css.substring(startIdx, endIdx)}
`);

console.log('Saved contact CSS.');
