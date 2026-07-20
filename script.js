const serviceSchema = {
    "rnd": {
        id: "rnd", title: "Research & Development", basePrice: 0,
        baseLabel: "Forced Cost", 
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>',
        fields: [
            { 
                id: "literature", label: "Data Availability Status", type: "segment", 
                options: [{label: "Complete", val: 5000}, {label: "Partial", val: 10000, default: true}, {label: "None", val: 15000}], 
                descriptions: {
                    "Complete": "Example: Tools or devices that are well-documented and easy to find, like heart rate monitors or decay sensors.",
                    "Partial": "Example: Concepts exist but require significant adaptation, research, or integration.",
                    "None": "Example: Cutting-edge nano to micro technology, or huge, advance robotics",
                }, isMultiplier: false 
            },
            { id: "R&D Report", label: "Include Documentation", type: "toggle", val: 750 },
            { 
                id: "doc-pages", 
                label: "Maximum Number of Pages", 
                type: "slider", 
                dependsOn: { field: "R&D Report", values: [true] }, 
                min: 10, 
                max: 100, 
                val: 10, 
                step: 1, 
                multiplier: 50,
                unitInfo: "SAR per page" 
            }
        ]
    },
    "rev-eng": {
        id: "rev-eng", title: "Reverse Engineering", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
        fields: [
            // Electrical
            { id: "domain", label: "Engineering Domain", type: "checkbox-group", options: [{label: "Electrical", val: 0, default: true}, {label: "Mechanical", val: 0}, {label: "Software", val: 0}], isMultiplier: false },
            { id: "pcb-size", label: "PCB Size", type: "range-slider", format: "dimension", dependsOn: {field: "domain", values: ["Electrical"]}, min: 1, max: 60, valMin: 3, valMax: 6, step: 1, multiplier: 50, unitInfo: "SAR per cm²" },
            { id: "files-elec", label: "No. File formats (Electrical)", type: "slider", dependsOn: {field: "domain", values: ["Electrical"]}, min: 1, max: 10, val: 4, step: 1, multiplier: 50, unitInfo: "SAR per file format" },
            { id: "sensors", label: "No. Sensors", type: "slider", dependsOn: {field: "domain", values: ["Electrical"]}, min: 0, max: 20, val: 3, step: 1, multiplier: 75, unitInfo: "SAR per sensor" },
            { id: "actuators", label: "No. Actuators", type: "slider", dependsOn: {field: "domain", values: ["Electrical"]}, min: 0, max: 20, val: 4, step: 1, multiplier: 75, unitInfo: "SAR per actuator" },
            { id: "docs", label: "Datasheets Availability", type: "segment", dependsOn: {field: "domain", values: ["Electrical"]}, options: [ {label: "Complete", val: 0}, {label: "Partial", val: 200}, {label: "Minimal", val: 400, default: true}, {label: "None", val: 700} ], isMultiplier: false },
            
            // Mechanical
            { id: "files-mech", label: "No. File formats (Mechanical)", type: "slider", dependsOn: {field: "domain", values: ["Mechanical"]}, min: 1, max: 10, val: 3, step: 1, multiplier: 50, unitInfo: "SAR per file format" },
            
            // UPDATED: Geometry is now standard SAR additions
            { id: "geometry", label: "Geometry Complexity", type: "segment", dependsOn: {field: "domain", values: ["Mechanical"]}, options: [{label: "Sketch", val: 0, default: true}, {label: "Standard", val: 200}, {label: "Sculpted", val: 500}, {label: "Detailed", val: 1000}], isMultiplier: false },
            
            { id: "parts", label: "No. Parts", type: "slider", dependsOn: {field: "domain", values: ["Mechanical"]}, min: 1, max: 50, val: 5, step: 1, multiplier: 80, unitInfo: "SAR per part" },
            { id: "measure", label: "No. Parts to measure", type: "slider", dependsOn: {field: "domain", values: ["Mechanical"]}, min: 0, max: 50, val: 7, step: 1, multiplier: 40, unitInfo: "SAR per measured part" },
            
            // UPDATED: Degree of Freedom is now standard SAR additions
            { id: "dof", label: "Degree of Freedom", type: "segment", dependsOn: {field: "domain", values: ["Mechanical"]}, options: [{label: "None", val: 0, default: true}, {label: "1-2", val: 300}, {label: "3+", val: 800}], isMultiplier: false },
            
            { id: "software", label: "Software", type: "segment", dependsOn: {field: "domain", values: ["Mechanical"]}, options: [{label: "CAD", val: 200, default: true}, {label: "Other", val: 350}], isMultiplier: false },
            
            // UPDATED: Added hideInAdmin to hide the 0 SAR toggle from the dashboard
            { id: "drawing", label: "Drawing Sheet", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical"]}, val: 0, hideInAdmin: true },
            { id: "drawing-qty", label: "Number of Drawing Sheets", type: "slider", dependsOn: { field: "drawing", values: [true] }, min: 1, max: 20, val: 1, step: 1, multiplier: 150, unitInfo: "SAR per sheet" },
            
            { id: "color", label: "Color Required", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical"]}, val: 100 },
            { id: "assembly", label: "Assembly Required", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical"]}, val: 300 },
            
            // UPDATED: Added hideInAdmin to hide the 0 SAR toggle from the dashboard
            { id: "render", label: "Render", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical"]}, val: 0, hideInAdmin: true },
            { id: "render-qty", label: "Number of Renders", type: "slider", dependsOn: { field: "render", values: [true] }, min: 1, max: 20, val: 1, step: 1, multiplier: 200, unitInfo: "SAR per render" },
            
            { id: "animation", label: "Animation", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical"]}, val: 400 },
            
            // Software
            { id: "sw-type", label: "Analysis Type", type: "segment", dependsOn: {field: "domain", values: ["Software"]}, options: [{label: "Black Box", val: 1, default: true}, {label: "White Box", val: 2}], isMultiplier: true },
            { id: "sw-platform", label: "Target Platform", type: "segment", dependsOn: {field: "domain", values: ["Software"]}, options: [{label: "Web App", val: 1000, default: true}, {label: "Mobile", val: 2000}, {label: "Desktop", val: 2500}, {label: "Embedded", val: 4000}], isMultiplier: false },
            { id: "sw-features", label: "No. of Core Features", type: "slider", dependsOn: {field: "domain", values: ["Software"]}, min: 1, max: 50, val: 5, step: 1, multiplier: 150, unitInfo: "SAR per core feature" },
            { id: "sw-screens", label: "No. of Screens", type: "slider", dependsOn: {field: "domain", values: ["Software"]}, min: 1, max: 100, val: 10, step: 1, multiplier: 50, unitInfo: "SAR per screen" },
            { id: "sw-api", label: "API Network Mapping", type: "toggle", dependsOn: {field: "domain", values: ["Software"]}, val: 1200 },
            { id: "sw-doc", label: "Architecture Report", type: "toggle", dependsOn: {field: "domain", values: ["Software"]}, val: 800 }
        ]
    },
    "elec-design": {
        id: "elec-design", title: "Electrical Circuit Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        fields: [
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 4, step: 1, multiplier: 50, unitInfo: "SAR per file format" },
            { id: "sensors", label: "No. Sensors", type: "slider", min: 0, max: 20, val: 3, step: 1, multiplier: 75, unitInfo: "SAR per sensor" },
            { id: "actuators", label: "No. Actuators", type: "slider", min: 0, max: 20, val: 4, step: 1, multiplier: 75, unitInfo: "SAR per actuator" },
            { id: "prototyping", label: "Include Breadboard Prototype", type: "toggle", val: 750 }
        ]
    },
    "hw-prog": {
        id: "hw-prog", title: "Hardware Programming", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>',
        fields: [
            { id: "mcu", label: "Type of Programming", type: "segment", options: [{label: "Microcontroller", val: 1000}, {label: "Small Computer", val: 2500, default: true}], isMultiplier: false },
            { id: "sensors", label: "No. Sensors", type: "slider", min: 0, max: 20, val: 3, step: 1, multiplier: 75, unitInfo: "SAR per sensor" },
            { id: "actuators", label: "No. Actuators", type: "slider", min: 0, max: 20, val: 4, step: 1, multiplier: 75, unitInfo: "SAR per actuator" },
            
            // NEW: Added unitInfo to explain the Lines of Code multiplier
            { id: "loc", label: "Estimated Lines of Code", type: "range-slider", min: 50, max: 1000, valMin: 500, valMax: 2000, step: 50, multiplier: 2, unitInfo: "SAR per maximum line of code" },
            
            { id: "connectivity", label: "IoT / Wireless Stack", type: "toggle", val: 1200 },
            { id: "no-code-app", label: "No Coding App Included", type: "toggle", val: 1500 }
        ]
    },
    "3d-design": {
        id: "3d-design", title: "3D Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
        fields: [
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 3, step: 1, multiplier: 50, unitInfo: "SAR per file format" },
            
            // UPDATED: Geometry matches Reverse Engineering defaults perfectly
            { id: "geometry", label: "Geometry Complexity", type: "segment", options: [{label: "Sketch", val: 0, default: true}, {label: "Standard", val: 200}, {label: "Sculpted", val: 500}, {label: "Detailed", val: 1000}], isMultiplier: false }, 
            
            { id: "parts", label: "No. Parts", type: "slider", min: 1, max: 50, val: 5, step: 1, multiplier: 80, unitInfo: "SAR per part" },
            { id: "measure", label: "No. Parts to measure", type: "slider", min: 0, max: 50, val: 7, step: 1, multiplier: 40, unitInfo: "SAR per measured part" },
            
            // UPDATED: DOF matches Reverse Engineering defaults perfectly
            { id: "dof", label: "Degree of Freedom", type: "segment", options: [{label: "None", val: 0, default: true}, {label: "1-2", val: 300}, {label: "3+", val: 800}], isMultiplier: false }, 
            
            { id: "software", label: "Software", type: "segment", options: [{label: "CAD", val: 200, default: true}, {label: "Other", val: 350}], isMultiplier: false },
            
            // Toggles reveal quantities perfectly
            // UPDATED: Added hideInAdmin to hide the 0 SAR toggle from the dashboard
            { id: "drawing", label: "Drawing Sheet", type: "toggle", val: 0, hideInAdmin: true },
            { id: "drawing-qty", label: "Number of Drawing Sheets", type: "slider", dependsOn: { field: "drawing", values: [true] }, min: 1, max: 20, val: 1, step: 1, multiplier: 150, unitInfo: "SAR per sheet" },
            
            { id: "color", label: "Color Required", type: "toggle", val: 100 },
            { id: "assembly", label: "Assembly Required", type: "toggle", val: 300 },
            
            // UPDATED: Added hideInAdmin to hide the 0 SAR toggle from the dashboard
            { id: "render", label: "Render", type: "toggle", val: 0, hideInAdmin: true },
            { id: "render-qty", label: "Number of Renders", type: "slider", dependsOn: { field: "render", values: [true] }, min: 1, max: 20, val: 1, step: 1, multiplier: 200, unitInfo: "SAR per render" },

            { id: "animation", label: "Animation", type: "toggle", val: 400 }
        ]
    },
    "3d-print": {
        id: "3d-print", title: "3D Printing", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        fields: [
            { id: "material", label: "Material", type: "segment", options: [{label: "PLA", val: 50, default: true}, {label: "PETG", val: 50}, {label: "ABS", val: 80}, {label: "ASA", val: 80}, {label: "Resin", val: 150}, {label: "Nylon", val: 150}], isMultiplier: false },            { id: "amount", label: "Total Amount of Material (g)", type: "slider", min: 10, max: 2000, val: 50, step: 10, multiplier: 1.5 },
            { id: "time", label: "Total Printing time (Hours)", type: "slider", min: 1, max: 72, val: 4, step: 1, multiplier: 30 },
            { id: "qty", label: "Quantity Discount", type: "segment", options: [{label: "1-9", val: 1, default: true}, {label: "10-99", val: 0.8}, {label: "100+", val: 0.65}], isMultiplier: true },
            { id: "postprocess", label: "Post-Processing", type: "toggle", val: 150 },
            { id: "paint", label: "Painting / Coating", type: "toggle", val: 200 }
        ]
    },
    "pcb-design": {
        id: "pcb-design", title: "PCB Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
        fields: [
            { id: "pcb-size", label: "PCB Size", type: "range-slider", format: "dimension", min: 1, max: 60, valMin: 3, valMax: 6, step: 1, multiplier: 50, unitInfo: "SAR per cm²" },
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 4, step: 1, multiplier: 50, unitInfo: "SAR per file format" },
            { id: "sensors", label: "No. Sensors", type: "slider", min: 0, max: 20, val: 3, step: 1, multiplier: 75, unitInfo: "SAR per sensor" },
            { id: "actuators", label: "No. Actuators", type: "slider", min: 0, max: 20, val: 4, step: 1, multiplier: 75, unitInfo: "SAR per actuator" },
        ]
    },
    "pcb-mfg": {
        id: "pcb-mfg", title: "PCB Manufacturing", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2v16Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>',
        fields: [
            { id: "manual-price", label: "Manual Factory Cost (SAR)", type: "slider", min: 50, max: 10000, val: 500, step: 50, multiplier: 1 },
            { id: "profit", label: "Markup / Handling Margin", type: "segment", options: [{label: "Standard +25%", val: 1.25, default: true}, {label: "Expedited +50%", val: 1.5}, {label: "Base Price Only", val: 1}], isMultiplier: true }
        ]
    },
    "ai-dev": {
        id: "ai-dev", title: "AI & ML Development", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0z"/></svg>',
        fields: [
            { id: "ai-approach", label: "Development Approach", type: "segment", options: [{label: "n8n", val: 2000, default: true}, {label: "Fine-Tuning", val: 7500}, {label: "Custom Model", val: 18000}], isMultiplier: false },
            
            // New n8n specific fields
            { id: "n8n-apis", label: "Expected Number of APIs", type: "slider", dependsOn: { field: "ai-approach", values: ["n8n"] }, min: 1, max: 20, val: 2, step: 1, multiplier: 200, unitInfo: "SAR per API" },
            { id: "n8n-nodes", label: "Estimated Number of Nodes", type: "slider", dependsOn: { field: "ai-approach", values: ["n8n"] }, min: 1, max: 100, val: 10, step: 1, multiplier: 50, unitInfo: "SAR per node" },
            
            // Rest of the existing ai-dev fields
            { id: "ai-domain", label: "Domain (Choose one or multiple)", type: "checkbox-group", options: [{label: "Computer Vision", val: 3500}, {label: "NLP / Text", val: 2500, default: true}, {label: "Predictive", val: 2500}], isMultiplier: false },
            { id: "data-status", label: "Dataset Readiness", type: "segment", options: [{label: "Ready", val: 0, default: true}, {label: "Needs Cleaning", val: 2500}, {label: "Needs Collection", val: 6000}], isMultiplier: false },
            { id: "data-size", label: "Estimated Training Data Size (GB)", type: "slider", dependsOn: { field: "ai-approach", values: ["Fine-Tuning", "Custom Model"] }, min: 1, max: 250, val: 5, step: 1, multiplier: 35 },
            { id: "deployment", label: "Deployment Target", type: "segment", options: [{label: "Web", val: 1000, default: true}, {label: "Mobile", val: 2500}, {label: "Embedded Hardware", val: 4500}], isMultiplier: false },
        ]
    },
    "consulting": {
        id: "consulting", title: "Engineering Consulting", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        fields: [
            { id: "client-type", label: "Client Type", type: "segment", options: [ {label: "Individuals", val: 1, default: true}, {label: "Companies", val: 2} ], isMultiplier: true },
            { id: "hours", label: "Estimated Consulting Time (Hours)", type: "slider", min: 1, max: 24, val: 10, step: 1, multiplier: 250 }
        ]
    },
    "Patent": {
        id: "Patent", title: "Patent Registration & Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
        fields: [
            { id: "service-scope", label: "Service Package", type: "segment", options: [ {label: "Comprehensive Filing", val: 9500, default: true}, {label: "Engineering Design", val: 2500} ], isMultiplier: false }
        ]
    }
};

// Application State
const state = {
    selectedServices: [],
    currentView: 'selection',
    wizardStepIndex: 0,
    serviceConfigs: {},
    activeClient: null 
};

// NEW: Bulletproof recursive dependency checker
function isFieldVisible(field, config, schema) {
    if (!field.dependsOn) return true;
    
    // Check if the parent field itself is hidden
    const parentField = schema.fields.find(f => f.id === field.dependsOn.field);
    if (parentField && !isFieldVisible(parentField, config, schema)) return false;
    
    // Check if the required value is selected
    const parentVal = config[field.dependsOn.field];
    return Array.isArray(parentVal) 
        ? field.dependsOn.values.some(v => parentVal.includes(v))
        : field.dependsOn.values.includes(parentVal);
}

// Clean DOM Elements Mapping
const els = {
    servicesGrid: document.getElementById('services-grid'),
    btnStartWizard: document.getElementById('btn-start-wizard'),
    viewSelection: document.getElementById('view-selection'),
    viewWizard: document.getElementById('view-wizard'),
    viewSummary: document.getElementById('view-summary'),
    viewAdmin: document.getElementById('view-admin'),
    viewSaved: document.getElementById('view-saved'),
    viewCustomers: document.getElementById('view-customers'),
    viewHistory: document.getElementById('view-history'),
    viewReports: document.getElementById('view-reports'),
    
    wizardFormContainer: document.getElementById('wizard-form-container'),
    livePrice: document.getElementById('live-price'),
    liveServiceName: document.getElementById('live-service-name'),
    btnNextStep: document.getElementById('btn-next-step'),
    btnPrevStep: document.getElementById('btn-prev-step'),
    
    summaryItems: document.getElementById('summary-items-container'),
    btnGenerateQuote: document.getElementById('btn-generate-quote'),
    btnEditServices: document.getElementById('btn-edit-services'),
    progressBar: document.getElementById('progress-bar'),
    viewTitle: document.getElementById('view-title'),
    
    modal: document.getElementById('confirmation-modal'),
    btnConfirmModal: document.getElementById('btn-confirm-modal'),
    btnCancelModal: document.getElementById('btn-cancel-modal'),
    
    assignIdModal: document.getElementById('assign-id-modal'),
    assignInputsContainer: document.getElementById('assign-inputs-container'),
    assignCustomerNameInput: document.getElementById('assign-customer-name-input'),
    assignOrderIdInput: document.getElementById('assign-order-id-input'),
    assignModalTitle: document.getElementById('assign-modal-title'),
    assignModalDesc: document.getElementById('assign-modal-desc'),
    btnCancelAssign: document.getElementById('btn-cancel-assign'),
    btnConfirmAssign: document.getElementById('btn-confirm-assign'),

    verificationModal: document.getElementById('verification-modal'),
    verificationMsg: document.getElementById('verification-msg'),
    btnVerifyCancel: document.getElementById('btn-verify-cancel'),
    btnVerifyConfirm: document.getElementById('btn-verify-confirm'),
    
    toast: document.getElementById('toast'),
    themeToggle: document.getElementById('theme-toggle'),
    
    navAdmin: document.getElementById('nav-admin'),
    navNewQuote: document.getElementById('nav-new-quote'),
    navSavedQuotes: document.getElementById('nav-saved-quotes'),
    navCustomers: document.getElementById('nav-customers'),
    navHistory: document.getElementById('nav-history'),
    navReports: document.getElementById('nav-reports'),
    
    filterMonth: document.getElementById('filter-month'),
    filterYear: document.getElementById('filter-year'),
    filterEmployee: document.getElementById('filter-employee'),
    productivityChart: document.getElementById('productivity-chart'),
    
    adminContent: document.getElementById('admin-content'),
    savedListContainer: document.getElementById('saved-list-container'),
    customersListContainer: document.getElementById('customers-list-container'),
    historyListContainer: document.getElementById('history-list-container'),
    reportsListContainer: document.getElementById('reports-list-container'),
    
    roleSwitcher: document.getElementById('role-switcher'),
    btnSaveAdmin: document.getElementById('btn-save-admin'),
    userAvatar: document.querySelector('.avatar'),
};

// Initialize Selection View
function initSelectionGrid() {
    if (!els.servicesGrid) return;
    els.servicesGrid.innerHTML = '';
    Object.values(serviceSchema).forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.id = service.id;
        card.innerHTML = `
            <div class="check-indicator"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>
            <div class="service-icon">${service.icon}</div>
            <h4>${service.title}</h4>
        `;
        
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            const idx = state.selectedServices.indexOf(service.id);
            if (idx > -1) {
                state.selectedServices.splice(idx, 1);
                delete state.serviceConfigs[service.id];
            } else {
                state.selectedServices.push(service.id);
                initDefaultConfig(service.id);
            }
            if (els.btnStartWizard) els.btnStartWizard.disabled = state.selectedServices.length === 0;
        });
        
        els.servicesGrid.appendChild(card);
    });
}

function initDefaultConfig(serviceId) {
    const schema = serviceSchema[serviceId];
    state.serviceConfigs[serviceId] = { price: 0, fields: {} };
    schema.fields.forEach(field => {
        if (field.type === 'segment') {
            const defaultOpt = field.options.find(o => o.default) || field.options[0];
            state.serviceConfigs[serviceId].fields[field.id] = defaultOpt.label;
        } else if (field.type === 'slider') {
            state.serviceConfigs[serviceId].fields[field.id] = field.val;
        } else if (field.type === 'toggle') {
            state.serviceConfigs[serviceId].fields[field.id] = false; 
        } else if (field.type === 'range-slider') {
            state.serviceConfigs[serviceId].fields[field.id + '_min'] = field.valMin;
            state.serviceConfigs[serviceId].fields[field.id + '_max'] = field.valMax;
        } else if (field.type === 'checkbox-group') {
            const defaults = field.options.filter(o => o.default).map(o => o.label);
            state.serviceConfigs[serviceId].fields[field.id] = defaults.length ? defaults : [field.options[0].label];
        }
    });
}

// Navigation Controls
function switchView(viewName) {
    [els.viewSelection, els.viewWizard, els.viewSummary, els.viewAdmin, els.viewSaved, els.viewCustomers, els.viewHistory, els.viewReports].forEach(view => {
        if (view) view.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));

    if (['selection', 'wizard', 'summary'].includes(viewName)) {
        if (els.navNewQuote) els.navNewQuote.classList.add('active');
    }

    if (viewName === 'selection' && els.viewSelection) {
        els.viewSelection.classList.add('active');
        els.viewTitle.innerText = "Select Services";
        updateProgress(10);
    } else if (viewName === 'wizard' && els.viewWizard) {
        els.viewWizard.classList.add('active');
        renderWizardStep();
    } else if (viewName === 'summary' && els.viewSummary) {
        els.viewSummary.classList.add('active');
        els.viewTitle.innerText = "Quote Summary";
        renderSummary();
        updateProgress(100);
    } else if (viewName === 'admin' && els.viewAdmin) {
        els.viewAdmin.classList.add('active');
        els.viewTitle.innerText = "Pricing Configuration";
        if (els.navAdmin) els.navAdmin.classList.add('active'); 
        renderAdminDashboard();
        updateProgress(100);
    } else if (viewName === 'saved' && els.viewSaved) {
        els.viewSaved.classList.add('active');
        els.viewTitle.innerText = "Saved Quotes";
        if (els.navSavedQuotes) els.navSavedQuotes.classList.add('active');
        renderSavedList();
        updateProgress(0);
    } else if (viewName === 'customers' && els.viewCustomers) {
        els.viewCustomers.classList.add('active');
        els.viewTitle.innerText = "Customers";
        if (els.navCustomers) els.navCustomers.classList.add('active');
        renderCustomersList();
        updateProgress(0);
    } else if (viewName === 'history' && els.viewHistory) {
        els.viewHistory.classList.add('active');
        els.viewTitle.innerText = "History Log";
        if (els.navHistory) els.navHistory.classList.add('active');
        renderHistoryList();
        updateProgress(0);
    } else if (viewName === 'reports' && els.viewReports) {
        els.viewReports.classList.add('active');
        els.viewTitle.innerText = "Employee Reports";
        if (els.navReports) els.navReports.classList.add('active');
        renderReportsList();
        updateProgress(0);
    }
    state.currentView = viewName;
}

function updateProgress(percentage) {
    if (els.progressBar) els.progressBar.style.width = percentage + '%';
}

// Wizard Rendering
function renderWizardStep() {
    const serviceId = state.selectedServices[state.wizardStepIndex];
    if (!serviceId) return;
    
    const schema = serviceSchema[serviceId];
    const config = state.serviceConfigs[serviceId].fields;
    
    if (els.viewTitle) els.viewTitle.innerText = `Configure ${schema.title}`;
    if (els.liveServiceName) els.liveServiceName.innerText = schema.title;
    
    const totalSteps = state.selectedServices.length + 2; 
    const currentAbsoluteStep = state.wizardStepIndex + 2;
    updateProgress((currentAbsoluteStep / totalSteps) * 100);

    let formHTML = `<div class="view-header">
        <h3>${schema.title}</h3>
        <p>Adjust the parameters below to calculate the service cost.</p>
    </div>`;

    schema.fields.forEach(field => {
        // USE NEW RECURSIVE VISIBILITY CHECK
        if (!isFieldVisible(field, config, schema)) return; 

        formHTML += `<div class="form-group">`;
        if (field.type === 'segment') {
            formHTML += `<label class="form-label">${field.label}</label><div class="segmented-control">`;
            field.options.forEach((opt, idx) => {
                const isChecked = config[field.id] === opt.label ? 'checked' : '';
                formHTML += `
                    <input type="radio" id="${field.id}-${idx}" name="${field.id}" value="${opt.label}" ${isChecked}>
                    <label class="segment-label" for="${field.id}-${idx}">${opt.label}</label>
                `;
            });
            formHTML += `</div>`;
            if (field.descriptions) {
                const currentVal = config[field.id];
                const descText = field.descriptions[currentVal] || "";
                formHTML += `<p id="desc-${field.id}" style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 8px;">${descText}</p>`;
            }
        } else if (field.type === 'checkbox-group') {
            formHTML += `<label class="form-label">${field.label}</label><div class="segmented-control" style="flex-wrap: wrap;">`;
            field.options.forEach((opt, idx) => {
                const isChecked = config[field.id].includes(opt.label) ? 'checked' : '';
                formHTML += `
                    <input type="checkbox" id="${field.id}-${idx}" name="${field.id}" value="${opt.label}" ${isChecked}>
                    <label class="segment-label" for="${field.id}-${idx}">${opt.label}</label>
                `;
            });
            formHTML += `</div>`;
        } else if (field.type === 'toggle') {
            const isChecked = config[field.id] ? 'checked' : '';
            formHTML += `
                <label class="toggle-control">
                    <span>${field.label}</span>
                    <input type="checkbox" id="${field.id}" ${isChecked}>
                    <div class="toggle-switch"></div>
                </label>
            `;
        } else if (field.type === 'range-slider') {
            const isDim = field.format === 'dimension';
            const valText = isDim 
                ? `{ ${config[field.id + '_min']} x ${config[field.id + '_max']} cm }` 
                : `${config[field.id + '_min']} - ${config[field.id + '_max']} Lines`;

            formHTML += `
                <div class="form-group">
                    <label class="form-label">${field.label}: <span class="slider-value" id="val-${field.id}">${valText}</span></label>
                    <div class="range-slider-container">
                        <div class="range-slider-track"></div>
                        <div class="range-slider-fill" id="fill-${field.id}"></div>
                        <input type="range" class="range-slider-input" id="${field.id}-min" min="${field.min}" max="${field.max}" step="${field.step}" value="${config[field.id + '_min']}">
                        <input type="range" class="range-slider-input" id="${field.id}-max" min="${field.min}" max="${field.max}" step="${field.step}" value="${config[field.id + '_max']}">
                    </div>
                </div>
            `;
        } else if (field.type === 'slider') {
            formHTML += `
                <label class="form-label">${field.label}: <span class="slider-value" id="val-${field.id}">${config[field.id]}</span></label>
                <input type="range" class="slider-control" id="${field.id}" min="${field.min}" max="${field.max}" step="${field.step}" value="${config[field.id]}">
            `;
        }
        formHTML += `</div>`;
    });

    if (els.wizardFormContainer) els.wizardFormContainer.innerHTML = formHTML;

    // Listeners for inputs
    schema.fields.forEach(field => {
        if (!isFieldVisible(field, config, schema)) return; 

        if (field.type === 'segment') {
            const radios = document.getElementsByName(field.id);
            radios.forEach(r => r.addEventListener('change', (e) => {
                state.serviceConfigs[serviceId].fields[field.id] = e.target.value;
                if (field.descriptions) {
                    const descEl = document.getElementById(`desc-${field.id}`);
                    if (descEl) descEl.innerText = field.descriptions[e.target.value];
                }
                const triggersReRender = schema.fields.some(f => f.dependsOn && f.dependsOn.field === field.id);
                triggersReRender ? renderWizardStep() : calculateLivePrice(serviceId);
            }));
        } else if (field.type === 'checkbox-group') {
            const checkboxes = document.getElementsByName(field.id);
            checkboxes.forEach(cb => cb.addEventListener('change', () => {
                const checkedValues = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
                state.serviceConfigs[serviceId].fields[field.id] = checkedValues;
                const triggersReRender = schema.fields.some(f => f.dependsOn && f.dependsOn.field === field.id);
                triggersReRender ? renderWizardStep() : calculateLivePrice(serviceId);
            }));
        } else if (field.type === 'toggle') {
            const toggleEl = document.getElementById(field.id);
            if (toggleEl) {
                toggleEl.addEventListener('change', (e) => {
                    state.serviceConfigs[serviceId].fields[field.id] = e.target.checked;
                    const triggersReRender = schema.fields.some(f => f.dependsOn && f.dependsOn.field === field.id);
                    triggersReRender ? renderWizardStep() : calculateLivePrice(serviceId);
                });
            }
        } else if (field.type === 'slider') {
            const slider = document.getElementById(field.id);
            const valDisplay = document.getElementById(`val-${field.id}`);
            if (slider && valDisplay) {
                slider.addEventListener('input', (e) => {
                    valDisplay.innerText = e.target.value;
                    state.serviceConfigs[serviceId].fields[field.id] = parseFloat(e.target.value);
                    calculateLivePrice(serviceId);
                });
            }
        } else if (field.type === 'range-slider') {
            const minSlider = document.getElementById(`${field.id}-min`);
            const maxSlider = document.getElementById(`${field.id}-max`);
            const valDisplay = document.getElementById(`val-${field.id}`);
            const fill = document.getElementById(`fill-${field.id}`);

            function updateSliderUI(e) {
                if (!minSlider || !maxSlider || !fill || !valDisplay) return;
                let minVal = parseFloat(minSlider.value);
                let maxVal = parseFloat(maxSlider.value);

                if (minVal > maxVal) {
                    if (e && e.target === minSlider) { minSlider.value = maxVal; minVal = maxVal; } 
                    else if (e && e.target === maxSlider) { maxSlider.value = minVal; maxVal = minVal; }
                }

                const range = field.max - field.min;
                const leftPercent = ((minVal - field.min) / range) * 100;
                const rightPercent = ((maxVal - field.min) / range) * 100;

                fill.style.left = leftPercent + '%';
                fill.style.width = (rightPercent - leftPercent) + '%';

                const isDim = field.format === 'dimension';
                valDisplay.innerText = isDim ? `${minVal} x ${maxVal}cm` : `${minVal} - ${maxVal} Lines`;

                state.serviceConfigs[serviceId].fields[field.id + '_min'] = minVal;
                state.serviceConfigs[serviceId].fields[field.id + '_max'] = maxVal;
                calculateLivePrice(serviceId);
            }

            updateSliderUI();
            if(minSlider) minSlider.addEventListener('input', updateSliderUI);
            if(maxSlider) maxSlider.addEventListener('input', updateSliderUI);
        }
    });
    
    if (els.btnNextStep) {
        els.btnNextStep.innerHTML = state.wizardStepIndex === state.selectedServices.length - 1 
            ? 'Review Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' 
            : 'Next Service <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }

    calculateLivePrice(serviceId);
}

function calculateLivePrice(serviceId) {
    const schema = serviceSchema[serviceId];
    const config = state.serviceConfigs[serviceId].fields;
    
    let base = schema.basePrice;
    let multiplier = 1;
    let additions = 0;

    schema.fields.forEach(field => {
        // USE NEW RECURSIVE VISIBILITY CHECK
        if (!isFieldVisible(field, config, schema)) return; 

        const userVal = config[field.id];
        
        if (field.type === 'segment') {
            const opt = field.options.find(o => o.label === userVal);
            if (opt) { field.isMultiplier ? multiplier *= opt.val : additions += opt.val; }
        } else if (field.type === 'checkbox-group') {
            userVal.forEach(val => {
                const opt = field.options.find(o => o.label === val);
                if (opt) { field.isMultiplier ? multiplier *= opt.val : additions += opt.val; }
            });
        } else if (field.type === 'toggle') {
            if (userVal) additions += field.val;
        } else if (field.type === 'slider') {
            additions += (userVal * field.multiplier);
        } else if (field.type === 'range-slider') {
            const minVal = config[field.id + '_min'];
            const maxVal = config[field.id + '_max'];
            
            if (field.format === 'dimension') {
                const area = minVal * maxVal;
                additions += (area * field.multiplier); 
            } else {
                additions += (maxVal * field.multiplier);
            }
        }
    });

    const finalPrice = (base + additions) * multiplier;
    state.serviceConfigs[serviceId].price = finalPrice;
    
    if (els.livePrice) els.livePrice.innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(finalPrice);
}

function updateUrgencyUI() {
    const urgencyToggle = document.getElementById('g-urgency-toggle');
    const urgencySlider = document.getElementById('g-urgency-slider');
    const urgencyValDisplay = document.getElementById('g-urgency-val');
    const urgencyDescDisplay = document.getElementById('g-urgency-desc');
    const urgencyContainer = document.getElementById('urgency-slider-container');

    if (!urgencyToggle || !urgencySlider) return 1.0;

    const hasDeadline = urgencyToggle.checked;
    
    if(urgencyContainer) urgencyContainer.style.opacity = hasDeadline ? '1' : '0.4';
    urgencySlider.disabled = !hasDeadline;

    if (!hasDeadline) {
        if(urgencyValDisplay) urgencyValDisplay.innerText = "--";
        if(urgencyDescDisplay) { urgencyDescDisplay.innerText = "Flexible Timeline"; urgencyDescDisplay.style.color = "var(--text-secondary)"; }
        return 1.0;
    }

    const weeks = parseInt(urgencySlider.value);
    if(urgencyValDisplay) urgencyValDisplay.innerText = weeks + " Weeks";
    if(urgencyDescDisplay) urgencyDescDisplay.style.color = "var(--accent)";
    
    if (weeks <= 1) { if(urgencyDescDisplay) urgencyDescDisplay.innerText = "Critical"; return 3.0; } 
    else if (weeks <= 3) { if(urgencyDescDisplay) urgencyDescDisplay.innerText = "Rushed"; return 1.5; } 
    else if (weeks <= 5) { if(urgencyDescDisplay) urgencyDescDisplay.innerText = "Fast-Track"; return 1.5; } 
    else if (weeks <= 7) { if(urgencyDescDisplay) urgencyDescDisplay.innerText = "Standard"; return 1.2; } 
    else { if(urgencyDescDisplay) { urgencyDescDisplay.innerText = "Flexible"; urgencyDescDisplay.style.color = "var(--text-secondary)"; } return 1.0; }
}

function renderSummary() {
    if(!els.summaryItems) return;
    els.summaryItems.innerHTML = '';
    let multipliableSubtotal = 0;
    let exemptSubtotal = 0;

    const globalOrgElement = document.getElementById('g-org-select');
    const orgMultiplier = globalOrgElement ? parseFloat(globalOrgElement.value) : 1;
    const urgencyMultiplier = updateUrgencyUI(); 
    const combinedMultiplier = orgMultiplier * urgencyMultiplier;

    state.selectedServices.forEach(serviceId => {
        const schema = serviceSchema[serviceId];
        const config = state.serviceConfigs[serviceId].fields;
        const basePrice = state.serviceConfigs[serviceId].price; 
        let finalServicePrice;

        if (['consulting', 'pcb-mfg', 'Patent'].includes(serviceId)) {
            finalServicePrice = basePrice;
            exemptSubtotal += basePrice;
        } else {
            finalServicePrice = basePrice * combinedMultiplier;
            multipliableSubtotal += basePrice;
        }

        let details = schema.fields
            .filter(f => isFieldVisible(f, config, schema))
            .map(f => {
                if (f.type === 'toggle') return config[f.id] ? f.label : '';
                if (f.type === 'range-slider') {
                    return f.format === 'dimension' 
                        ? `{ ${config[f.id + '_min']} x ${config[f.id + '_max']} cm }`
                        : `${config[f.id + '_min']} - ${config[f.id + '_max']} Lines`;
                }
                return config[f.id];
            })
            .filter(Boolean).join(' • ');

        els.summaryItems.innerHTML += `
            <div class="summary-card">
                <div class="summary-card-info">
                    <h4>${schema.title}</h4>
                    <p>${details}</p>
                </div>
                <div class="summary-card-price">${new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(finalServicePrice)}</div>
            </div>`;
    });
    
    let adjustedSubtotal = (multipliableSubtotal * combinedMultiplier) + exemptSubtotal;

    const reportToggle = document.getElementById('g-report-toggle');
    const reportFee = 750; 

    if (reportToggle && reportToggle.checked) {
        adjustedSubtotal += reportFee;
        els.summaryItems.innerHTML += `
            <div class="summary-card">
                <div class="summary-card-info">
                    <h4>Testing Report</h4>
                    <p>Included</p>
                </div>
                <div class="summary-card-price">${new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(reportFee)}</div>
            </div>`;
    }

    const tax = adjustedSubtotal * 0.15;
    const grandTotal = adjustedSubtotal + tax;

    if(document.getElementById('summary-base-subtotal')) document.getElementById('summary-base-subtotal').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(adjustedSubtotal);
    if(document.getElementById('summary-tax')) document.getElementById('summary-tax').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(tax);
    if(document.getElementById('summary-grand')) document.getElementById('summary-grand').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(grandTotal);
}

// UI Event Listeners
if (els.themeToggle) {
    els.themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    });
}

if (els.btnStartWizard) {
    els.btnStartWizard.addEventListener('click', () => {
        state.wizardStepIndex = 0;
        switchView('wizard');
    });
}

if (els.btnNextStep) {
    els.btnNextStep.addEventListener('click', () => {
        if (state.wizardStepIndex < state.selectedServices.length - 1) {
            state.wizardStepIndex++;
            if(els.wizardFormContainer) els.wizardFormContainer.style.opacity = 0;
            setTimeout(() => {
                renderWizardStep();
                if(els.wizardFormContainer) els.wizardFormContainer.style.opacity = 1;
            }, 200);
        } else {
            switchView('summary');
        }
    });
}

if (els.btnPrevStep) {
    els.btnPrevStep.addEventListener('click', () => {
        if (state.wizardStepIndex > 0) {
            state.wizardStepIndex--;
            renderWizardStep();
        } else {
            switchView('selection');
        }
    });
}

if (els.btnEditServices) els.btnEditServices.addEventListener('click', () => switchView('selection'));

if (els.btnGenerateQuote) els.btnGenerateQuote.addEventListener('click', () => { if(els.modal) els.modal.classList.add('active'); });
if (els.btnCancelModal) els.btnCancelModal.addEventListener('click', () => { if(els.modal) els.modal.classList.remove('active'); });

['g-org-select', 'g-urgency-toggle', 'g-urgency-slider', 'g-report-toggle'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener(id === 'g-urgency-slider' ? 'input' : 'change', renderSummary);
});

// Mobile Sidebar
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav .nav-item');

if (mobileMenuToggle && sidebar && sidebarOverlay) {
    mobileMenuToggle.addEventListener('click', () => { sidebar.classList.add('open'); sidebarOverlay.classList.add('active'); });
    sidebarOverlay.addEventListener('click', () => { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('active'); });
    sidebarNavLinks.forEach(link => link.addEventListener('click', () => { if (window.innerWidth <= 768) { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('active'); } }));
}

// Initial Boot
initSelectionGrid();
updateProgress(10);


// ==========================================
// REPORTS & ROLE SWITCHER
// ==========================================

function applyRoleSettings() {
    if (!els.roleSwitcher) return { role: 'employee', name: 'Employee' };
    
    const selectedOpt = els.roleSwitcher.selectedOptions[0];
    const role = selectedOpt.dataset.role || (selectedOpt.value.includes('admin') ? 'admin' : 'employee');
    const name = selectedOpt.dataset.name || selectedOpt.text.replace('Admin: ', '').replace('Employee: ', '');
    
    const nameParts = name.split(' ');
    const initials = nameParts.length > 1 
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() 
        : name.substring(0, 2).toUpperCase();

    if (role === 'admin') {
        if (els.navAdmin) els.navAdmin.classList.remove('d-none');
        if (els.navReports) els.navReports.classList.remove('d-none');
        if (els.userAvatar) { els.userAvatar.innerText = initials; els.userAvatar.classList.add('admin'); }
    } else {
        if (els.navAdmin) els.navAdmin.classList.add('d-none');
        if (els.navReports) els.navReports.classList.add('d-none');
        if (els.userAvatar) { els.userAvatar.innerText = initials; els.userAvatar.classList.remove('admin'); }
        
        if (state.currentView === 'admin' || state.currentView === 'reports') switchView('selection');
    }
    return { role, name };
}

if (els.roleSwitcher) {
    els.roleSwitcher.addEventListener('change', () => {
        const { role, name } = applyRoleSettings();
        const roleTitle = role === 'admin' ? 'Admin' : 'Employee';
        
        if(els.toast) {
            els.toast.querySelector('span').innerText = `Switched to ${roleTitle}: ${name}`;
            els.toast.classList.add('show');
            setTimeout(() => els.toast.classList.remove('show'), 3000);
        }
    });
    applyRoleSettings();
}

if (els.navNewQuote) els.navNewQuote.addEventListener('click', (e) => { 
    e.preventDefault(); 
    state.activeClient = null; 
    switchView('selection'); 
});
if (els.navSavedQuotes) els.navSavedQuotes.addEventListener('click', (e) => { e.preventDefault(); switchView('saved'); });
if (els.navCustomers) els.navCustomers.addEventListener('click', (e) => { e.preventDefault(); switchView('customers'); });
if (els.navHistory) els.navHistory.addEventListener('click', (e) => { e.preventDefault(); switchView('history'); });
if (els.navAdmin) els.navAdmin.addEventListener('click', (e) => { e.preventDefault(); switchView('admin'); });
if (els.navReports) els.navReports.addEventListener('click', (e) => { e.preventDefault(); switchView('reports'); });

if (els.btnConfirmModal) {
    els.btnConfirmModal.addEventListener('click', () => {
        const grandTotalObj = document.getElementById('summary-grand');
        if(!grandTotalObj) return;
        
        const currentAuthor = els.roleSwitcher ? els.roleSwitcher.selectedOptions[0].dataset.name : 'Employee';
        
        const quoteData = {
            id: Date.now(), 
            date: new Date().toLocaleDateString('en-SA'),
            total: grandTotalObj.innerText,
            services: [...state.selectedServices],
            configs: JSON.parse(JSON.stringify(state.serviceConfigs)),
            author: currentAuthor,
            customerName: state.activeClient || "General Client",
            preAssignedOrderId: state.activeClientId || null
        };

        const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
        saved.push(quoteData);
        localStorage.setItem('pricing_saved', JSON.stringify(saved));

        if(els.modal) els.modal.classList.remove('active');
        if(els.toast) {
            els.toast.querySelector('span').innerText = 'Draft saved successfully!';
            els.toast.classList.add('show');
            setTimeout(() => els.toast.classList.remove('show'), 3000);
        }
        
        state.selectedServices = [];
        state.serviceConfigs = {};
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        if(els.btnStartWizard) els.btnStartWizard.disabled = true;
        
        switchView('saved');
    });
}

// Admin Pricing Rendering & Saving
function renderAdminField(srvId, f, fIdx) {
    // NEW: If the field is marked to hide, skip it instantly!
    if (f.hideInAdmin) return '';
    
    let html = '';
    const infoIcon = f.unitInfo 
        ? `<span class="info-tooltip" data-tooltip="${f.unitInfo}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>` 
        : '';

    if (['segment', 'checkbox-group'].includes(f.type)) {
        const colorClass = f.isMultiplier ? 'input-red' : (f.id === 'domain' ? 'input-blue' : '');
        const suffix = f.isMultiplier ? 'x' : 'SAR'; 
        
        f.options.forEach((opt, oIdx) => {
            html += `<div class="admin-input-group" title="${f.label}">
                <label style="display:flex; align-items:center; gap:4px; line-height: 1.2;">
                    ${f.label} <br><strong>(${opt.label})</strong>
                </label>
                <div style="display:flex; align-items:center; gap:6px;">
                    <input type="number" class="admin-val ${colorClass}" data-path="${srvId}.fields.${fIdx}.options.${oIdx}.val" value="${opt.val}" step="0.01">
                    <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); width: 28px;">${suffix}</span>
                </div>
            </div>`;
        });
    } else if (f.type === 'toggle') {
        html += `<div class="admin-input-group">
            <label>${f.label}</label> 
            <div style="display:flex; align-items:center; gap:6px;">
                <input type="number" class="admin-val" data-path="${srvId}.fields.${fIdx}.val" value="${f.val}" step="0.01">
                <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); width: 28px;">SAR</span>
            </div>
        </div>`;
    } else if (['slider', 'range-slider'].includes(f.type)) {
        if (f.multiplier !== undefined) {
            html += `<div class="admin-input-group">
                <label style="display:flex; align-items:center; gap:6px;">Multiplier: ${f.label}</label>
                <div style="display:flex; align-items:center; gap:6px;">
                    ${infoIcon}
                    <input type="number" class="admin-val input-red" data-path="${srvId}.fields.${fIdx}.multiplier" value="${f.multiplier}" step="0.01">
                    <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); width: 28px;">SAR</span>
                </div>
            </div>`;
        }
        if (f.costTiers) {
            f.costTiers.forEach((tier, tIdx) => {
                html += `<div class="admin-input-group">
                    <label>Tier (Area &le; ${tier.maxArea}) <br><strong>${f.label}</strong></label>
                    <input type="number" class="admin-val" data-path="${srvId}.fields.${fIdx}.costTiers.${tIdx}.cost" value="${tier.cost}" step="0.01">
                </div>`;
            });
        }
    }
    return html;
}

function renderAdminDashboard() {
    if(!els.adminContent) return;
    let html = '';
    
    const generateBasePriceHTML = (srvId, srv) => `
        <div class="admin-input-group">
            <label>${srv.baseLabel || 'Forced Cost'}</label>
            <div style="display:flex; align-items:center; gap:6px;">
                <input type="number" class="admin-val input-blue" data-path="${srvId}.basePrice" value="${srv.basePrice}" step="0.01">
                <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); width: 28px;">SAR</span>
            </div>
        </div>`;

    for (let [srvId, srv] of Object.entries(serviceSchema)) {
        if (srvId === 'rev-eng') {
            const groups = {
                'General': { title: 'Reverse Engineering - General', fields: [] },
                'Electrical': { title: 'Reverse Engineering - Electrical', fields: [] },
                'Mechanical': { title: 'Reverse Engineering - Mechanical', fields: [] },
                'Software': { title: 'Reverse Engineering - Software', fields: [] }
            };
            
            srv.fields.forEach((f, fIdx) => {
                let targetGroup = 'General';
                if (f.dependsOn) {
                    if (f.dependsOn.field === 'domain') {
                        targetGroup = f.dependsOn.values[0];
                    } else if (f.dependsOn.field === 'drawing' || f.dependsOn.field === 'render') {
                        // NEW: Route child sliders directly into the Mechanical group
                        targetGroup = 'Mechanical';
                    }
                }
                groups[targetGroup].fields.push({ field: f, index: fIdx });
            });
            
            for (let [groupName, group] of Object.entries(groups)) {
                // NEW: Hide the 'General' card completely if it has no fields inside it
                if (group.fields.length === 0) continue; 
                
                html += `<div class="admin-card"><h4>${group.title}</h4>`;
                
                // Keep the General block free of the global Base Price as requested earlier
                if (groupName !== 'General') {} 
                
                group.fields.forEach(item => html += renderAdminField(srvId, item.field, item.index));
                html += `</div>`;
            }
        } else {
            html += `<div class="admin-card"><h4>${srv.title}</h4>`;
            html += generateBasePriceHTML(srvId, srv);
            srv.fields.forEach((f, fIdx) => html += renderAdminField(srvId, f, fIdx));
            html += `</div>`;
        }
    }
    els.adminContent.innerHTML = html;
}

if (els.btnSaveAdmin) {
    els.btnSaveAdmin.addEventListener('click', () => {
        document.querySelectorAll('.admin-val').forEach(input => {
            const path = input.dataset.path.split('.');
            let currentObj = serviceSchema;
            for (let i = 0; i < path.length - 1; i++) currentObj = currentObj[path[i]];
            currentObj[path[path.length - 1]] = parseFloat(input.value); 
        });
        if(els.toast) {
            els.toast.querySelector('span').innerText = 'Pricing Configuration Saved successfully!';
            els.toast.classList.add('show');
            setTimeout(() => els.toast.classList.remove('show'), 3000);
        }
    });
}

// Rendering Lists
function renderSavedList() {
    if(!els.savedListContainer) return;
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    els.savedListContainer.innerHTML = saved.length === 0 ? '<p style="color: var(--text-secondary);">No saved drafts found.</p>' : '';
    saved.forEach(q => {
        const serviceNames = q.services.map(sId => serviceSchema[sId].title).join(', ');
        const clientDisplay = q.customerName ? q.customerName : `Draft #${q.id.toString().slice(-4)}`;
        
        els.savedListContainer.innerHTML += `
            <div class="admin-card">
                <h4>${clientDisplay}</h4>
                <p class="text-sm text-secondary mb-3">${q.date}</p>
                <p class="text-sm mb-3" style="line-height: 1.5;"><strong>Services:</strong> <br>${serviceNames}</p>
                <div class="flex-between" style="margin-top: 16px;">
                    <span class="price" style="font-weight: 700; font-size: 1.25rem;">${q.total}</span>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary text-sm" onclick="editSavedQuote(${q.id})">Edit</button>
                        <!-- NEW RED CONFIRM BUTTON -->
                        <button class="btn btn-primary text-sm" onclick="openAssignIdModal(${q.id})" style="background-color: #ef4444; border-color: #ef4444; color: white;">Confirm Quote</button>
                    </div>
                </div>
            </div>`;
    });
}

function renderCustomersList() {
    if(!els.customersListContainer) return;
    
    // Array of immediate responsibility customers with their pre-existing IDs
    const clients = [
        { name: "Omar", id: "73921" },
        { name: "Faisal", id: "48293" },
        { name: "Nouf", id: "91023" },
        { name: "Yasser", id: "33829" },
        { name: "TechCorp", id: "55210" },
        { name: "SABIC", id: "88392" }
    ];
    
    els.customersListContainer.innerHTML = '';
    
    clients.forEach(client => {
        els.customersListContainer.innerHTML += `
            <div class="admin-card" style="border-left: 4px solid var(--accent); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <!-- Order ID displayed near the name -->
                    <h4>${client.name} <span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 500; margin-left: 8px;">#${client.id}</span></h4>
                    <p class="text-sm text-secondary mb-3">Assigned Client</p>
                </div>
                <button class="btn btn-primary w-100" style="margin-top: 16px;" onclick="startQuoteForClient('${client.name}', '${client.id}')">Generate Quote</button>
            </div>`;
    });
}

// Function to start a quote for a specific client
window.startQuoteForClient = function(clientName, clientId) {
    state.activeClient = clientName; 
    state.activeClientId = clientId; // <-- Save their specific ID
    state.selectedServices = [];
    state.serviceConfigs = {};
    
    // Reset UI
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
    if(els.btnStartWizard) els.btnStartWizard.disabled = true;
    
    switchView('selection');
    
    if(els.toast) {
        els.toast.querySelector('span').innerText = `Creating quote for ${clientName}`;
        els.toast.classList.add('show');
        setTimeout(() => els.toast.classList.remove('show'), 3000);
    }
};

function renderHistoryList() {
    if(!els.historyListContainer) return;
    const customers = JSON.parse(localStorage.getItem('pricing_customers') || '[]');
    customers.sort((a, b) => (b.submittedAt || b.id) - (a.submittedAt || a.id));
    els.historyListContainer.innerHTML = customers.length === 0 ? '<p style="color: var(--text-secondary);">No submitted quotes found.</p>' : '';
    customers.forEach(q => {
        const timestamp = q.submittedAt || q.id; 
        const dateObj = new Date(timestamp);
        const formattedDate = dateObj.toLocaleDateString('en-SA');
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const serviceNames = q.services.map(sId => serviceSchema[sId].title).join(', ');
        const displayName = q.customerName ? ` - ${q.customerName}` : ''; // <-- ADD THIS
        
        els.historyListContainer.innerHTML += `
            <div class="admin-card" style="border-left: 4px solid var(--text-secondary);">
                <h4>Order ID: ${q.orderId}${displayName}</h4> <!-- UPDATE THIS LINE -->
                <p class="text-sm text-secondary mb-3">Submitted: ${formattedDate} at ${formattedTime}</p>
                <p class="text-sm mb-3" style="line-height: 1.5;"><strong>Services:</strong> <br>${serviceNames}</p>
                <div class="flex-between" style="margin-top: 16px;">
                    <span class="price" style="font-weight: 700; font-size: 1.25rem;">${q.total}</span>
                    <span style="background: var(--bg-main); color: var(--text-secondary); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; border: 1px solid var(--border-color);">Archived</span>
                </div>
            </div>`;
    });
}

window.editSavedQuote = function(id) {
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    const quoteIndex = saved.findIndex(q => q.id === id);
    if (quoteIndex > -1) {
        const q = saved[quoteIndex];
        state.selectedServices = [...q.services];
        state.serviceConfigs = JSON.parse(JSON.stringify(q.configs));
        saved.splice(quoteIndex, 1);
        localStorage.setItem('pricing_saved', JSON.stringify(saved));
        
        document.querySelectorAll('.service-card').forEach(c => {
            state.selectedServices.includes(c.dataset.id) ? c.classList.add('selected') : c.classList.remove('selected');
        });
        if(els.btnStartWizard) els.btnStartWizard.disabled = false;
        
        state.wizardStepIndex = 0;
        switchView('selection'); 
        
        if(els.toast) {
            els.toast.querySelector('span').innerText = 'Draft loaded! You can add or remove services.';
            els.toast.classList.add('show');
            setTimeout(() => els.toast.classList.remove('show'), 3000);
        }
    }
};

let activeAssignId = null;
window.openAssignIdModal = function(id) {
    activeAssignId = id;
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    const q = saved.find(item => item.id === id);
    
    if (q) {
        if (q.customerName === "General Client") {
            // General Client: Show the input field
            if (els.assignOrderIdInput) els.assignOrderIdInput.style.display = 'block';
            if (els.assignModalDesc) els.assignModalDesc.innerText = "Please enter the Order ID to finalize this quote.";
        } else {
            // Assigned Client: Hide the input field (automatic processing)
            if (els.assignOrderIdInput) els.assignOrderIdInput.style.display = 'none';
            if (els.assignModalDesc) els.assignModalDesc.innerText = "No further editing is going to be allowed and it's sent and uploaded to client.";
        }
    }
    
    if(els.assignOrderIdInput) els.assignOrderIdInput.value = ''; 
    if(els.assignIdModal) els.assignIdModal.classList.add('active');
};

if (els.btnCancelAssign) els.btnCancelAssign.addEventListener('click', () => {
    if(els.assignIdModal) els.assignIdModal.classList.remove('active');
    activeAssignId = null;
});

// Variable to hold the name until confirmed
// Variable to hold the name until confirmed
let tempGeneratedName = null;

if (els.btnConfirmAssign) els.btnConfirmAssign.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    const quoteIndex = saved.findIndex(q => q.id === activeAssignId);
    
    if (quoteIndex > -1) {
        const q = saved[quoteIndex];
        let inputId = '';
        
        // 1. Process based on Client Type
        if (q.customerName === "General Client") {
            // General Client requires manual Order ID
            inputId = els.assignOrderIdInput ? els.assignOrderIdInput.value.trim() : '';
            if (!inputId) {
                alert("Please enter a valid Order ID.");
                return;
            }
            
            // Simulate DB fetch for name
            const dbNames = ["Ahmed Salman", "Faisal Al-Otaibi", "Sara Khalid", "Mohammed Al-Dosari", "Nouf Abdullah", "Yasser Hassan", "Layla Ali"];
            tempGeneratedName = dbNames[Math.floor(Math.random() * dbNames.length)];
        } else {
            // Assigned Client uses their pre-existing Order ID
            inputId = q.preAssignedOrderId || ('Order ID: ' + Math.floor(10000 + Math.random() * 90000));
            tempGeneratedName = q.customerName; 
        }

        // 2. Update the message and show the verification popup
        if(els.verificationMsg) els.verificationMsg.innerText = `The quote is going to be assigned to "${tempGeneratedName}".`;
        if(els.assignIdModal) els.assignIdModal.classList.remove('active');
        if(els.verificationModal) els.verificationModal.classList.add('active');
        
        // 3. Store Order ID temporarily and save
        q.tempOrderId = inputId; 
        localStorage.setItem('pricing_saved', JSON.stringify(saved)); 
    }
});

// THIS IS THE MISSING BLOCK THAT FINALIZES THE VERIFICATION
if (els.btnVerifyConfirm) els.btnVerifyConfirm.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    const quoteIndex = saved.findIndex(item => item.id === activeAssignId);

    if (quoteIndex > -1) {
        const q = saved[quoteIndex];
        
        q.customerName = tempGeneratedName; // Apply the generated name
        q.orderId = q.tempOrderId;          // Apply the stored ID
        q.submittedAt = Date.now(); 
        
        const customers = JSON.parse(localStorage.getItem('pricing_customers') || '[]');
        customers.push(q);
        localStorage.setItem('pricing_customers', JSON.stringify(customers));
        
        saved.splice(quoteIndex, 1);
        localStorage.setItem('pricing_saved', JSON.stringify(saved));
        
        if(els.verificationModal) els.verificationModal.classList.remove('active');
        
        if(els.toast) {
            els.toast.querySelector('span').innerText = `Quote ${q.orderId} finalized for ${tempGeneratedName}!`;
            els.toast.classList.add('show');
            setTimeout(() => els.toast.classList.remove('show'), 3000);
        }
        
        // Reset state
        activeAssignId = null;
        state.activeClient = null;
        state.activeClientId = null;
        tempGeneratedName = null;
        
        switchView('history');
    } else {
        alert("Error: Could not locate the draft to finalize.");
    }
});

// Cancel Logic
if (els.btnVerifyCancel) els.btnVerifyCancel.addEventListener('click', () => {
    if(els.verificationModal) els.verificationModal.classList.remove('active');
});

if (els.filterMonth) els.filterMonth.addEventListener('change', renderReportsList);
if (els.filterYear) els.filterYear.addEventListener('change', renderReportsList);
if (els.filterEmployee) els.filterEmployee.addEventListener('change', renderReportsList);

let chartInstance = null;

function renderReportsList() {
    if (!els.reportsListContainer || !els.productivityChart) return;
    
    const saved = JSON.parse(localStorage.getItem('pricing_saved') || '[]');
    const customers = JSON.parse(localStorage.getItem('pricing_customers') || '[]');
    const allQuotes = [...saved, ...customers];
    const uniqueAuthors = [...new Set(allQuotes.map(q => q.author || 'Employee'))];
    
    if (els.filterEmployee) {
        const currentEmpSelection = els.filterEmployee.value; 
        els.filterEmployee.innerHTML = '<option value="all">All Employees</option>';
        uniqueAuthors.forEach(author => {
            const isSelected = author === currentEmpSelection ? 'selected' : '';
            els.filterEmployee.innerHTML += `<option value="${author}" ${isSelected}>${author}</option>`;
        });
    }

    const selectedMonth = els.filterMonth ? els.filterMonth.value : 'all';
    const selectedYear = els.filterYear ? els.filterYear.value : 'all';
    const selectedEmployee = els.filterEmployee ? els.filterEmployee.value : 'all';

    const stats = {};
    function initAuthor(authorName) { if (!stats[authorName]) stats[authorName] = { savedPeriod: 0, sentPeriod: 0 }; }

    function isQuoteInFilter(timestamp, authorName) {
        const date = new Date(timestamp);
        const m = date.getMonth().toString();
        const y = date.getFullYear().toString();
        const monthMatch = selectedMonth === 'all' || selectedMonth === m;
        const yearMatch = selectedYear === 'all' || selectedYear === y;
        const employeeMatch = selectedEmployee === 'all' || selectedEmployee === authorName;
        return monthMatch && yearMatch && employeeMatch;
    }

    saved.forEach(q => {
        const author = q.author || 'Employee';
        if (isQuoteInFilter(q.id, author)) { initAuthor(author); stats[author].savedPeriod++; }
    });

    customers.forEach(q => {
        const author = q.author || 'Employee';
        const timestamp = q.submittedAt || q.id;
        if (isQuoteInFilter(timestamp, author)) { initAuthor(author); stats[author].sentPeriod++; }
    });

    const authors = Object.keys(stats);
    const savedData = authors.map(author => stats[author].savedPeriod);
    const sentData = authors.map(author => stats[author].sentPeriod);

    if (typeof Chart !== 'undefined') {
        const ctx = els.productivityChart.getContext('2d');
        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: authors.length > 0 ? authors : ['No Data'],
                datasets: [
                    { label: 'Saved Drafts', data: authors.length > 0 ? savedData : [0], backgroundColor: '#9ca3af', borderRadius: 4 },
                    { label: 'Finalized Quotes', data: authors.length > 0 ? sentData : [0], backgroundColor: '#10b981', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }

    let html = '';
    for (const [author, data] of Object.entries(stats)) {
        const nameParts = author.split(' ');
        const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : author.substring(0, 2).toUpperCase();
        
        const adminNames = ['Abdulelah Abdullah', 'Sultan Alamoudi', 'Ibrahim Alghalayini', 'Admin'];
        const avatarColor = adminNames.includes(author) ? '#ef4444' : 'var(--accent)';
        
        html += `
        <div class="admin-card">
            <h4 style="display: flex; align-items: center; gap: 12px; font-size: 1.15rem; margin-bottom: 20px;">
                <div class="avatar" style="background-color: ${avatarColor}; color: white;">${initials}</div>
                ${author}
            </h4>
            
            <div style="background: var(--primary-light); padding: 16px; border-radius: var(--radius-md); margin-bottom: 16px;">
                <p style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Drafts</p>
                <div class="flex-between"><span class="text-sm">In Selected Period:</span> <strong>${data.savedPeriod}</strong></div>
            </div>
            
            <div style="background: #ecfdf5; padding: 16px; border-radius: var(--radius-md);">
                <p style="font-size: 0.85rem; font-weight: 700; color: var(--success); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Finalized Quotes</p>
                <div class="flex-between"><span class="text-sm">In Selected Period:</span> <strong style="color: var(--success);">${data.sentPeriod}</strong></div>
            </div>
        </div>`;
    }

    if (authors.length === 0) {
        html = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">No productivity data found for the selected filters.</p>';
    }

    els.reportsListContainer.innerHTML = html;
}
