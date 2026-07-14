const serviceSchema = {
    "rnd": {
        id: "rnd", title: "Research & Development", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9z"/></svg>',
        fields: [
            { 
                id: "literature", label: "Data Availability Status", type: "segment", 
                options: [{label: "Complete", val: 5000}, {label: "Partial", val: 10000, default: true}, {label: "None", val: 15000}], 
                descriptions: {
                    "Complete": "Example: Tools or devices that are well-documented and easy to find, like heart rate monitors or decay sensors.",
                    "Partial": "Example: Concepts exist but require significant adaptation, research, or integration. (e.g., designing a custom PCB around existing reference designs or adapting an existing motor controller for a specialized application).",
                    "None": "Example: Cutting-edge nano to micro technology, or huge, advance robotics",
                }, isMultiplier: false 
            },
            { id: "R&D Report", label: "Include Documentation", type: "toggle", val: 750 }

        ]
    },
    "rev-eng": {
        id: "rev-eng", title: "Reverse Engineering", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        fields: [
            { id: "domain", label: "Engineering Domain", type: "segment", options: [{label: "Electrical", val: 1200, default: true}, {label: "Mechanical", val: 1000}, {label: "Both", val: 2500}], isMultiplier: false },
            { id: "pcb-size", label: "PCB Size", type: "segment", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, options: [{label: "Under 3x3 cm", val: 1000, default: true},{label: "Under 5x5 cm", val: 800},{label: "Under 7x7 cm", val: 600},{label: "Under 9x9 cm", val: 400},{label: "Under 11x11 cm", val: 250}, {label: "Larger", val: 500}], isMultiplier: false },
            { id: "files-elec", label: "No. File formats (Electrical)", type: "slider", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, min: 1, max: 10, val: 4, step: 1, multiplier: 50 },
            { id: "sensors", label: "No. Sensors", type: "slider", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, min: 0, max: 20, val: 3, step: 1, multiplier: 75 },
            { id: "actuators", label: "No. Actuators", type: "slider", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, min: 0, max: 20, val: 4, step: 1, multiplier: 75 },
            { id: "components", label: "No. Components", type: "segment", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, options: [{label: "1-10", val: 100}, {label: "11-30", val: 300, default: true}, {label: "31+", val: 600}], isMultiplier: false },
            { 
                id: "docs", label: "Datasheets & Schematics Availability", type: "segment", dependsOn: {field: "domain", values: ["Electrical", "Both"]}, 
                options: [ {label: "Complete", val: 0}, {label: "Partial", val: 200}, {label: "Minimal", val: 400, default: true}, {label: "None", val: 700} ], 
                descriptions: {
                    "Complete": "Example: Full schematics, precise BOM, and all component datasheets are provided.",
                    "Partial": "Example: Some datasheets available, but missing main schematics or specific proprietary chip data.",
                    "Minimal": "Example: Only a high-level block diagram or basic user manual is available.",
                    "None": "Example: No reference materials provided. A complete blind teardown is required."
                }, isMultiplier: false 
            },
            { id: "files-mech", label: "No. File formats (Mechanical)", type: "slider", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, min: 1, max: 10, val: 3, step: 1, multiplier: 50 },
            
            // --- Updated Geometry Field ---
            { 
                id: "geometry", label: "Geometry Complexity", type: "segment", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, 
                options: [{label: "Sketch", val: 1}, {label: "Standard", val: 1.2, default: true}, {label: "Sculpted", val: 1.5}, {label: "Detailed", val: 2}], 
                descriptions: {
                    "Sketch": "flat surfaces, basic extrusions, and straight cuts (e.g., basic plates, simple blocks).",
                    "Standard": "Standard mechanical parts with fillets, chamfers, and simple contours (e.g., brackets, simple gears).",
                    "Sculpted": "Complex surfacing, multi-axis features, or interlocking geometries (e.g., molded housings, impellers).",
                    "Detailed": "Highly complex, organic, or sculpted surfaces requiring advanced modeling or scan-data tracing (e.g., ergonomic grips, complex cast parts)."
                }, isMultiplier: true 
            },

            { id: "parts", label: "No. Parts", type: "slider", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, min: 1, max: 50, val: 5, step: 1, multiplier: 80 },
            { id: "measure", label: "No. Parts to measure", type: "slider", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, min: 0, max: 50, val: 7, step: 1, multiplier: 40 },
            { id: "dof", label: "Degree of Freedom", type: "segment", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, options: [{label: "None", val: 1}, {label: "1-2", val: 1.3, default: true}, {label: "3+", val: 1.8}], isMultiplier: true },
            { id: "software", label: "Software", type: "segment", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, options: [{label: "CAD", val: 200, default: true}, {label: "Other", val: 350}], isMultiplier: false },
            { id: "drawing", label: "Drawing Sheet", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, val: 150 },
            { id: "color", label: "Color Required", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, val: 100 },
            { id: "assembly", label: "Assembly Required", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, val: 300 },
            { id: "render", label: "Render", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, val: 200 },
            { id: "animation", label: "Animation", type: "toggle", dependsOn: {field: "domain", values: ["Mechanical", "Both"]}, val: 400 }
        ]
    },
    "elec-design": {
        id: "elec-design", title: "Electrical Circuit Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        fields: [
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 4, step: 1, multiplier: 50 },
            { id: "sensors", label: "No. Sensors", type: "slider", min: 0, max: 20, val: 3, step: 1, multiplier: 75 },
            { id: "actuators", label: "No. Actuators", type: "slider", min: 0, max: 20, val: 4, step: 1, multiplier: 75 },
            { id: "prototyping", label: "Include Breadboard Prototype", type: "toggle", val: 750 }
        ]
    },
    "hw-prog": {
        id: "hw-prog", title: "Hardware Programming", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
        fields: [
            { id: "mcu", label: "Microcontroller", type: "segment", options: [{label: "Arduino", val: 1000}, {label: "STM32/ESP", val: 2500, default: true}, {label: "FPGA/Custom", val: 6000}], isMultiplier: false },
            { id: "connectivity", label: "IoT / Wireless Stack", type: "toggle", val: 1200 },
            { id: "no-code-app", label: "No Coding App Included", type: "toggle", val: 1500 }
        ]
    },
    "3d-design": {
        id: "3d-design", title: "3D Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
        fields: [
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 3, step: 1, multiplier: 50 },
            
            // --- Updated Geometry Field ---
            { 
                id: "geometry", label: "Geometry Complexity", type: "segment", 
                options: [{label: "Sketch", val: 1}, {label: "Standard", val: 1.2, default: true}, {label: "Sculpted", val: 1.5}, {label: "Detailed", val: 2}], 
                descriptions: {
                    "Sketch": "flat surfaces, basic extrusions, and straight cuts (e.g., basic plates, simple blocks).",
                    "Standard": "Standard mechanical parts with fillets, chamfers, and simple contours (e.g., brackets, simple gears).",
                    "Sculpted": "Complex surfacing, multi-axis features, or interlocking geometries (e.g., molded housings, impellers).",
                    "Detailed": "Highly complex, organic, or sculpted surfaces requiring advanced modeling or scan-data tracing (e.g., ergonomic grips, complex cast parts)."
                }, isMultiplier: true 
            },

            { id: "parts", label: "No. Parts", type: "slider", min: 1, max: 50, val: 5, step: 1, multiplier: 80 },
            { id: "measure", label: "No. Parts to measure", type: "slider", min: 0, max: 50, val: 7, step: 1, multiplier: 40 },
            { id: "dof", label: "Degree of Freedom", type: "segment", options: [{label: "None", val: 1}, {label: "1-2", val: 1.3, default: true}, {label: "3+", val: 1.8}], isMultiplier: true },
            { id: "software", label: "Software", type: "segment", options: [{label: "CAD", val: 200, default: true}, {label: "Other", val: 350}], isMultiplier: false },
            { id: "drawing", label: "Drawing Sheet", type: "toggle", val: 150 },
            { id: "color", label: "Color Required", type: "toggle", val: 100 },
            { id: "assembly", label: "Assembly Required", type: "toggle", val: 300 },
            { id: "render", label: "Render", type: "toggle", val: 200 },
            { id: "animation", label: "Animation", type: "toggle", val: 400 }
        ]
    },
    "3d-print": {
        id: "3d-print", title: "3D Printing", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zM12 12l9-4.5M12 12v10M12 12L3 7.5"/></svg>',
        fields: [
            { id: "material", label: "Material", type: "segment", options: [{label: "PLA / PETG", val: 50, default: true}, {label: "ABS / ASA", val: 80}, {label: "Resin / Nylon", val: 150}], isMultiplier: false },
            { id: "amount", label: "Total Amount of Material (g)", type: "slider", min: 10, max: 2000, val: 50, step: 10, multiplier: 1.5 },
            { id: "time", label: "Total Printing time (Hours)", type: "slider", min: 1, max: 72, val: 4, step: 1, multiplier: 30 },
            { id: "qty", label: "Quantity Discount", type: "segment", options: [{label: "1-9", val: 1, default: true}, {label: "10-99", val: 0.8}, {label: "100+", val: 0.65}], isMultiplier: true },
            { id: "postprocess", label: "Post-Processing (Support Removal, Sanding)", type: "toggle", val: 150 },
            { id: "paint", label: "Painting / Coating", type: "toggle", val: 200 }
        ]
    },
    "pcb-design": {
        id: "pcb-design", title: "PCB Design", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
        fields: [
            { id: "pcb-size", label: "PCB Size", type: "segment", options: [{label: "Under 3x3 cm", val: 1000, default: true},{label: "Under 5x5 cm", val: 800},{label: "Under 7x7 cm", val: 600},{label: "Under 9x9 cm", val: 400},{label: "Under 11x11 cm", val: 250}, {label: "Larger", val: 500}], isMultiplier: false },
            { id: "files", label: "No. File formats", type: "slider", min: 1, max: 10, val: 4, step: 1, multiplier: 50 },
            { id: "sensors", label: "No. Sensors", type: "slider", min: 0, max: 20, val: 3, step: 1, multiplier: 75 },
            { id: "actuators", label: "No. Actuators", type: "slider", min: 0, max: 20, val: 4, step: 1, multiplier: 75 },
            { id: "components", label: "No. Components", type: "segment", options: [{label: "1-10", val: 100}, {label: "11-30", val: 300, default: true}, {label: "31+", val: 600}], isMultiplier: false }
        ]
    },
    "pcb-mfg": {
        id: "pcb-mfg", title: "PCB Manufacturing", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4l2-2h4l2 2h4l2-2h4M2 12v6h20v-6"/></svg>',
        fields: [
            { id: "manual-price", label: "Manual Factory Cost (SAR)", type: "slider", min: 50, max: 10000, val: 500, step: 50, multiplier: 1 },
            { id: "profit", label: "Markup / Handling Margin", type: "segment", options: [{label: "Standard +25%", val: 1.25, default: true}, {label: "Expedited +50%", val: 1.5}, {label: "Base Price Only", val: 1}], isMultiplier: true }
        ]
    },
    "consulting": {
        id: "consulting", title: "Engineering Consulting", basePrice: 0,
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        fields: [
            { 
                id: "client-type", 
                label: "Client Type", 
                type: "segment", 
                options: [ 
                    {label: "Individuals", val: 1, default: true}, 
                    {label: "Companies", val: 2} 
                ], 
                isMultiplier: true 
            },
            { 
                id: "hours", 
                label: "Estimated Consulting Time (Hours)", 
                type: "slider", 
                min: 1, 
                max: 24, 
                val: 10, 
                step: 1, 
                multiplier: 250 
            }
        ]
    }
};


// Application State
const state = {
    selectedServices: [],
    currentView: 'selection', // selection, wizard, summary
    wizardStepIndex: 0,
    serviceConfigs: {} // holds user inputs per service
};

// DOM Elements
const els = {
    servicesGrid: document.getElementById('services-grid'),
    btnStartWizard: document.getElementById('btn-start-wizard'),
    viewSelection: document.getElementById('view-selection'),
    viewWizard: document.getElementById('view-wizard'),
    viewSummary: document.getElementById('view-summary'),
    wizardFormContainer: document.getElementById('wizard-form-container'),
    livePrice: document.getElementById('live-price'),
    liveServiceName: document.getElementById('live-service-name'),
    btnNextStep: document.getElementById('btn-next-step'),
    btnPrevStep: document.getElementById('btn-prev-step'),
    summaryItems: document.getElementById('summary-items-container'),
    summarySubtotal: document.getElementById('summary-subtotal'),
    summaryTax: document.getElementById('summary-tax'),
    summaryGrand: document.getElementById('summary-grand'),
    btnGenerateQuote: document.getElementById('btn-generate-quote'),
    btnEditServices: document.getElementById('btn-edit-services'),
    progressBar: document.getElementById('progress-bar'),
    viewTitle: document.getElementById('view-title'),
    modal: document.getElementById('confirmation-modal'),
    btnConfirmModal: document.getElementById('btn-confirm-modal'),
    btnCancelModal: document.getElementById('btn-cancel-modal'),
    toast: document.getElementById('toast'),
    themeToggle: document.getElementById('theme-toggle')
};

// Initialize Selection View
function initSelectionGrid() {
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
            els.btnStartWizard.disabled = state.selectedServices.length === 0;
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
            state.serviceConfigs[serviceId].fields[field.id] = false; // toggle default is false unless explicitly handled
        }
    });
}

// Navigation Controls
function switchView(viewName) {
    els.viewSelection.classList.remove('active');
    els.viewWizard.classList.remove('active');
    els.viewSummary.classList.remove('active');
    
    if (viewName === 'selection') {
        els.viewSelection.classList.add('active');
        els.viewTitle.innerText = "Select Services";
        updateProgress(10);
    } else if (viewName === 'wizard') {
        els.viewWizard.classList.add('active');
        renderWizardStep();
    } else if (viewName === 'summary') {
        els.viewSummary.classList.add('active');
        els.viewTitle.innerText = "Quote Summary";
        renderSummary();
        updateProgress(100);
    }
    state.currentView = viewName;
}

function updateProgress(percentage) {
    els.progressBar.style.width = percentage + '%';
}

// Wizard Rendering & Logic
function renderWizardStep() {
    const serviceId = state.selectedServices[state.wizardStepIndex];
    const schema = serviceSchema[serviceId];
    const config = state.serviceConfigs[serviceId].fields;
    
    els.viewTitle.innerText = `Configure ${schema.title}`;
    els.liveServiceName.innerText = schema.title;
    
    const totalSteps = state.selectedServices.length + 2; 
    const currentAbsoluteStep = state.wizardStepIndex + 2;
    updateProgress((currentAbsoluteStep / totalSteps) * 100);

    let formHTML = `<div class="view-header">
        <h3>${schema.title}</h3>
        <p>Adjust the parameters below to calculate the service cost.</p>
    </div>`;

    schema.fields.forEach(field => {
        // --- UPDATED: Check if current value exists in the 'values' array ---
        if (field.dependsOn && !field.dependsOn.values.includes(config[field.dependsOn.field])) {
            return; 
        }

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
            
        } else if (field.type === 'toggle') {
            const isChecked = config[field.id] ? 'checked' : '';
            formHTML += `
                <label class="toggle-control">
                    <span>${field.label}</span>
                    <input type="checkbox" id="${field.id}" ${isChecked}>
                    <div class="toggle-switch"></div>
                </label>
            `;
        } else if (field.type === 'slider') {
            formHTML += `
                <label class="form-label">${field.label}: <span class="slider-value" id="val-${field.id}">${config[field.id]}</span></label>
                <input type="range" class="slider-control" id="${field.id}" min="${field.min}" max="${field.max}" step="${field.step}" value="${config[field.id]}">
            `;
        }
        formHTML += `</div>`;
    });

    els.wizardFormContainer.innerHTML = formHTML;

    // Attach Listeners
    schema.fields.forEach(field => {
        // --- UPDATED ---
        if (field.dependsOn && !field.dependsOn.values.includes(config[field.dependsOn.field])) return;

        if (field.type === 'segment') {
            const radios = document.getElementsByName(field.id);
            radios.forEach(r => r.addEventListener('change', (e) => {
                state.serviceConfigs[serviceId].fields[field.id] = e.target.value;
                
                if (field.descriptions) {
                    const descEl = document.getElementById(`desc-${field.id}`);
                    if (descEl) descEl.innerText = field.descriptions[e.target.value];
                }
                
                const triggersReRender = schema.fields.some(f => f.dependsOn && f.dependsOn.field === field.id);
                if (triggersReRender) {
                    renderWizardStep();
                } else {
                    calculateLivePrice(serviceId);
                }
            }));
        } else if (field.type === 'toggle') {
            document.getElementById(field.id).addEventListener('change', (e) => {
                state.serviceConfigs[serviceId].fields[field.id] = e.target.checked;
                calculateLivePrice(serviceId);
            });
        } else if (field.type === 'slider') {
            const slider = document.getElementById(field.id);
            const valDisplay = document.getElementById(`val-${field.id}`);
            slider.addEventListener('input', (e) => {
                valDisplay.innerText = e.target.value;
                state.serviceConfigs[serviceId].fields[field.id] = parseFloat(e.target.value);
                calculateLivePrice(serviceId);
            });
        }
    });
    
    els.btnNextStep.innerHTML = state.wizardStepIndex === state.selectedServices.length - 1 
        ? 'Review Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' 
        : 'Next Service <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

    calculateLivePrice(serviceId);
}

function calculateLivePrice(serviceId) {
    const schema = serviceSchema[serviceId];
    const config = state.serviceConfigs[serviceId].fields;
    
    let base = schema.basePrice;
    let multiplier = 1;
    let additions = 0;

    schema.fields.forEach(field => {
        // --- UPDATED ---
        if (field.dependsOn && !field.dependsOn.values.includes(config[field.dependsOn.field])) {
            return; 
        }

        const userVal = config[field.id];
        
        if (field.type === 'segment') {
            const opt = field.options.find(o => o.label === userVal);
            if (opt) {
                if (field.isMultiplier) multiplier *= opt.val;
                else additions += opt.val;
            }
        } else if (field.type === 'toggle') {
            if (userVal) additions += field.val;
        } else if (field.type === 'slider') {
            additions += (userVal * field.multiplier);
        }
    });

    const finalPrice = (base + additions) * multiplier;
    state.serviceConfigs[serviceId].price = finalPrice;
    
    els.livePrice.innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(finalPrice);
}

// Summary Rendering Helper: Calculates the Urgency UI and Multiplier
function updateUrgencyUI() {
    const urgencyToggle = document.getElementById('g-urgency-toggle');
    const urgencySlider = document.getElementById('g-urgency-slider');
    const urgencyValDisplay = document.getElementById('g-urgency-val');
    const urgencyDescDisplay = document.getElementById('g-urgency-desc');
    const urgencyContainer = document.getElementById('urgency-slider-container');

    if (!urgencyToggle || !urgencySlider) return 1.0;

    const hasDeadline = urgencyToggle.checked;
    
    // Dim and disable the slider if no deadline is provided
    urgencyContainer.style.opacity = hasDeadline ? '1' : '0.4';
    urgencySlider.disabled = !hasDeadline;

    if (!hasDeadline) {
        urgencyValDisplay.innerText = "--";
        urgencyDescDisplay.innerText = "Flexible Timeline";
        urgencyDescDisplay.style.color = "var(--text-secondary)";
        return 1.0;
    }

    const weeks = parseInt(urgencySlider.value);
    urgencyValDisplay.innerText = weeks + " Weeks";
    urgencyDescDisplay.style.color = "var(--accent)";
    
    // Map slider values to multipliers and text
    if (weeks <= 1) {
        urgencyDescDisplay.innerText = "Critical";
        return 3.0;
    } else if (weeks <= 3) {
        urgencyDescDisplay.innerText = "Rushed";
        return 1.5;
    } else if (weeks <= 5) {
        urgencyDescDisplay.innerText = "Fast-Track";
        return 1.5;
    } else if (weeks <= 7) {
        urgencyDescDisplay.innerText = "Standard";
        return 1.2;
    } else {
        urgencyDescDisplay.innerText = "Flexible";
        urgencyDescDisplay.style.color = "var(--text-secondary)";
        return 1.0;
    }
}

// Summary Rendering
function renderSummary() {
    els.summaryItems.innerHTML = '';
    let multipliableSubtotal = 0;
    let exemptSubtotal = 0;

    // 1. Read Global Multipliers FIRST
    const globalOrgElement = document.querySelector('input[name="global-org"]:checked');
    const orgMultiplier = parseFloat(globalOrgElement.value);

    // Call our helper function to update text visually and grab the math multiplier
    const urgencyMultiplier = updateUrgencyUI(); 

    // Combine them mathematically into a single multiplier for standard services
    const combinedMultiplier = orgMultiplier * urgencyMultiplier;

    // 2. Calculate Base Prices and Render Individual Services
    state.selectedServices.forEach(serviceId => {
        const schema = serviceSchema[serviceId];
        const config = state.serviceConfigs[serviceId].fields;
        
        const basePrice = state.serviceConfigs[serviceId].price; 
        let finalServicePrice;

        // --- Bypass rule for Consulting AND PCB Manufacturing ---
        if (serviceId === 'consulting' || serviceId === 'pcb-mfg') {
            finalServicePrice = basePrice; // No global multipliers applied
            exemptSubtotal += basePrice;
        } else {
            finalServicePrice = basePrice * combinedMultiplier; // Apply both org and urgency multipliers
            multipliableSubtotal += basePrice;
        }

        let details = schema.fields
            .filter(f => !f.dependsOn || f.dependsOn.values.includes(config[f.dependsOn.field]))
            .map(f => {
                const val = config[f.id];
                return f.type === 'toggle' ? (val ? f.label : '') : val;
            })
            .filter(Boolean)
            .join(' • ');

        els.summaryItems.innerHTML += `
            <div class="summary-card">
                <div class="summary-card-info">
                    <h4>${schema.title}</h4>
                    <p>${details}</p>
                </div>
                <div class="summary-card-price">${new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(finalServicePrice)}</div>
            </div>
        `;
    });
    
    // 3. Apply Math for Totals
    let adjustedSubtotal = (multipliableSubtotal * combinedMultiplier) + exemptSubtotal;

    // --- NEW: Documentation Toggle Logic ---
    const reportToggle = document.getElementById('g-report-toggle');
    const reportRow = document.getElementById('summary-report-row');
    const reportCostDisplay = document.getElementById('summary-report-cost');
    
    // Set your desired flat fee for the testing report here
    const reportFee = 750; 

    if (reportToggle && reportToggle.checked) {
        adjustedSubtotal += reportFee;
        if (reportRow) {
            reportRow.style.display = 'flex';
            reportCostDisplay.innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(reportFee);
        }
    } else if (reportRow) {
        reportRow.style.display = 'none';
    }
    // ---------------------------------------

    const tax = adjustedSubtotal * 0.15; // 15% VAT
    const grandTotal = adjustedSubtotal + tax;

    // 4. Update UI Totals
    document.getElementById('summary-base-subtotal').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(adjustedSubtotal - (reportToggle?.checked ? reportFee : 0));
    document.getElementById('summary-tax').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(tax);
    document.getElementById('summary-grand').innerText = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(grandTotal);
}

// --- Event Listeners ---
els.btnStartWizard.addEventListener('click', () => {
    state.wizardStepIndex = 0;
    switchView('wizard');
});

els.btnNextStep.addEventListener('click', () => {
    if (state.wizardStepIndex < state.selectedServices.length - 1) {
        state.wizardStepIndex++;
        els.wizardFormContainer.style.opacity = 0;
        setTimeout(() => {
            renderWizardStep();
            els.wizardFormContainer.style.opacity = 1;
        }, 200);
    } else {
        switchView('summary');
    }
});

els.btnPrevStep.addEventListener('click', () => {
    if (state.wizardStepIndex > 0) {
        state.wizardStepIndex--;
        renderWizardStep();
    } else {
        switchView('selection');
    }
});

els.btnEditServices.addEventListener('click', () => switchView('selection'));

els.btnGenerateQuote.addEventListener('click', () => {
    els.modal.classList.add('active');
});

els.btnCancelModal.addEventListener('click', () => {
    els.modal.classList.remove('active');
});

els.btnConfirmModal.addEventListener('click', () => {
    els.modal.classList.remove('active');
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), 3000);
    setTimeout(() => {
        state.selectedServices = [];
        state.serviceConfigs = {};
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
        els.btnStartWizard.disabled = true;
        switchView('selection');
    }, 3500);
});

els.themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});

// Boot
initSelectionGrid();
updateProgress(10);

// Global Listeners for Summary screen inputs
document.getElementsByName('global-org').forEach(radio => {
    radio.addEventListener('change', renderSummary);
});
document.getElementById('g-urgency-toggle').addEventListener('change', renderSummary);
document.getElementById('g-urgency-slider').addEventListener('input', renderSummary);

// NEW: Listener for the Documentation toggle
document.getElementById('g-report-toggle').addEventListener('change', renderSummary);