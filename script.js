/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * StripScan Checker – Core Engine
 * Pure Vanilla JavaScript (No Frameworks, No External Dependencies)
 */

// =============================================================================
// 1. Multilingual Dictionary (English, Hindi, Marathi)
// =============================================================================
const TRANSLATIONS = {
  en: {
    appTitle: "StripScan Checker",
    appSubtitle: "Inclusive Milk Adulteration Detector",
    workerRole: "Worker View",
    managerRole: "Manager View",
    offlineReady: "100% Offline Mode (Local Dairy Storage)",
    
    // Worker Flow
    step1Title: "Step 1: Batch Info",
    step2Title: "Step 2: Dip & Wait",
    step3Title: "Step 3: Strip Scan",
    step4Title: "Step 4: Result & Action",
    
    batchIdLabel: "Batch ID / Lot No.",
    supplierLabel: "Milk Supplier / Farmer",
    locationLabel: "Collection Point / Chilling Center",
    nextBtn: "Next Step",
    backBtn: "Back",
    startTestBtn: "Start New Milk Test",
    
    instrStep1Title: "1. Fresh Sample",
    instrStep1Desc: "Draw 10ml of milk from the intake can into a clean testing cup.",
    instrStep2Title: "2. Dip Chemical Strip",
    instrStep2Desc: "Immerse test pad completely for 3 seconds. Tap edge to shed excess milk.",
    timerLabel: "Reaction Countdown",
    startTimer: "Start 30s Timer",
    timerComplete: "Reaction Complete! Place strip on card.",
    instrStep3Title: "3. Position for Camera",
    instrStep3Desc: "Place strip inside the card outline under direct, non-shadowed light.",
    
    openCameraBtn: "Take Photo with Camera",
    orPickPreset: "Or Run Calibrated Demo Presets:",
    presetSafe: "Pure Milk (Safe)",
    presetSuspicious: "Diluted / Water (Warn)",
    presetReject: "Urea / Detergent (Reject)",
    
    analyzingText: "Analyzing strip color metrics...",
    verdictSafe: "SAFE – Pure Milk",
    verdictSuspicious: "SUSPICIOUS – Dilution Detected",
    verdictReject: "REJECT – Chemical Adulterant Detected",
    
    safeAction: "Milk meets FSSAI quality standards. OK for bulk chilling tank.",
    suspiciousAction: "Abnormal density or dilution. Hold batch and run secondary test.",
    rejectAction: "CRITICAL HAZARD: Foreign adulterant identified. DO NOT UNLOAD.",
    
    holdDecisionTitle: "Log Reception Decision",
    holdBatch: "HOLD BATCH",
    releaseBatch: "RELEASE TO TANK",
    workerNotes: "Worker Observations / Notes (Optional)",
    saveBatchBtn: "Confirm & Save to Ledger",
    testSavedToast: "Batch successfully logged in local ledger!",

    // Manager View
    managerTitle: "Dairy Quality & Traceability Dashboard",
    managerSubtitle: "Batch audit logs, supplier risk evaluation, and root cause analysis",
    kpiTested: "Total Batches Screened",
    kpiSafe: "Passed Safe (%)",
    kpiHold: "Batches on Hold",
    kpiHighRisk: "High-Risk Suppliers",
    
    tabLedger: "Batch Traceability Ledger",
    tabSuppliers: "Supplier Risk Scorecard",
    
    filterAll: "All Verdicts",
    filterSafe: "Safe Only",
    filterSuspicious: "Suspicious Only",
    filterReject: "Reject Only",
    searchPlaceholder: "Search Batch ID or Supplier...",
    
    colBatch: "Batch ID",
    colSupplier: "Supplier",
    colTime: "Date & Time",
    colColor: "Strip Color (RGB)",
    colVerdict: "Verdict",
    colStatus: "Action",
    colActions: "Audit / RCA",
    
    btnRca: "Investigate RCA",
    
    // Supplier Card
    colSupName: "Supplier Name",
    colSupBatches: "Total Deliveries",
    colSupPassRate: "Pass Rate",
    colSupRisk: "Risk Level",
    
    // RCA Modal
    rcaModalTitle: "Root Cause Analysis (RCA) Investigation",
    rcaBatch: "Investigating Batch:",
    rcaSuspectedCause: "Suspected Adulterant / Cause",
    rcaActionTaken: "Corrective & Preventive Action (CAPA)",
    rcaInspector: "Quality Inspector Name",
    rcaClosureDate: "Target Closure Date",
    rcaSaveBtn: "Save RCA Findings",
    rcaCloseBtn: "Cancel",
    rcaSavedToast: "Root Cause Analysis logged successfully!"
  },
  
  hi: {
    appTitle: "स्ट्रिपस्कैन चेकर",
    appSubtitle: "दूध मिलावट जांच प्रणाली",
    workerRole: "कार्यकर्ता दृश्य",
    managerRole: "गुणवत्ता प्रबंधक",
    offlineReady: "100% ऑफ़लाइन मोड (स्थानीय डेयरी डेटा)",
    
    step1Title: "चरण 1: बैच की जानकारी",
    step2Title: "चरण 2: पट्टी डुबोएं और प्रतीक्षा करें",
    step3Title: "चरण 3: पट्टी की फोटो लें",
    step4Title: "चरण 4: परिणाम और निर्णय",
    
    batchIdLabel: "बैच आईडी / लॉट संख्या",
    supplierLabel: "दूध आपूर्तिकर्ता / किसान",
    locationLabel: "दूध संकलन केंद्र / स्थान",
    nextBtn: "आगे बढ़ें",
    backBtn: "पीछे",
    startTestBtn: "नया दूध परीक्षण शुरू करें",
    
    instrStep1Title: "1. ताजा नमूना लें",
    instrStep1Desc: "कैन से 10 मिली दूध साफ कप में निकालें।",
    instrStep2Title: "2. रासायनिक पट्टी डुबोएं",
    instrStep2Desc: "परीक्षण पट्टी को 3 सेकंड के लिए डुबोएं। अतिरिक्त दूध झाड़ लें।",
    timerLabel: "प्रतीक्षा उलटी गिनती",
    startTimer: "30 सेकंड का टाइमर शुरू करें",
    timerComplete: "प्रतीक्षा पूर्ण! पट्टी को गाइड कार्ड पर रखें।",
    instrStep3Title: "3. फोटो के लिए रखें",
    instrStep3Desc: "पट्टी को कार्ड की रूपरेखा पर रखें, अच्छी रोशनी में बिना परछाई के।",
    
    openCameraBtn: "कैमरे से फोटो लें",
    orPickPreset: "या डेमो पट्टी चुनें:",
    presetSafe: "शुद्ध दूध (सुरक्षित)",
    presetSuspicious: "मिलावटी पानी (संदेहास्पद)",
    presetReject: "यूरिया / डिटर्जेंट (खारिज)",
    
    analyzingText: "पट्टी के रंग का विश्लेषण किया जा रहा है...",
    verdictSafe: "सुरक्षित – शुद्ध दूध",
    verdictSuspicious: "संदेहास्पद – पानी या मिलावट का अंदेशा",
    verdictReject: "अस्वीकृत – रासायनिक मिलावट की पुष्टि!",
    
    safeAction: "दूध FSSAI मानकों के अनुरूप है। मुख्य चिलिंग टैंक में डालने हेतु स्वीकृत।",
    suspiciousAction: "असामान्य घनत्व या पानी की मिलावट। बैच रोकें और पुनः जांच करें।",
    rejectAction: "गंभीर खतरा: रासायनिक मिलावट पाई गई। दूध को टैंक में बिल्कुल न डालें!",
    
    holdDecisionTitle: "दूध प्राप्ति पर निर्णय",
    holdBatch: "बैच रोकें (HOLD)",
    releaseBatch: "टैंक में छोड़ें (RELEASE)",
    workerNotes: "कर्मचारी की टिप्पणी (वैकल्पिक)",
    saveBatchBtn: "पुष्टि करें और सहेजें",
    testSavedToast: "बैच का परिणाम स्थानीय रजिस्टर में दर्ज हो गया!",

    managerTitle: "डेयरी गुणवत्ता एवं ट्रेसेबिलिटी डैशबोर्ड",
    managerSubtitle: "बैच रिकॉर्ड, आपूर्तिकर्ता जोखिम मूल्यांकन और मूल कारण विश्लेषण",
    kpiTested: "कुल जाँचे गए बैच",
    kpiSafe: "उत्तीर्ण सुरक्षित (%)",
    kpiHold: "रोके गए बैच",
    kpiHighRisk: "उच्च जोखिम वाले आपूर्तिकर्ता",
    
    tabLedger: "बैच ट्रेसेबिलिटी रजिस्टर",
    tabSuppliers: "आपूर्तिकर्ता जोखिम स्कोरकार्ड",
    
    filterAll: "सभी परिणाम",
    filterSafe: "केवल सुरक्षित",
    filterSuspicious: "केवल संदेहास्पद",
    filterReject: "केवल खारिज",
    searchPlaceholder: "बैच आईडी या आपूर्तिकर्ता खोजें...",
    
    colBatch: "बैच आईडी",
    colSupplier: "आपूर्तिकर्ता",
    colTime: "दिनांक एवं समय",
    colColor: "पट्टी का रंग (RGB)",
    colVerdict: "निष्कर्ष",
    colStatus: "कार्रवाई",
    colActions: "जांच / RCA",
    
    btnRca: "मूल कारण विश्लेषण (RCA)",
    
    colSupName: "आपूर्तिकर्ता का नाम",
    colSupBatches: "कुल आपूर्तियां",
    colSupPassRate: "पास दर",
    colSupRisk: "जोखिम स्तर",
    
    rcaModalTitle: "मूल कारण विश्लेषण (RCA) जांच",
    rcaBatch: "जांच की जा रही बैच:",
    rcaSuspectedCause: "संदेहास्पद मिलावट / कारण",
    rcaActionTaken: "सुधारात्मक कार्रवाई (CAPA)",
    rcaInspector: "गुणवत्ता निरीक्षक का नाम",
    rcaClosureDate: "समापन की अंतिम तिथि",
    rcaSaveBtn: "RCA निष्कर्ष सहेजें",
    rcaCloseBtn: "रद्द करें",
    rcaSavedToast: "मूल कारण विश्लेषण सफलता से दर्ज किया गया!"
  },

  mr: {
    appTitle: "स्ट्रिपस्कॅन चेकर",
    appSubtitle: "दूध भेसळ तपासणी प्रणाली",
    workerRole: "कामगार दृश्य",
    managerRole: "गुणवत्ता व्यवस्थापक",
    offlineReady: "१००% ऑफलाइन मोड (स्थानिक दुग्ध डेटा)",
    
    step1Title: "पायरी १: बॅच माहिती",
    step2Title: "पायरी २: पट्टी बुडवा आणि थांबा",
    step3Title: "पायरी ३: पट्टी स्कॅन करा",
    step4Title: "पायरी ४: निकाल आणि निर्णय",
    
    batchIdLabel: "बॅच आयडी / लॉट क्रमांक",
    supplierLabel: "दूध उत्पादक / पुरवठादार",
    locationLabel: "दूध संकलन केंद्र / ठिकाण",
    nextBtn: "पुढील पायरी",
    backBtn: "मागे",
    startTestBtn: "नवीन दूध चाचणी सुरू करा",
    
    instrStep1Title: "१. ताजा नमुना घ्या",
    instrStep1Desc: "कॅनमधून १० मिली दूध स्वच्छ कपामध्ये घ्या.",
    instrStep2Title: "२. रासायनिक पट्टी बुडवा",
    instrStep2Desc: "चाचणी पट्टी ३ सेकंद दुधात बुडवून काढा. जास्तीचे दूध झटकून टाका.",
    timerLabel: "प्रतीक्षा कालावधी",
    startTimer: "३० सेकंदांचा टायमर सुरू करा",
    timerComplete: "वेळ संपली! पट्टी पांढऱ्या कार्डावर ठेवा.",
    instrStep3Title: "३. फोटोसाठी ठेवा",
    instrStep3Desc: "पट्टी कार्डाच्या रकान्यात ठेवा, सावली न पडता चांगल्या प्रकाशात फोटो घ्या.",
    
    openCameraBtn: "कॅमेऱ्याने फोटो घ्या",
    orPickPreset: "किंवा डेमो पट्टी निवडा:",
    presetSafe: "शुद्ध दूध (सुरक्षित)",
    presetSuspicious: "पाणी भेसळ (संशयास्पद)",
    presetReject: "युरिया / डिटर्जंट (नाकारले)",
    
    analyzingText: "पट्टीच्या रंगाचे विश्लेषण सुरू आहे...",
    verdictSafe: "सुरक्षित – शुद्ध दूध",
    verdictSuspicious: "संशयास्पद – पाण्याची भेसळ शक्यता",
    verdictReject: "नाकारले – घातक रासायनिक भेसळ आढळली!",
    
    safeAction: "दूध मानकांनुसार योग्य आहे. चिलिंग टँकमध्ये टाकण्यास परवानगी.",
    suspiciousAction: "घनता असामान्य किंवा भेसळ. बॅच थांबवा आणि पुन्हा तपासणी करा.",
    rejectAction: "धोका: रासायनिक भेसळ आढळली. हे दूध टँकमध्ये अजिबात टाकू नका!",
    
    holdDecisionTitle: "दूध स्वीकृती निर्णय",
    holdBatch: "बॅच थांबवा (HOLD)",
    releaseBatch: "टँकमध्ये सोडा (RELEASE)",
    workerNotes: "कामगाराची नोंद (पर्यायी)",
    saveBatchBtn: "नोंदणी निश्चित करा",
    testSavedToast: "बॅचची नोंद स्थानिक नोंदवहीत यशस्वीरीत्या झाली!",

    managerTitle: "दुग्ध गुणवत्ता व ट्रेसेबिलिटी डॅशबोर्ड",
    managerSubtitle: "बॅच नोंदवही, पुरवठादार जोखीम मूल्यमापन आणि मूळ कारण विश्लेषण",
    kpiTested: "एकूण तपासलेले बॅचेस",
    kpiSafe: "उत्तीर्ण सुरक्षित (%)",
    kpiHold: "थांबवलेले बॅचेस",
    kpiHighRisk: "जास्त जोखीम असलेले पुरवठादार",
    
    tabLedger: "बॅच ट्रेसेबिलिटी नोंदवही",
    tabSuppliers: "पुरवठादार जोखीम कार्ड",
    
    filterAll: "सर्व निकाल",
    filterSafe: "फक्त सुरक्षित",
    filterSuspicious: "फक्त संशयास्पद",
    filterReject: "फक्त नाकारलेले",
    searchPlaceholder: "बॅच आयडी किंवा पुरवठादार शोधा...",
    
    colBatch: "बॅच आयडी",
    colSupplier: "पुरवठादार",
    colTime: "तारीख व वेळ",
    colColor: "पट्टीचा रंग (RGB)",
    colVerdict: "निकाल",
    colStatus: "निर्णय",
    colActions: "तपासणी / RCA",
    
    btnRca: "मूळ कारण विश्लेषण (RCA)",
    
    colSupName: "पुरवठादाराचे नाव",
    colSupBatches: "एकूण आवक",
    colSupPassRate: "पास प्रमाण",
    colSupRisk: "जोखीम पातळी",
    
    rcaModalTitle: "मूळ कारण विश्लेषण (RCA) तपासणी",
    rcaBatch: "तपासणी बॅच:",
    rcaSuspectedCause: "संभाव्य भेसळ / कारण",
    rcaActionTaken: "केलेली सुधारात्मक कारवाई (CAPA)",
    rcaInspector: "तपासणी अधिकाऱ्याचे नाव",
    rcaClosureDate: "निकालाची अंतिम तारीख",
    rcaSaveBtn: "RCA नोंद जतन करा",
    rcaCloseBtn: "रद्द करा",
    rcaSavedToast: "मूळ कारण विश्लेषण यशस्वीरीत्या जतन केले!"
  }
};

// =============================================================================
// 2. Realistic Seed Data for Hackathon Demonstration
// =============================================================================
const SEED_SUPPLIERS = [
  { id: "SUP-01", name: "Baramati Sahakari Dairy", location: "Baramati Hub #2", contact: "+91 98220 11223" },
  { id: "SUP-02", name: "Shree Krupa Dairy Farm", location: "Sangamner Center", contact: "+91 94230 44556" },
  { id: "SUP-03", name: "Gopal Milk Collection", location: "Shirur Village Shed", contact: "+91 97660 77889" },
  { id: "SUP-04", name: "Anand Cooperative Union", location: "Bhor Chilling Unit", contact: "+91 91580 99001" }
];

const SEED_BATCHES = [
  {
    id: "MK-2026-101",
    supplierId: "SUP-01",
    supplierName: "Baramati Sahakari Dairy",
    location: "Baramati Hub #2",
    dateTime: "2026-10-29 06:15",
    verdict: "safe",
    status: "release",
    rgb: { r: 245, g: 238, b: 155 },
    notes: "Morning batch delivery. Milk odor fresh and density normal.",
    rca: null
  },
  {
    id: "MK-2026-102",
    supplierId: "SUP-03",
    supplierName: "Gopal Milk Collection",
    location: "Shirur Village Shed",
    dateTime: "2026-10-29 07:40",
    verdict: "reject",
    status: "hold",
    rgb: { r: 185, g: 25, b: 110 },
    notes: "Chemical strip turned deep magenta within 5 seconds.",
    rca: {
      cause: "Urea / Fertilizer Contamination",
      details: "Synthetic nitrogen additive suspected to inflate SNF reading.",
      action: "500L tanker quarantined. Supplier payment withheld pending lab chromatography.",
      inspector: "Sunil Deshmukh (Food Safety Officer)",
      closureDate: "2026-11-02"
    }
  },
  {
    id: "MK-2026-103",
    supplierId: "SUP-02",
    supplierName: "Shree Krupa Dairy Farm",
    location: "Sangamner Center",
    dateTime: "2026-10-29 08:20",
    verdict: "suspicious",
    status: "hold",
    rgb: { r: 248, g: 212, b: 115 },
    notes: "Slight amber tint. Suspected water dilution or neutralizer wash.",
    rca: {
      cause: "Water Dilution / Density Drop",
      details: "Lactometer confirmed specific gravity below 1.026.",
      action: "Warning issued to collection operator; batch routed to casein processing.",
      inspector: "Ramesh Patil",
      closureDate: "2026-10-31"
    }
  },
  {
    id: "MK-2026-104",
    supplierId: "SUP-04",
    supplierName: "Anand Cooperative Union",
    location: "Bhor Chilling Unit",
    dateTime: "2026-10-29 09:10",
    verdict: "safe",
    status: "release",
    rgb: { r: 244, g: 236, b: 160 },
    notes: "Grade A buffalo milk. Tested safe for pouch packaging.",
    rca: null
  },
  {
    id: "MK-2026-105",
    supplierId: "SUP-03",
    supplierName: "Gopal Milk Collection",
    location: "Shirur Village Shed",
    dateTime: "2026-10-28 17:30",
    verdict: "reject",
    status: "hold",
    rgb: { r: 178, g: 30, b: 125 },
    notes: "Detergent traces detected via surfactant strip test.",
    rca: {
      cause: "Detergent / Washing Soda Residue",
      details: "Improper rinsing of 40-liter aluminum transport cans.",
      action: "Farmer trained on 3-stage hot water sanitization protocol.",
      inspector: "Sunil Deshmukh",
      closureDate: "2026-10-29"
    }
  },
  {
    id: "MK-2026-106",
    supplierId: "SUP-01",
    supplierName: "Baramati Sahakari Dairy",
    location: "Baramati Hub #2",
    dateTime: "2026-10-28 18:00",
    verdict: "safe",
    status: "release",
    rgb: { r: 246, g: 240, b: 158 },
    notes: "Evening milk. Clear test.",
    rca: null
  }
];

// =============================================================================
// 3. Application State & Storage
// =============================================================================
let currentLang = localStorage.getItem("stripscan_lang") || "en";
let currentRole = "worker"; // 'worker' | 'manager'
let currentStep = 1;

let appData = {
  suppliers: [],
  batches: []
};

// Current active worker test buffer
let activeTest = {
  batchId: "",
  supplierId: "",
  supplierName: "",
  location: "",
  rgb: { r: 245, g: 238, b: 155 },
  verdict: "safe",
  status: "release",
  notes: ""
};

let timerInterval = null;
let timerSeconds = 30;

// Initialize Storage
function initStorage() {
  const stored = localStorage.getItem("stripscan_db");
  if (stored) {
    try {
      appData = JSON.parse(stored);
    } catch (e) {
      console.warn("Storage reset needed", e);
      appData = { suppliers: SEED_SUPPLIERS, batches: SEED_BATCHES };
      saveStorage();
    }
  } else {
    appData = { suppliers: SEED_SUPPLIERS, batches: SEED_BATCHES };
    saveStorage();
  }
}

function saveStorage() {
  localStorage.setItem("stripscan_db", JSON.stringify(appData));
}

// =============================================================================
// 4. Internationalization & UI Translation
// =============================================================================
function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

function updateTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && t(key)) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (key && t(key)) {
      el.setAttribute("placeholder", t(key));
    }
  });

  // Update dynamic buttons/indicators
  const timerBtn = document.getElementById("timerBtn");
  if (timerBtn && timerInterval === null && timerSeconds === 30) {
    timerBtn.textContent = t("startTimer");
  }

  // Update verdict details if on Step 4
  if (currentStep === 4) {
    renderVerdictCard();
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("stripscan_lang", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  updateTranslations();
  renderManagerDashboard();
}

// =============================================================================
// 5. Navigation & Role Switching
// =============================================================================
function setRole(role) {
  currentRole = role;
  
  document.getElementById("btnRoleWorker").classList.toggle("active", role === "worker");
  document.getElementById("btnRoleManager").classList.toggle("active", role === "manager");

  const workerPanel = document.getElementById("workerPanel");
  const managerPanel = document.getElementById("managerPanel");

  if (role === "worker") {
    workerPanel.classList.add("active");
    managerPanel.classList.remove("active");
  } else {
    workerPanel.classList.remove("active");
    managerPanel.classList.add("active");
    renderManagerDashboard();
  }
}

function setWorkerStep(step) {
  currentStep = step;
  
  // Update progress bar
  for (let i = 1; i <= 4; i++) {
    const seg = document.getElementById(`progSeg${i}`);
    if (seg) seg.classList.toggle("done", i <= step);
    const stepEl = document.getElementById(`workerStep${i}`);
    if (stepEl) stepEl.style.display = i === step ? "block" : "none";
  }

  const indicator = document.getElementById("stepIndicatorText");
  if (indicator) {
    indicator.textContent = `${t("step1Title").split(":")[0]} ${step}/4`;
  }
}

// Auto-generate realistic Batch ID
function generateNewBatchId() {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `MK-${new Date().getFullYear()}-${randomNum}`;
}

function resetWorkerTest() {
  activeTest = {
    batchId: generateNewBatchId(),
    supplierId: appData.suppliers[0]?.id || "SUP-01",
    supplierName: appData.suppliers[0]?.name || "Baramati Sahakari Dairy",
    location: "Chilling Center #1",
    rgb: { r: 245, g: 238, b: 155 },
    verdict: "safe",
    status: "release",
    notes: ""
  };

  document.getElementById("batchIdInput").value = activeTest.batchId;
  document.getElementById("locationInput").value = activeTest.location;
  populateSupplierSelect();
  
  // Reset Timer
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 30;
  const digits = document.getElementById("timerDigits");
  if (digits) digits.textContent = "00:30";
  const timerBtn = document.getElementById("timerBtn");
  if (timerBtn) timerBtn.textContent = t("startTimer");

  setWorkerStep(1);
}

function populateSupplierSelect() {
  const sel = document.getElementById("supplierSelect");
  if (!sel) return;
  sel.innerHTML = "";
  
  appData.suppliers.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (${s.location})`;
    sel.appendChild(opt);
  });
}

// =============================================================================
// 6. Interactive Timer (Step 2)
// =============================================================================
function toggleTimer() {
  const digits = document.getElementById("timerDigits");
  const timerBtn = document.getElementById("timerBtn");

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerBtn.textContent = t("startTimer");
    return;
  }

  timerInterval = setInterval(() => {
    timerSeconds--;
    const displaySec = timerSeconds < 10 ? `0${timerSeconds}` : `${timerSeconds}`;
    digits.textContent = `00:${displaySec}`;

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      digits.textContent = "00:00";
      timerBtn.textContent = t("timerComplete");
      showToast(t("timerComplete"));
    }
  }, 1000);

  timerBtn.textContent = "Pause";
}

// =============================================================================
// 7. Computer Vision & Color Analysis (Step 3)
// Genuine In-Browser HTML5 Canvas Pixel Color Sampling Algorithm
// =============================================================================
function processStripImage(imgSource) {
  const canvas = document.getElementById("previewCanvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = 400;
  canvas.height = 300;

  // Draw image scaled to canvas
  ctx.drawImage(imgSource, 0, 0, canvas.width, canvas.height);

  // Define analysis test zone (center vertical pad of the strip)
  const zoneX = Math.floor(canvas.width * 0.42);
  const zoneY = Math.floor(canvas.height * 0.25);
  const zoneW = Math.floor(canvas.width * 0.16);
  const zoneH = Math.floor(canvas.height * 0.50);

  const imgData = ctx.getImageData(zoneX, zoneY, zoneW, zoneH);
  const data = imgData.data;

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let count = 0;

  // Calculate average RGB within test zone
  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
    count++;
  }

  const avgR = Math.round(totalR / count);
  const avgG = Math.round(totalG / count);
  const avgB = Math.round(totalB / count);

  activeTest.rgb = { r: avgR, g: avgG, b: avgB };

  // Calibrated Chemical Color Classification Thresholds:
  // Pure Milk (Safe): Pale yellow/cream pad (High red, high green, low/moderate blue, R+G > 420, G >= B)
  // Dilution (Suspicious): Watery pale or grey/amber off-tone
  // Urea / Detergent (Reject): Striking chemical discoloration - deep pink, purple, or magenta (High red, low green, elevated blue, R - G > 70)
  
  const rgDiff = avgR - avgG;
  const gbRatio = avgG / (avgB || 1);

  if (rgDiff > 65 || (avgR > 160 && avgG < 60 && avgB > 80)) {
    // Chemical adulterant reaction (Urea or synthetic neutralizer)
    activeTest.verdict = "reject";
    activeTest.status = "hold";
  } else if (rgDiff > 25 || gbRatio < 1.15 || (avgR + avgG + avgB < 360)) {
    // Water dilution / density anomaly
    activeTest.verdict = "suspicious";
    activeTest.status = "hold";
  } else {
    // Unadulterated fresh milk
    activeTest.verdict = "safe";
    activeTest.status = "release";
  }

  // Draw overlay bounding box on canvas to show the analysis occurred
  ctx.strokeStyle = activeTest.verdict === "safe" ? "#16a34a" : (activeTest.verdict === "suspicious" ? "#d97706" : "#dc2626");
  ctx.lineWidth = 3;
  ctx.strokeRect(zoneX, zoneY, zoneW, zoneH);

  // Transition to Step 4 Verdict
  renderVerdictCard();
  setWorkerStep(4);
}

// Generate Calibrated Synthetic Strip on Canvas for Demo
function generateDemoStripImage(type) {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = 400;
  tempCanvas.height = 300;
  const ctx = tempCanvas.getContext("2d");

  // Neutral background mat
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(0, 0, 400, 300);

  // White reference strip guide card
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(100, 30, 200, 240);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 30, 200, 240);

  // Paper strip carrier
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(180, 50, 40, 200);

  // Chemical pad reaction color
  let padColor = "";
  if (type === "safe") {
    padColor = "rgb(245, 238, 155)"; // Pure pale yellow
  } else if (type === "suspicious") {
    padColor = "rgb(248, 212, 115)"; // Off-tone amber (water dilution)
  } else {
    padColor = "rgb(182, 28, 115)"; // Deep magenta/purple (Urea/Detergent)
  }

  ctx.fillStyle = padColor;
  ctx.fillRect(185, 90, 30, 80);

  // Add realistic fiber texture and noise
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    ctx.fillRect(185 + Math.random() * 30, 90 + Math.random() * 80, 2, 2);
  }

  processStripImage(tempCanvas);
}

// Camera File Input Listener
function handleCameraUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      processStripImage(img);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// =============================================================================
// 8. Verdict & Hold / Release Logic (Step 4)
// =============================================================================
function renderVerdictCard() {
  const card = document.getElementById("verdictCard");
  const icon = document.getElementById("verdictIcon");
  const title = document.getElementById("verdictTitle");
  const msg = document.getElementById("verdictMsg");
  const metrics = document.getElementById("verdictMetrics");
  const holdRadio = document.querySelector('input[name="holdRelease"][value="hold"]');
  const releaseRadio = document.querySelector('input[name="holdRelease"][value="release"]');

  card.className = "verdict-card";

  if (activeTest.verdict === "safe") {
    card.classList.add("verdict-safe");
    icon.textContent = "✓";
    title.textContent = t("verdictSafe");
    msg.textContent = t("safeAction");
    releaseRadio.checked = true;
  } else if (activeTest.verdict === "suspicious") {
    card.classList.add("verdict-suspicious");
    icon.textContent = "!";
    title.textContent = t("verdictSuspicious");
    msg.textContent = t("suspiciousAction");
    holdRadio.checked = true;
  } else {
    card.classList.add("verdict-reject");
    icon.textContent = "✕";
    title.textContent = t("verdictReject");
    msg.textContent = t("rejectAction");
    holdRadio.checked = true;
  }

  metrics.innerHTML = `
    <span>R: <strong>${activeTest.rgb.r}</strong></span>
    <span>G: <strong>${activeTest.rgb.g}</strong></span>
    <span>B: <strong>${activeTest.rgb.b}</strong></span>
    <span>Swatch: <span class="swatch-dot" style="background: rgb(${activeTest.rgb.r}, ${activeTest.rgb.g}, ${activeTest.rgb.b});"></span></span>
  `;
}

function handleSaveBatch() {
  const selectedDecision = document.querySelector('input[name="holdRelease"]:checked')?.value || "hold";
  const notes = document.getElementById("workerNotesInput")?.value || "";

  const finalRecord = {
    id: activeTest.batchId,
    supplierId: activeTest.supplierId,
    supplierName: activeTest.supplierName,
    location: activeTest.location,
    dateTime: new Date().toISOString().replace("T", " ").substring(0, 16),
    verdict: activeTest.verdict,
    status: selectedDecision,
    rgb: activeTest.rgb,
    notes: notes,
    rca: null
  };

  // Prepend to database
  appData.batches.unshift(finalRecord);
  saveStorage();

  showToast(t("testSavedToast"));

  // Reset and return to step 1
  resetWorkerTest();
}

// =============================================================================
// 9. Quality Manager Dashboard & Analytics
// =============================================================================
function renderManagerDashboard() {
  const totalBatches = appData.batches.length;
  const safeCount = appData.batches.filter((b) => b.verdict === "safe").length;
  const holdCount = appData.batches.filter((b) => b.status === "hold").length;
  const passRate = totalBatches ? Math.round((safeCount / totalBatches) * 100) : 100;

  // Compute High Risk Suppliers (Reject + Suspicious >= 30%)
  const supStats = computeSupplierStats();
  const highRiskCount = supStats.filter((s) => s.riskLevel === "high").length;

  document.getElementById("kpiTotalTested").textContent = totalBatches;
  document.getElementById("kpiPassRate").textContent = `${passRate}%`;
  document.getElementById("kpiHeldBatches").textContent = holdCount;
  document.getElementById("kpiHighRiskSuppliers").textContent = highRiskCount;

  renderTraceabilityTable();
  renderSupplierScorecard(supStats);
}

function computeSupplierStats() {
  return appData.suppliers.map((sup) => {
    const batches = appData.batches.filter((b) => b.supplierId === sup.id);
    const total = batches.length;
    const safe = batches.filter((b) => b.verdict === "safe").length;
    const suspicious = batches.filter((b) => b.verdict === "suspicious").length;
    const reject = batches.filter((b) => b.verdict === "reject").length;

    const failRatio = total > 0 ? (suspicious + reject) / total : 0;
    let riskLevel = "low";
    if (failRatio >= 0.3) riskLevel = "high";
    else if (failRatio >= 0.15) riskLevel = "medium";

    const passRate = total > 0 ? Math.round((safe / total) * 100) : 100;

    return {
      ...sup,
      total,
      safe,
      suspicious,
      reject,
      passRate,
      riskLevel
    };
  });
}

function renderTraceabilityTable() {
  const tbody = document.getElementById("traceabilityTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const searchTerm = (document.getElementById("batchSearchInput")?.value || "").toLowerCase();
  const filterVerdict = document.getElementById("verdictFilter")?.value || "all";

  const filtered = appData.batches.filter((b) => {
    const matchesSearch = b.id.toLowerCase().includes(searchTerm) || b.supplierName.toLowerCase().includes(searchTerm);
    const matchesVerdict = filterVerdict === "all" || b.verdict === filterVerdict;
    return matchesSearch && matchesVerdict;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No milk batches match this filter criteria.</td></tr>`;
    return;
  }

  filtered.forEach((b) => {
    const tr = document.createElement("tr");

    const verdictBadgeClass = b.verdict === "safe" ? "badge-safe" : (b.verdict === "suspicious" ? "badge-suspicious" : "badge-reject");
    const statusBadgeClass = b.status === "release" ? "badge-release" : "badge-hold";

    tr.innerHTML = `
      <td class="tabular-nums font-bold"><strong>${b.id}</strong></td>
      <td>${b.supplierName}<br><span style="font-size:0.75rem; color:var(--text-dim);">${b.location}</span></td>
      <td class="tabular-nums" style="font-size:0.8rem;">${b.dateTime}</td>
      <td>
        <span class="swatch-dot" style="background: rgb(${b.rgb.r}, ${b.rgb.g}, ${b.rgb.b});"></span>
        <span class="tabular-nums" style="font-size:0.75rem;">(${b.rgb.r}, ${b.rgb.g}, ${b.rgb.b})</span>
      </td>
      <td><span class="badge ${verdictBadgeClass}">${b.verdict}</span></td>
      <td><span class="badge ${statusBadgeClass}">${b.status.toUpperCase()}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openRcaModal('${b.id}')">
          ${b.rca ? "✓ View RCA" : "+ Log RCA"}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderSupplierScorecard(supStats) {
  const tbody = document.getElementById("supplierScorecardBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  supStats.forEach((s) => {
    const tr = document.createElement("tr");

    let riskClass = "risk-pill-low";
    let riskLabel = "Low Risk";
    if (s.riskLevel === "high") {
      riskClass = "risk-pill-high";
      riskLabel = "High Risk (Watch)";
    } else if (s.riskLevel === "medium") {
      riskClass = "risk-pill-med";
      riskLabel = "Moderate Risk";
    }

    tr.innerHTML = `
      <td><strong>${s.name}</strong><br><span style="font-size:0.75rem; color:var(--text-dim);">${s.location}</span></td>
      <td class="tabular-nums" style="text-align:center;">${s.total}</td>
      <td class="tabular-nums" style="text-align:center;">
        <span style="color:var(--status-safe); font-weight:700;">${s.safe}</span> / 
        <span style="color:var(--status-warning); font-weight:700;">${s.suspicious}</span> / 
        <span style="color:var(--status-danger); font-weight:700;">${s.reject}</span>
      </td>
      <td class="tabular-nums" style="text-align:center; font-weight:700;">${s.passRate}%</td>
      <td style="text-align:center;"><span class="${riskClass}">${riskLabel}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// =============================================================================
// 10. Root Cause Analysis (RCA) Modal
// =============================================================================
let activeRcaBatchId = null;

window.openRcaModal = function (batchId) {
  const batch = appData.batches.find((b) => b.id === batchId);
  if (!batch) return;

  activeRcaBatchId = batchId;

  document.getElementById("rcaBatchInfo").textContent = `${batch.id} – ${batch.supplierName} (${batch.dateTime})`;
  
  const causeSelect = document.getElementById("rcaCauseSelect");
  const actionText = document.getElementById("rcaActionInput");
  const inspectorText = document.getElementById("rcaInspectorInput");
  const dateInput = document.getElementById("rcaDateInput");

  if (batch.rca) {
    causeSelect.value = batch.rca.cause;
    actionText.value = batch.rca.action;
    inspectorText.value = batch.rca.inspector;
    dateInput.value = batch.rca.closureDate;
  } else {
    // Sensible defaults
    causeSelect.value = batch.verdict === "reject" ? "Urea / Fertilizer Contamination" : "Water Dilution / Density Drop";
    actionText.value = "";
    inspectorText.value = "Inspector Sunil Deshmukh";
    dateInput.value = new Date().toISOString().substring(0, 10);
  }

  document.getElementById("rcaModal").classList.add("active");
};

function closeRcaModal() {
  document.getElementById("rcaModal").classList.remove("active");
  activeRcaBatchId = null;
}

function saveRcaFindings() {
  if (!activeRcaBatchId) return;

  const batch = appData.batches.find((b) => b.id === activeRcaBatchId);
  if (!batch) return;

  const cause = document.getElementById("rcaCauseSelect").value;
  const action = document.getElementById("rcaActionInput").value || "Corrective inspection scheduled.";
  const inspector = document.getElementById("rcaInspectorInput").value || "Officer in Charge";
  const closureDate = document.getElementById("rcaDateInput").value;

  batch.rca = {
    cause,
    action,
    inspector,
    closureDate
  };

  saveStorage();
  closeRcaModal();
  renderTraceabilityTable();
  showToast(t("rcaSavedToast"));
}

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById("toastNotice");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3200);
}

// =============================================================================
// 11. Event Listeners & Bootstrapping
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initStorage();

  // Role Switcher
  document.getElementById("btnRoleWorker").addEventListener("click", () => setRole("worker"));
  document.getElementById("btnRoleManager").addEventListener("click", () => setRole("manager"));

  // Language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Worker Step 1 Navigation
  document.getElementById("step1NextBtn").addEventListener("click", () => {
    const batchInput = document.getElementById("batchIdInput").value.trim();
    if (batchInput) activeTest.batchId = batchInput;

    const supSel = document.getElementById("supplierSelect");
    activeTest.supplierId = supSel.value;
    activeTest.supplierName = supSel.options[supSel.selectedIndex].text.split(" (")[0];
    activeTest.location = document.getElementById("locationInput").value.trim() || "Main Shed";

    setWorkerStep(2);
  });

  // Worker Step 2 Navigation & Timer
  document.getElementById("step2BackBtn").addEventListener("click", () => setWorkerStep(1));
  document.getElementById("step2NextBtn").addEventListener("click", () => setWorkerStep(3));
  document.getElementById("timerBtn").addEventListener("click", toggleTimer);

  // Worker Step 3 Navigation & Camera
  document.getElementById("step3BackBtn").addEventListener("click", () => setWorkerStep(2));
  document.getElementById("cameraInput").addEventListener("change", handleCameraUpload);
  document.getElementById("openCameraBtn").addEventListener("click", () => {
    document.getElementById("cameraInput").click();
  });

  // Preset Buttons for Hackathon Live Demo
  document.getElementById("btnPresetSafe").addEventListener("click", () => generateDemoStripImage("safe"));
  document.getElementById("btnPresetSuspicious").addEventListener("click", () => generateDemoStripImage("suspicious"));
  document.getElementById("btnPresetReject").addEventListener("click", () => generateDemoStripImage("reject"));

  // Worker Step 4 Navigation & Save
  document.getElementById("step4RetakeBtn").addEventListener("click", () => setWorkerStep(3));
  document.getElementById("btnConfirmSaveBatch").addEventListener("click", handleSaveBatch);

  // Manager Search & Filter
  document.getElementById("batchSearchInput")?.addEventListener("input", renderTraceabilityTable);
  document.getElementById("verdictFilter")?.addEventListener("change", renderTraceabilityTable);

  // RCA Modal Buttons
  document.getElementById("rcaCloseBtn").addEventListener("click", closeRcaModal);
  document.getElementById("rcaCancelBtn").addEventListener("click", closeRcaModal);
  document.getElementById("rcaSaveBtn").addEventListener("click", saveRcaFindings);

  // Start with fresh test and load language
  resetWorkerTest();
  setLanguage(currentLang);
  renderManagerDashboard();
});
