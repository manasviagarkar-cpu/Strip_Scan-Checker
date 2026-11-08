## 1. Problem Statement

Milk and dairy adulteration is widespread in India. Many small dairies and food factories already use cheap paper test strips (for urea, detergent, starch, water content, etc.), but:

- Workers must visually compare strip colors to a printed scale, which is hard in low light and with subtle color differences.
- Workers often have low digital literacy and limited time; existing food safety tools assume high literacy and are designed mainly for documentation/compliance staff, not frontline workers.
- Results are rarely logged systematically per batch, making it hard to trace unsafe batches, identify risky suppliers, or perform Root Cause Analysis (RCA).
- Poor or no connectivity in rural areas prevents real-time cloud-based tools from working reliably.

This leads to:
- Incorrect or skipped tests
- Unsafe milk batches passing “safe”
- No visibility into repeat-offender suppliers or high-risk sites
- Weak data for regulators, quality managers, and brands


## 2. Solution Overview – StripScan Checker

StripScan Checker is a **mobile-first web app** (HTML/CSS/vanilla JS) that helps dairy and small food factory workers **use paper test strips correctly and interpret them reliably**.

Core idea:
- Workers follow **pictorial, step-by-step instructions** to run a strip test on a milk batch.
- They use the phone’s camera to **snap a photo of the test strip**.
- The app does **basic color analysis** in-browser, comparing the strip color to a pre-calibrated color scale image (within the app), and produces a **traffic-light verdict**:
  - Green: **Safe**
  - Amber: **Suspicious**
  - Red: **Reject**
- Results are **saved batch-wise** with supplier and location data, viewable as:
  - **Batch history**
  - **Hold / Release decisions**
  - **Supplier risk scorecard**
  - **Batch traceability & Root Cause Analysis**

The app is:
- **Designed for low digital skills**: big buttons, minimal text, 1–2 actions per screen, pictograms, and **language toggle** (English/Hindi/Marathi).
- **Offline-first**: Works without internet by using localStorage / IndexedDB; sync can be added later.


## 3. Target Users

**Primary Users (Frontline Workers)**
- Dairy collection center operators
- Small dairy plant workers (milk reception, quality testing)
- Small food factory workers handling milk-based products

Needs:
- Extremely simple UI (large icons, minimal steps).
- No need to interpret colors or chemistry themselves.
- Works **offline** on low-end Android phones and low-resolution cameras.
- Quick tests that fit into existing milk reception workflow.

**Secondary Users**
- Quality managers at dairies/brands
- Food safety officers/inspectors
- Procurement teams monitoring suppliers

Needs:
- **Batch-wise test history**
- **Supplier risk scores** to detect repeat offenders
- **Batch traceability**: which supplier/lots went into which batch
- **Root Cause Analysis** view to record what went wrong and corrective actions
- Data export potential (CSV/JSON) for audits (can be stubbed for hackathon).


## 4. Key Features

These MUST be implemented and referenced throughout the build:

1. **Guided Test Strip Analysis**
   - Step-by-step pictorial instructions for:
     - Taking a milk sample
     - Dipping the strip
     - Waiting time
     - Placing strip on a reference card
     - Taking the photo correctly
   - Progress indicator (e.g., Step 1–4).
   - Very little text; icons and simple, translatable phrases.

2. **Automated Color Interpretation**
   - Use the phone camera to capture the strip.
   - In-browser image processing (via `<canvas>` in vanilla JS) to:
     - Detect and crop the strip area (simplified assumptions).
     - Average the color in defined strip zones.
     - Compare average color values against a pre-calibrated color scale (hardcoded thresholds).
   - Output: **Safe / Suspicious / Reject** with color-coded traffic light UI.

3. **Batch-wise Result Logging**
   - Each test linked to:
     - Batch ID
     - Supplier
     - Date & time
     - Location (text field; no GPS required)
     - Test type (e.g., “Adulteration Screen – Milk”)
     - Verdict and raw color metrics (for debug)
   - History page:
     - Filter by date, supplier, verdict, Hold/Release status.
     - Responsive table view on desktop; card list on mobile.

4. **Local Language Support**
   - Support **English, Hindi, Marathi** for:
     - All labels, buttons, headers, and key messages.
   - Language switch accessible from top bar and/or first screen:
     - Large toggle buttons (EN | हिंदी | मराठी).
   - Text handled via a simple JS dictionary object.

5. **Offline Functionality**
   - Entire app is static (HTML/CSS/JS) – no server dependency for core features.
   - Data stored locally using `localStorage` (or IndexedDB if needed):
     - Batches
     - Test results
     - RCA notes
     - Supplier list and risk scores
   - App fully usable without network:
     - Run tests, save results, view history and supplier risk.

6. **Dairy-Specific Traceability & Actions**
   - **Hold / Release Decision**:
     - After verdict, prompt: “Hold this batch?” or “Release for dispatch?”
     - Default to **Hold** if Suspicious/Reject.
   - **Supplier Risk Scorecard**:
     - Aggregate per supplier:
       - Total tests
       - % Safe, % Suspicious, % Reject
       - Risk rating (Low/Medium/High) based on thresholds.
   - **Batch Traceability & RCA Page**:
     - Batch detail view:
       - Supplier, date, location
       - Test results & verdict history for that batch
       - Final Hold/Release decision
       - Simple RCA form:
         - Suspected cause (select box + free text)
         - Action taken
         - Responsible person
         - Date of closure


## 5. User Flow

### 5.1 First-Time Use / Landing

1. User opens the web app on a phone.
2. Landing screen:
   - Large title “StripScan Checker”
   - 3 large language buttons: EN / हिंदी / मराठी
   - Primary CTA: “Start New Test”
   - Secondary actions: “View Batches”, “Suppliers”, “Help”

3. User selects language → all UI text switches.

---

### 5.2 Starting a New Test (Guided Test Strip Analysis)

1. User taps “Start New Test”.
2. Screen 1 – **Batch Info**:
   - Fields with large tap targets:
     - Batch ID (text input; required)
     - Supplier (dropdown with existing + “+ Add new supplier”)
     - Location (text input)
   - Big “Next” button.

3. Screen 2 – **Pictorial Instructions 1/3: Prepare Sample**
   - Image: Container + milk + strip.
   - Short text: “Collect sample of milk in a clean cup.”
   - Buttons: “Back”, “Next”.

4. Screen 3 – **Pictorial Instructions 2/3: Dip Strip**
   - Image showing dipping strip, timer icon.
   - Short text: “Dip strip in milk for X seconds, then remove. Wait Y seconds.”
   - Simple countdown timer control (optional for demo; at least static instructions).

5. Screen 4 – **Pictorial Instructions 3/3: Place for Photo**
   - Image showing strip on white card or printed reference mat.
   - Text: “Place strip on the guide card, under good light. Avoid shadows.”
   - Button: “Open Camera”.

---

### 5.3 Capturing Strip Photo & Automated Color Interpretation

1. Screen 5 – **Camera Capture**
   - Use `<input type="file" accept="image/*" capture="environment">` for mobile.
   - Overlay simple guidelines text:
     - “Fit entire strip inside frame.”
   - After user takes/chooses picture, show preview and “Use Photo” / “Retake” buttons.

2. On “Use Photo”:
   - JS loads image into an invisible `<canvas>`.
   - Simple assumption for hackathon:
     - The strip is approximately vertical and central.
     - Predefine a rectangular “analysis zone” in the center of the image.
   - Steps:
     1. Draw the image onto the canvas.
     2. Compute average RGB of pixels within the analysis zone.
     3. Compare average RGB against hard-coded threshold ranges representing:
        - Safe
        - Suspicious
        - Reject
     4. For realism, use 1–2 test zones or just overall color.

3. Screen 6 – **Verdict Screen**
   - Show:
     - Photo thumbnail
     - Color patch representing analyzed average color
     - Big traffic-light circle:
       - Green: “Safe”
       - Amber: “Suspicious”
       - Red: “Reject”
   - Small supporting text (localized) e.g.:
     - “Milk OK for processing” or “Investigate before use” or “Do not use this batch”.
   - Buttons:
     - “Save Result & Continue”
     - “Retake Photo” (re-run analysis)

---

### 5.4 Hold / Release Decision & Batch Save

1. After “Save Result & Continue”:
   - Screen 7 – **Hold / Release Decision**
     - Show summary:
       - Batch ID, Supplier, Date/Time
       - Verdict icon & label
     - Options:
       - Big toggle or 2 buttons:
         - “Hold Batch” (default if verdict is Suspicious/Reject)
         - “Release Batch” (available but warns if verdict ≠ Safe)
     - Optional textarea “Note (optional)”.
     - “Confirm & Save Batch” button.

2. On confirm:
   - Save record in local storage:
     - Batch metadata
     - Verdict
     - Hold/Release status
     - Analysis color metrics
   - Redirect to:
     - “Batch Detail” page or “Batch List” with success banner.

---

### 5.5 View Batch History (Batch-wise Result Logging, Traceability)

1. User taps “View Batches” from main menu.
2. Screen – **Batch List**
   - Filters:
     - Date range
     - Supplier dropdown
     - Verdict (All / Safe / Suspicious / Reject)
     - Status (All / Hold / Release)
   - Display:
     - Mobile: cards with high-contrast:
       - Batch ID
       - Supplier
       - Verdict badge color
       - Status (Hold/Release)
       - Date/Time
     - Desktop: responsive table with same fields.

3. Tapping a batch opens **Batch Detail**:
   - Header: Batch ID, Supplier, Date/time, Location.
   - Section: Test Results
     - Primary verdict and color indicator.
     - Photo thumbnail (if stored as base64 or blob URL).
   - Section: Status
     - Hold/Release
     - Option to change status (with warning).
   - Section: **Traceability & RCA**
     - Fields:
       - “Suspected Cause” (dropdown: Poor milk quality / Equipment cleaning / Water dilution / Unknown / Other)
       - “Details” (free text)
       - “Action Taken” (free text, e.g., “Rejected entire batch; informed supplier”)
       - “Responsible Person” (text)
       - “Date of closure” (date)
     - “Save RCA” button.
   - All RCA data saved to local storage.

---

### 5.6 Supplier Risk Scorecard

1. User taps “Suppliers” from main menu.
2. Screen – **Supplier List**
   - For each supplier:
     - Name
     - Total tests
     - % Safe / % Suspicious / % Reject
     - Risk rating badge: Low (green), Medium (amber), High (red)
       - e.g., High if Reject+Suspicious ≥ 30%.

3. Tapping a supplier:
   - Supplier detail page:
     - Basic info
     - List of latest batches from that supplier (link to Batch Details).
     - Simple chart placeholder (e.g., text-based) summarizing performance:
       - “Last 10 tests: 6 Safe, 3 Suspicious, 1 Reject”.
   - Ability to edit supplier info (name, location) saved locally.

---

### 5.7 Local Language Support in Flow

- The language selection persists:
  - Save selected language code in localStorage.
- All texts (buttons, labels, messages) fetched from a translation object, e.g.:

```js
const translations = {
  en: { startTest: "Start New Test", hold: "Hold Batch", ... },
  hi: { startTest: "नया परीक्षण शुरू करें", hold: "बैच रोकें", ... },
  mr: { startTest: "नवीन चाचणी सुरू करा", hold: "बॅच थांबवा", ... }
};
```

- Toggling language updates displayed texts without page reload (JS re-renders UI text).

---

### 5.8 Offline Use Flow

- Users can:
  - Start new tests
  - View batch history
  - View suppliers and RCA
  - Change language
- All operations read/write from `localStorage` or IndexedDB.
- No network requests required in prototype.


## 6. Technical Approach

### 6.1 Stack & Architecture

- **Frontend only**, no backend.
- **Technologies**:
  - HTML5
  - CSS3 (mobile-first, responsive; Flexbox/Grid)
  - Vanilla JavaScript (ES6+)
- Structure:
  - Single-page app style using simple JS routing based on `data-view` attributes or hash-based navigation.
  - All views in a single `index.html` with conditional display (`display: none`), or dynamically constructed via JS.

### 6.2 Layout & UI/UX

- **Mobile-first**:
  - Base design for ~360px width.
  - Large touch targets (min 44x44px).
  - High-contrast color palette; traffic light colors for verdict/status.
- Responsive design:
  - Use CSS media queries to switch from card layout (mobile) to table layout (desktop) for lists.
- Navigation:
  - Top bar:
    - App logo/title
    - Language toggle (icons + code)
  - Bottom or side nav for main sections:
    - “New Test”, “Batches”, “Suppliers”, “Help”.

### 6.3 Data Model (Stored in localStorage)

Use one main key, e.g., `stripscan_data`, storing JSON with:

```js
{
  batches: [
    {
      id: "BATCH-001",
      supplierId: "SUP-1",
      location: "Village A",
      dateTime: "2026-10-30T10:25:00Z",
      verdict: "safe" | "suspicious" | "reject",
      status: "hold" | "release",
      testType: "milk_adulteration",
      avgColor: { r: 200, g: 210, b: 180 },
      photoDataUrl: "data:image/jpeg;base64,...", // optional
      rca: {
        cause: "Water dilution",
        details: "High water content detected.",
        action: "Rejected batch; informed supplier.",
        responsible: "Ravi",
        closureDate: "2026-10-30"
      }
    }
  ],
  suppliers: [
    {
      id: "SUP-1",
      name: "Supplier A",
      location: "Village A",
      createdAt: "2026-10-30T09:00:00Z"
    }
  ],
  settings: {
    language: "en"
  }
}
```

Initialize with **realistic sample data** on first load (if `stripscan_data` not present) so demo looks populated.

### 6.4 Guided Test Strip Analysis Implementation

- Views:
  - `view-batch-info`
  - `view-instructions-1`
  - `view-instructions-2`
  - `view-instructions-3`
  - `view-camera`
- Each view has:
  - Image placeholders for icons (PNG/SVG) stored locally.
  - Minimal text from translations.
- Navigation between views handled by JS `showView(id)` function that hides others.

### 6.5 Camera & Color Analysis (Automated Color Interpretation)

1. **Image Capture**
   - Use `<input id="photoInput" type="file" accept="image/*" capture="environment">`.
   - On `change`, read the selected file with `FileReader` as data URL.
   - Render preview image and a hidden `<canvas>`.

2. **Canvas Processing**
   - Set canvas size to a fixed resolution (e.g., 200x400 or proportion of image).
   - Draw the image scaled to fit.
   - Define analysis area:
     - Example: central vertical strip: `x = width * 0.4` to `width * 0.6`, `y = height * 0.2` to `0.8`.
   - Loop through pixels in analysis region:
     - `ctx.getImageData()` to read RGBA array.
     - Compute average `r`, `g`, `b`.

3. **Verdict Logic**
   - Hard-code color thresholds (for demo) representing safe/suspicious/reject. For example:
     - Convert to HSV or keep RGB.
     - Example (pseudo):
       ```js
       function getVerdict({ r, g, b }) {
         // Dummy thresholds for hackathon
         const brightness = (r + g + b) / 3;
         if (brightness > 190) return "safe";
         if (brightness > 140) return "suspicious";
         return "reject";
       }
       ```
   - Map to UI:
     - `safe` → green badge & text.
     - `suspicious` → amber badge.
     - `reject` → red badge.

4. **Calibration UI (Optional, if time)**
   - Small settings section that displays current thresholds for transparency, but thresholds can be static for demo.

### 6.6 Batch-wise Logging and Views

- Functions:
  - `saveBatch(batchObj)`:
    - Append to `data.batches`.
    - Save to localStorage.
  - `getBatches(filters)`:
    - Filter by date/supplier/verdict/status.

- Rendering:
  - Use JS to dynamically populate batch list container with cards/table rows.
  - For mobile:
    - Each card clickable to open detail.
  - For desktop:
    - Use `<table>` and CSS styling for readability.

### 6.7 Supplier Risk Scorecard Calculation

- On supplier list render:
  - For each supplier:
    - Filter `batches` where `batch.supplierId === supplier.id`.
    - Count totals per verdict:
      - `safeCount`, `suspiciousCount`, `rejectCount`.
    - Compute percentages.
    - Determine risk:
      ```js
      const riskRatio = (suspiciousCount + rejectCount) / total;
      let risk;
      if (riskRatio < 0.1) risk = "low";
      else if (riskRatio < 0.3) risk = "medium";
      else risk = "high";
      ```
- Display risk badge with color-coded CSS classes.

### 6.8 Local Language Support Mechanism

- Store translations in a JS object (as shown above).
- Global state variable `currentLang`.
- Utility function `t(key)` to get translation.
- All text elements:
  - Either rendered programmatically (e.g., innerText = t('startTest')),
  - Or include `data-i18n="startTest"` attributes and a function `applyTranslations()` that loops through DOM elements and sets text based on `currentLang`.
- Language selection:
  - On click of language button:
    - Set `currentLang` and `data.settings.language`.
    - Save to localStorage.
    - Call `applyTranslations()`.

### 6.9 Offline Functionality

- Entire app is served as static assets. For hackathon:
  - Either host locally or via static hosting (GitHub Pages, etc.).
- Data:
  - Read on startup: check `localStorage.getItem('stripscan_data')`.
  - If none, initialize with default sample data.
- No reliance on network requests, so app works offline after initial load.
- Optionally, add a basic Service Worker for offline caching of HTML/CSS/JS/images (only if time).

### 6.10 Sample Data for Demo

Preload:
- 3–4 suppliers with Indian-style names/locations.
- 10–20 batches spanning:
  - Different dates
  - Mixed verdicts: some Safe, some Suspicious, few Reject.
  - Mixed Hold/Release statuses.
  - Pre-filled RCA for 1–2 rejected batches.

This will make:
- Batch history and supplier risk views look realistic.
- RCA page visible in action.

---

## 7. Success Metrics

For the hackathon prototype (and conceptually for real-world):

1. **Usability for Low-Skill Workers**
   - Workers can complete a full test (from batch info to Hold/Release) in **≤ 3–4 screens** and **≤ 2 minutes**.
   - Informal usability check: new user can perform test without guidance after one demonstration.

2. **Reduction in Interpretation Errors (Conceptual)**
   - In a mock test set with known intended strip outcomes, the app should classify them consistently using its thresholds (no subjective variation between users).
   - Aim for **>90% agreement** with “ground truth” strip outcomes (for demo, simulated).

3. **Data Completeness & Traceability**
   - 100% of tests done via the app are:
     - Linked to a batch, supplier, and timestamp.
     - Visible in batch history.
   - Each batch has:
     - At least one test result
     - Explicit Hold/Release decision.

4. **Supplier Risk Visibility**
   - User (quality manager persona) can:
     - Open Suppliers page.
     - In ≤ 30 seconds identify top 1–2 high-risk suppliers.
   - Supplier risk rating accurately reflects underlying test summaries.

5. **Offline Reliability**
   - Confirm app operation with network disabled:
     - Run at least 3 tests.
     - Close & reopen browser.
     - Data persists and remains accessible.

6. **Language Accessibility**
   - Switch between EN/Hindi/Marathi and:
     - All core screens update labels and key instructions consistently.
   - Test: change language mid-session and run a test without confusion.

These metrics help demonstrate that **StripScan Checker** addresses the root cause: making food safety checks realistic and reliable for frontline workers, while creating structured data that quality managers can actually use.