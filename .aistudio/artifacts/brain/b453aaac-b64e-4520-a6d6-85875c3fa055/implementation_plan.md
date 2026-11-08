# StripScan Checker – Implementation Plan & Architecture

StripScan Checker is an offline-first, mobile-and-desktop web application designed for the TCS iON Hackathon (Food Adulteration Detector under the Inclusive Workforce theme). It bridges the gap between low-digital-skill dairy frontline workers running chemical paper strip tests and quality managers requiring strict batch traceability, supplier risk scores, and Root Cause Analysis (RCA).

---

## 1. Feature Scope Finalisation

### Must-Have Features (Core Hackathon Prototype)
1. **Guided Frontline Worker Test Flow (Mobile-First)**:
   - **Step 1: Batch Info Entry**: Large touch targets for Batch ID, Supplier selector (with quick "+ Add Supplier"), and Collection Centre / Location.
   - **Step 2: Pictorial Instructions (3 visual steps)**:
     - Step 1: Collect fresh milk sample in clean cup.
     - Step 2: Dip strip for 3–5 seconds and wait 30 seconds.
     - Step 3: Place strip flat on the reference card under good light.
   - **Step 3: Camera & Demo Simulation Picker**: Real camera photo capture (`<input type="file" accept="image/*" capture="environment">`) PLUS one-tap pre-calibrated sample strip buttons (Safe, Suspicious, Adulterated/Reject) for instant, reliable judge demonstration.
   - **Step 4: In-Browser Color Interpretation**: HTML5 Canvas pixel sampling comparing strip RGB metrics to pre-calibrated adulterant thresholds.
   - **Step 5: Traffic-Light Verdict Screen**: Clear Green ("Safe"), Amber ("Suspicious / Retest"), Red ("Reject - Adulterant Detected") with direct action recommendation.
   - **Step 6: Hold / Release Decision**: Mandatory binary decision; auto-defaults to "HOLD" on Suspicious/Reject, with optional voice-of-worker note.

2. **Quality Manager & Food Officer Dashboard (Desktop & Tablet)**:
   - **Batch History & Traceability Ledger**: Searchable, filterable by date, supplier, verdict, and Hold/Release status.
   - **Supplier Risk Scorecard**: Aggregated safety statistics (% Safe, % Suspicious, % Reject), total milk volume checked, and High/Medium/Low risk rating to spot repeat offenders.
   - **Root Cause Analysis (RCA) Workflow**: Interactive form on any batch to record suspected adulterant (Water dilution, Urea/Fertilizer, Detergent/Neutralizer, Starch, Synthetic milk), corrective action, assigned inspector, and closure status.

3. **Inclusivity & Offline Operations**:
   - **Tri-Lingual Interface**: Instant toggle between English, Hindi (हिंदी), and Marathi (मराठी) without page reload.
   - **100% Offline Resilience**: Stored locally in `localStorage` with preloaded realistic Indian dairy cooperatives dataset (e.g., Anand Milk Union, Baramati Dairy, Sangamner Collection Hub).
   - **Strict Vanilla Stack**: Pure HTML5, semantic CSS3, and modular Vanilla JS (`index.html`, `style.css`, `script.js`).

### Nice-to-Have Features (Post-Hackathon Roadmap)
- Built-in live audio voiceover instructions in Marathi/Hindi for illiterate workers.
- Bluetooth / BLE integration with digital refractometers and milk analyzers.
- Cloud sync with State Food Safety & Standards Authority (FSSAI) reporting portal.
- GPS auto-tagging of remote village milk collection centers.

---

## 2. User Flows & Screen Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STRIPSCAN CHECKER                                 │
│          Header: App Brand | Role Switcher | Language (EN/HI/MR)            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     FRONTLINE WORKER VIEW     │             │    QUALITY MANAGER VIEW       │
│        (Mobile-First)         │             │      (Desktop-First)          │
├───────────────────────────────┤             ├───────────────────────────────┤
│ 1. Batch Info Entry Form      │             │ 1. Live KPI Summary Cards     │
│ 2. Step 1: Collect Milk       │             │    - Batches Tested Today     │
│ 3. Step 2: Dip & Wait Timer   │             │    - On-Hold Batches Alert    │
│ 4. Step 3: Align on Card      │             │    - High-Risk Suppliers      │
│ 5. Photo Capture / Demo Pick  │             │ 2. Traceability Ledger Table  │
│ 6. In-Canvas Color Analysis   │             │    (Search, Filter, Export)   │
│ 7. Traffic Light Verdict      │             │ 3. Supplier Risk Matrix       │
│ 8. Hold or Release Action     │             │ 4. Root Cause Analysis Modal  │
└───────────────────────────────┘             └───────────────────────────────┘
```

### Worker Flow (Step-by-Step Mobile Experience)
1. **Screen W1 (Landing & Batch Identification)**:
   - Large buttons: "Start Milk Batch Test" or "Review Today's Tests".
   - Inputs: Batch ID (auto-generated e.g. `MK-2026-104` with manual edit), Supplier Dropdown (`Gopal Dairy`, `Shree Krupa Farm`, etc.), Location (`Village Shed #4`).
2. **Screen W2 (Pictorial Test Guide)**:
   - Big visual cards with universal icons: Clean beaker, dipping strip with interactive 10-second countdown beep/visual, placing on white reference border.
3. **Screen W3 (Strip Scan & Camera)**:
   - Camera trigger button.
   - Quick Demo Test Presets:
     - `[Demo: Fresh Pure Milk - Green]`
     - `[Demo: Diluted Water / Neutralizer - Amber]`
     - `[Demo: Urea / Detergent Detected - Red]`
4. **Screen W4 (Color Verdict & Traffic Light)**:
   - Analyzed sample swatch vs baseline scale.
   - Large color disk: **GREEN (Safe)** / **AMBER (Suspicious)** / **RED (Reject)**.
   - Simple audio/text guidance: *"Safe for chilling tank"* vs *"Hazard detected: Do not dump into bulk tank"*.
5. **Screen W5 (Hold / Release Decision)**:
   - Prominent toggle: "HOLD BATCH" (Red) vs "RELEASE TO TANK" (Green).
   - "Confirm & Log Batch" button saves record to local database immediately.

### Quality Manager Flow (Desktop Command View)
1. **Summary Bar**: Today's reception statistics, rejection rate, active holds.
2. **Batch Traceability Table**: View batch timestamps, photos, measured RGB parameters, worker ID, and status.
3. **Supplier Risk Scorecard**: Matrix showing supplier reliability, repeat adulteration incidents, and compliance level.
4. **Root Cause Analysis (RCA) Panel**: Deep-dive on failed batches to log investigation findings (e.g., "Farmer added water to increase volume" or "Residue detergent in transport can").

---

## 3. Demo Simulation Strategy & Honest Pitch to Judges

### What We Simulate in the Demo
1. **Pre-calibrated Strip Sample Presets**:
   - Because live chemical milk strips require real milk, hazardous urea/detergent chemicals, and precision test strips at the competition desk, we provide **3 realistic simulated strip cards with realistic color swatches** directly inside the camera interface.
   - When clicked, they load real camera images of milk test strips showing distinct chemical reactions (Neutral yellow/cream for pure milk, faint pink/green for borderlines, dark purple/deep magenta for urea/detergent).
2. **Real-Time Client-Side Colorimetric Pixel Analysis**:
   - The analysis is **100% genuine code, not a fake hardcoded timer**. The image is rendered to an HTML5 canvas, the central reaction zone is sampled for average RGB values, color distances are calculated against calibrated adulteration scales, and the verdict is computed mathematically in real time!
3. **Pre-Seeded Regional Dairy Operations Data**:
   - 12 realistic past batches and 4 suppliers to give judges an instant look at trends, repeat offender detection, and completed RCA logs.

### Honest Pitch Script to Judges (What to say)
> *"Judges, in the dairy sector, over 70% of milk reception happens at rural collection centers managed by workers with low digital literacy. Currently, testing relies on naked-eye color comparison on paper strips under poor lighting, and results are scribbled in paper registers that get lost.*
>
> *With StripScan Checker, we built an inclusive, mobile-first, zero-barrier tool. Workers don't need to read English or interpret complex chemistry—they follow simple pictorial steps, snap the strip with their phone, and get an immediate Safe/Hold verdict.*
>
> *For this live demo, rather than mixing hazardous urea and detergent at the booth, we loaded calibrated reference strip images from real laboratory milk strip tests. Our software genuinely runs client-side image processing on HTML5 Canvas to measure RGB saturation in real time. It works completely offline without internet, and immediately flags repeat-offender suppliers on the Quality Manager dashboard for Root Cause Analysis."*

---

## 4. Technical Architecture & File Layout

- `/index.html`: Clean, semantic HTML5 containing both the mobile worker view and the desktop quality manager dashboard, language hooks (`data-i18n`), and accessible components.
- `/style.css`: Clean, professional industrial design system.
  - Palette: Dairy Clean White (`#F8FAFC`), Cream Slate (`#F1F5F9`), Deep Milk-Can Navy (`#0F172A`), Traffic-Light Green (`#16A34A`), Warning Amber (`#D97706`), Hazard Crimson (`#DC2626`).
  - Zero purple/neon AI slop.
  - Touch targets $\ge 48\text{px}$, high-contrast typography (`DM Sans` / `Plus Jakarta Sans`).
- `/script.js`:
  - Multilingual dictionary (EN, HI, MR).
  - State management (`localStorage` persistence with seed data).
  - Camera & file handling + HTML5 Canvas pixel sampling algorithm.
  - Supplier risk math & RCA submission handlers.
