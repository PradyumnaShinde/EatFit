// 6. ADD GLOBAL ERROR HANDLER
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Error:", message, "at", lineno, "col:", colno, error);
};

console.log("Initializing Smart Nutrition Planner...");

// 1. Food Database
const foodDatabase = {
    roti:       { name: "Roti", category: "staple", baseW: 40, p: 3, carbs: 15, f: 1, fib: 2, c: 110, diet: "veg", allergens: ["gluten"], capacityKey: "maxRoti" },
    rice:       { name: "Rice", category: "staple", baseW: 150, p: 3, carbs: 40, f: 0.5, fib: 1, c: 180, diet: "veg", allergens: [], capacityKey: "maxRice" },
    idli:       { name: "Idli", category: "staple", baseW: 50, p: 2, carbs: 12, f: 0.2, fib: 1, c: 60, diet: "veg", allergens: [], capacityKey: null },
    dosa:       { name: "Dosa", category: "staple", baseW: 100, p: 3, carbs: 25, f: 4, fib: 1, c: 150, diet: "veg", allergens: [], capacityKey: null },
    dal:        { name: "Dal", category: "protein", baseW: 150, p: 6, carbs: 20, f: 1, fib: 5, c: 120, diet: "veg", allergens: [], capacityKey: "maxDal" },
    rajma:      { name: "Rajma", category: "protein", baseW: 150, p: 7, carbs: 22, f: 1, fib: 6, c: 130, diet: "veg", allergens: [], capacityKey: "maxDal" },
    chole:      { name: "Chole", category: "protein", baseW: 150, p: 6, carbs: 25, f: 3, fib: 5, c: 160, diet: "veg", allergens: [], capacityKey: "maxDal" },
    paneer:     { name: "Paneer", category: "protein", baseW: 50, p: 8, carbs: 2, f: 12, fib: 0, c: 150, diet: "veg", allergens: ["milk"], capacityKey: null },
    soyChunks:  { name: "Soy Chunks", category: "protein", baseW: 50, p: 26, carbs: 16, f: 0.5, fib: 6, c: 170, diet: "veg", allergens: [], capacityKey: null },
    egg:        { name: "Egg", category: "protein", baseW: 50, p: 6, carbs: 0.5, f: 5, fib: 0, c: 70, diet: "nonveg", allergens: [], capacityKey: null },
    alooSabji:  { name: "Aloo Sabji", category: "sabji", baseW: 100, p: 2, carbs: 18, f: 5, fib: 2, c: 130, diet: "veg", allergens: [], capacityKey: null },
    mixedVeg:   { name: "Mixed Veg", category: "sabji", baseW: 100, p: 3, carbs: 10, f: 4, fib: 4, c: 90, diet: "veg", allergens: [], capacityKey: null },
    bhindi:     { name: "Bhindi (Okra)", category: "sabji", baseW: 100, p: 2, carbs: 7, f: 4, fib: 3, c: 80, diet: "veg", allergens: [], capacityKey: null },
    milk:       { name: "Milk", category: "dairy", baseW: 250, p: 8, carbs: 12, f: 8, fib: 0, c: 150, diet: "veg", allergens: ["milk"], capacityKey: null },
    curd:       { name: "Curd (Dahi)", category: "dairy", baseW: 100, p: 4, carbs: 5, f: 3, fib: 0, c: 60, diet: "veg", allergens: ["milk"], capacityKey: null },
    buttermilk: { name: "Buttermilk", category: "beverage", baseW: 200, p: 2, carbs: 3, f: 1, fib: 0, c: 30, diet: "veg", allergens: ["milk"], capacityKey: null },
    tea:        { name: "Tea", category: "beverage", baseW: 150, p: 1, carbs: 10, f: 1, fib: 0, c: 60, diet: "veg", allergens: ["milk"], capacityKey: null },
    banana:     { name: "Banana", category: "snack", baseW: 118, p: 1.3, carbs: 27, f: 0.3, fib: 3, c: 105, diet: "veg", allergens: [], capacityKey: null },
    peanutChaat:{ name: "Peanut Chaat", category: "snack", baseW: 50, p: 12, carbs: 8, f: 24, fib: 4, c: 280, diet: "veg", allergens: ["peanuts"], capacityKey: null }
};

// 2. Global State
let dailyGoal = { p: 0, carbs: 0, f: 0, fib: 0, c: 0 };
let consumed = { p: 0, carbs: 0, f: 0, fib: 0, c: 0 };
let tempSuggestion = []; 

// 3. UI Selectors
const ui = {
    weight: document.getElementById('weight'), 
    diet: document.getElementById('diet'),
    allergyMilk: document.getElementById('allergyMilk'), 
    allergyPeanuts: document.getElementById('allergyPeanuts'), 
    allergyGluten: document.getElementById('allergyGluten'),
    avoidFoods: document.getElementById('avoidFoods'), 
    planningMode: document.getElementById('planningMode'),
    messInputContainer: document.getElementById('messInputContainer'), 
    messFoods: document.getElementById('messFoods'),
    maxRoti: document.getElementById('maxRoti'), 
    maxRice: document.getElementById('maxRice'), 
    maxDal: document.getElementById('maxDal'),
    foodSearch: document.getElementById('foodSearch'), 
    categoryFilter: document.getElementById('categoryFilter'),
    foodSel: document.getElementById('foodSelect'), 
    sizeSel: document.getElementById('sizeSelect'), 
    qty: document.getElementById('quantity'),
    suggList: document.getElementById('suggestionList'), 
    suggBox: document.getElementById('suggestionResult'),
    dashboardGrid: document.getElementById('dashboardGrid'),
    nlpInput: document.getElementById('nlpInput'), 
    nlpBtn: document.getElementById('nlpBtn'),
    apiInput: document.getElementById('onlineSearchInput'), 
    apiBtn: document.getElementById('onlineSearchBtn'),
    apiLoader: document.getElementById('apiLoader'), 
    apiResultsGrid: document.getElementById('apiResultsGrid'),
    customFoodContainer: document.getElementById('customFoodContainer'), 
    apiWarning: document.getElementById('apiWarning'), 
    customFoodTitle: document.getElementById('customFoodTitle'),
    
    // Explicitly grab buttons
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    suggestBtn: document.getElementById('suggestBtn'),
    acceptSuggBtn: document.getElementById('acceptSuggBtn'),
    addFoodBtn: document.getElementById('addFoodBtn'),
    toggleCustomFoodBtn: document.getElementById('toggleCustomFoodBtn'),
    saveCustomFoodBtn: document.getElementById('saveCustomFoodBtn')
};

// 1. Add SAFETY CHECKS on initialization
Object.keys(ui).forEach(key => {
    if (!ui[key]) console.error(`Missing element on load: ${key}`);
});

// Helper for showing UI messages inside the NLP section
function showUIMessage(msg, type) {
    if (!ui.nlpInput) return console.error("Missing element: nlpInput");
    console.log(`UI Message (${type}): ${msg}`);
    
    const nlpSection = document.querySelector('.smart-input-section');
    if (!nlpSection) return console.error("Missing element: .smart-input-section");
    
    let msgDiv = document.getElementById('nlpFeedbackMsg');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'nlpFeedbackMsg';
        msgDiv.style.marginTop = '10px';
        msgDiv.style.fontSize = '13px';
        msgDiv.style.fontWeight = 'bold';
        nlpSection.appendChild(msgDiv);
    }
    
    msgDiv.textContent = msg;
    msgDiv.style.color = type === 'success' ? '#27ae60' : '#e3a008';
    
    setTimeout(() => { if(msgDiv) msgDiv.textContent = ''; }, 6000);
}

// 4. Core Planner Logic 
function getFilteredProfileFoods() {
    console.log("Filtering profile foods...");
    if (!ui.diet || !ui.avoidFoods || !ui.planningMode || !ui.messFoods) {
        console.error("Missing elements during getFilteredProfileFoods");
        return Object.entries(foodDatabase);
    }

    const userDiet = ui.diet.value;
    const avoids = ui.avoidFoods.value.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const allergies = [];
    if (ui.allergyMilk && ui.allergyMilk.checked) allergies.push('milk');
    if (ui.allergyPeanuts && ui.allergyPeanuts.checked) allergies.push('peanuts');
    if (ui.allergyGluten && ui.allergyGluten.checked) allergies.push('gluten');

    let available = Object.entries(foodDatabase).filter(([_, food]) => {
        if (userDiet === 'veg' && food.diet === 'nonveg') return false;
        if (food.allergens && food.allergens.some(a => allergies.includes(a))) return false;
        if (avoids.includes(food.name.toLowerCase())) return false;
        return true;
    });

    if (ui.planningMode.value === 'mess') {
        const messItems = ui.messFoods.value.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        if (messItems.length > 0) available = available.filter(([_, food]) => messItems.some(item => food.name.toLowerCase().includes(item)));
    }
    
    console.log(`Found ${available.length} available foods after filtering.`);
    return available;
}

// 5. FIX DROPDOWN BUG
function updateFoodDropdown() {
    console.log("Updating food dropdown...");
    if (!ui.foodSearch || !ui.categoryFilter || !ui.foodSel || !ui.sizeSel || !ui.addFoodBtn) {
        return console.error("Missing elements during updateFoodDropdown");
    }

    const searchTerm = ui.foodSearch.value.toLowerCase();
    const category = ui.categoryFilter.value;
    const currentSelection = ui.foodSel.value;
    ui.foodSel.innerHTML = '';
    
    let count = 0;
    getFilteredProfileFoods().forEach(([key, food]) => {
        if (food.name.toLowerCase().includes(searchTerm) && (category === 'all' || food.category === category)) {
            ui.foodSel.add(new Option(food.name, key));
            count++;
        }
    });

    if (count === 0) {
        console.log("No foods found in dropdown. Disabling add button.");
        ui.foodSel.add(new Option("No foods found", ""));
        ui.sizeSel.innerHTML = '<option value="">N/A</option>';
        ui.addFoodBtn.disabled = true;
        ui.addFoodBtn.style.opacity = '0.5';
        ui.addFoodBtn.style.cursor = 'not-allowed';
    } else {
        console.log("Populated dropdown. Enabling add button.");
        ui.addFoodBtn.disabled = false;
        ui.addFoodBtn.style.opacity = '1';
        ui.addFoodBtn.style.cursor = 'pointer';
        
        if (Array.from(ui.foodSel.options).some(opt => opt.value === currentSelection)) {
            ui.foodSel.value = currentSelection;
        }
        updateSizes();
    }
}

function updateSizes() {
    console.log("Updating size dropdown...");
    if (!ui.foodSel || !ui.sizeSel) return console.error("Missing elements during updateSizes");

    const food = ui.foodSel.value;
    if (!food) return;
    ui.sizeSel.innerHTML = '';
    const sizes = (['roti', 'idli', 'dosa'].includes(food)) ? [['small', 'Small'], ['medium', 'Medium'], ['large', 'Large']] : [['half', 'Half'], ['standard', 'Standard'], ['double', 'Double']];
    sizes.forEach(s => ui.sizeSel.add(new Option(s[1], s[0])));
}

function calculateIntake(foodId, sizeId, qty) {
    console.log(`Calculating intake for ${qty}x ${sizeId} ${foodId}`);
    const base = foodDatabase[foodId];
    if (!base) return { p: 0, carbs: 0, f: 0, fib: 0, c: 0 };

    let weightMult = 1;
    if (base.category === 'staple' && ['roti', 'idli', 'dosa'].includes(foodId)) {
        if (sizeId === 'small') weightMult = 0.75;
        if (sizeId === 'large') weightMult = 1.5;
    } else {
        if (sizeId === 'half') weightMult = 0.5;
        if (sizeId === 'double') weightMult = 2.0;
    }
    return { p: base.p * weightMult * qty, carbs: base.carbs * weightMult * qty, f: base.f * weightMult * qty, fib: base.fib * weightMult * qty, c: base.c * weightMult * qty };
}

function commitIntake(data) {
    console.log("Committing intake to dashboard:", data);
    consumed.p += data.p; consumed.carbs += data.carbs; consumed.f += data.f; consumed.fib += data.fib; consumed.c += data.c;
    updateDashboard();
}

function generateSuggestion() {
    console.log("Button clicked: Generate Suggestion");
    if (!ui.maxRoti || !ui.maxRice || !ui.maxDal || !ui.suggList || !ui.suggBox) {
        return console.error("Missing elements during generateSuggestion");
    }

    const remP = dailyGoal.p - consumed.p; const remC = dailyGoal.c - consumed.c;
    if (remP <= 0 && remC <= 0) return alert("You have met both your protein and calorie goals!");

    let availableFoods = getFilteredProfileFoods().map(([key, data]) => ({ key, ...data, score: (data.p / (data.c || 1)) * 100 }));
    if (availableFoods.length === 0) return alert("No foods available to suggest.");

    availableFoods.sort((a, b) => b.score - a.score);

    tempSuggestion = [];
    let cur = { p: 0, carbs: 0, f: 0, fib: 0, c: 0 };
    const caps = { maxRoti: parseInt(ui.maxRoti.value)||0, maxRice: parseInt(ui.maxRice.value)||0, maxDal: parseInt(ui.maxDal.value)||0 };

    for (let food of availableFoods) {
        let qty = 0; let limit = food.capacityKey ? caps[food.capacityKey] : (['snack','beverage'].includes(food.category) ? 1 : 2);
        while (qty < limit && (cur.p < remP || cur.c < (remC * 0.5))) {
            if (cur.c + food.c > remC + 200) break;
            qty++; cur.p += food.p; cur.carbs += food.carbs; cur.f += food.f; cur.fib += food.fib; cur.c += food.c;
        }
        if (qty > 0) tempSuggestion.push({ name: food.name, key: food.key, qty, p: food.p*qty, carbs: food.carbs*qty, f: food.f*qty, fib: food.fib*qty, c: food.c*qty });
    }

    ui.suggList.innerHTML = '';
    tempSuggestion.forEach(item => { let li = document.createElement('li'); li.textContent = `${item.qty} x ${item.name}`; ui.suggList.appendChild(li); });
    
    document.getElementById('suggProt').textContent = cur.p.toFixed(1); 
    document.getElementById('suggCal').textContent = cur.c.toFixed(0);
    ui.suggBox.classList.remove('hidden');
    console.log("Suggestion generated and displayed.");
}

function updateDashboard() {
    console.log("Updating Dashboard UI");
    if (!ui.dashboardGrid) return console.error("Missing element: dashboardGrid");

    ui.dashboardGrid.innerHTML = '';
    const nts = [ { k: 'p', n: 'Protein', u: 'g' }, { k: 'carbs', n: 'Carbs', u: 'g' }, { k: 'f', n: 'Fats', u: 'g' }, { k: 'fib', n: 'Fiber', u: 'g' }, { k: 'c', n: 'Calories', u: 'kcal' } ];
    
    nts.forEach(n => {
        const goal = dailyGoal[n.k]; const cons = consumed[n.k]; const rem = Math.max(0, goal - cons);
        let pct = goal===0 ? 0 : (cons/goal)*100;
        let status = pct < 70 ? {c:'status-deficient', l:'Deficient'} : pct <= 100 ? {c:'status-optimal', l:'Optimal'} : pct <= 120 ? {c:'status-excess-slight', l:'Slight'} : {c:'status-excess-high', l:'Excess'};
        
        ui.dashboardGrid.innerHTML += `
            <div class="nutrient-row">
                <div class="nutrient-name">${n.n}</div>
                <div class="nutrient-stats">
                    <span>Goal <strong>${goal.toFixed(0)}${n.u}</strong></span>
                    <span>Done <strong>${cons.toFixed(0)}${n.u}</strong></span>
                    <span>Left <strong>${rem.toFixed(0)}${n.u}</strong></span>
                </div>
                <div class="status-badge ${status.c}">${status.l}</div>
            </div>`;
    });
}

// 4. FIX NLP FLOW
async function processNLP() {
    console.log("Button clicked: NLP Log It");
    if (!ui.nlpInput || !ui.apiInput) return console.error("Missing element: nlpInput / apiInput");
    
    const input = ui.nlpInput.value.toLowerCase().trim();
    if(!input) return alert("Please enter what you ate.");
    
    let cleanStr = input.replace(/i ate /g, "").replace(/i had /g, "").replace(/some /g, "");
    let items = cleanStr.split(/and|,/).map(s => s.trim()).filter(Boolean);

    let fallbackTriggered = false;

    for(let item of items) {
        let match = item.match(/^([\d.]+)\s+(.*)/); 
        let qty = 1; let name = item;

        if (match) {
            qty = parseFloat(match[1]);
            name = match[2].trim();
        }
        
        name = name.replace(/bowls of |bowl of |cups of |cup of |plates of |plate of |pieces of /g, "").trim();
        let nameSingular = name.endsWith('s') ? name.slice(0, -1) : name;

        let foundKey = Object.keys(foodDatabase).find(k => 
            foodDatabase[k].name.toLowerCase() === name || 
            foodDatabase[k].name.toLowerCase() === nameSingular || 
            k === name || k === nameSingular
        );

        if (foundKey) {
            let res = calculateIntake(foundKey, 'standard', qty);
            commitIntake(res);
            console.log(`NLP found locally: ${qty}x ${foodDatabase[foundKey].name}`);
            showUIMessage(`✅ Added ${qty} x ${foodDatabase[foundKey].name} from local database.`, 'success');
        } else {
            console.log(`NLP fallback: "${name}" not found. Triggering API.`);
            showUIMessage(`⚠️ "${name}" not found locally. Initiating online search...`, 'warning');
            ui.apiInput.value = name;
            searchOpenFoodFacts();
            fallbackTriggered = true;
        }
    }
    ui.nlpInput.value = "";

    if (fallbackTriggered) {
        console.log("Scrolling to API section due to fallback.");
        setTimeout(() => {
            ui.apiInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

// 3. FIX API SEARCH FLOW
async function searchOpenFoodFacts() {
    console.log("Button clicked: Search API");
    if (!ui.apiInput || !ui.apiResultsGrid || !ui.apiLoader) return console.error("Missing element: apiInput/Grid/Loader");

    const query = ui.apiInput.value.trim();
    if (!query) return console.log("Empty search query, aborted.");

    console.log(`Fetching API for: ${query}`);
    ui.apiResultsGrid.innerHTML = '';
    ui.apiResultsGrid.classList.add('hidden');
    ui.apiLoader.classList.remove('hidden');

    try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`);
        const data = await res.json();
        console.log("API Response Data:", data);
        
        ui.apiLoader.classList.add('hidden');
        ui.apiResultsGrid.classList.remove('hidden');

        if (!data.products || data.products.length === 0) {
            console.log("No API results found.");
            ui.apiResultsGrid.innerHTML = '<p style="text-align:center; width:100%; color:#e74c3c; padding: 10px;">No online results found.</p>';
            return;
        }

        data.products.forEach(product => {
            if(!product.product_name) return; 
            
            const nut = product.nutriments || {};
            const itemData = {
                name: product.product_name,
                c: nut['energy-kcal_100g'] || 0,
                p: nut['proteins_100g'] || 0,
                carbs: nut['carbohydrates_100g'] || 0,
                f: nut['fat_100g'] || 0
            };

            const card = document.createElement('div');
            card.className = 'api-card';
            card.innerHTML = `
                <div class="api-info">
                    <h4>${itemData.name.substring(0, 30)}</h4>
                    <p>${itemData.c.toFixed(0)} kcal | P:${itemData.p.toFixed(1)}g | C:${itemData.carbs.toFixed(1)}g | F:${itemData.f.toFixed(1)}g (per 100g)</p>
                </div>
                <button class="secondary-btn">Add to DB</button>
            `;
            
            card.querySelector('button').addEventListener('click', () => loadApiToCustomForm(itemData));
            ui.apiResultsGrid.appendChild(card);
        });

        // Scroll to results
        setTimeout(() => {
            ui.apiResultsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);

    } catch (err) {
        console.error("API Fetch Error:", err);
        ui.apiLoader.classList.add('hidden');
        ui.apiResultsGrid.classList.remove('hidden');
        ui.apiResultsGrid.innerHTML = '<p style="text-align:center; width:100%; color:#e74c3c; padding: 10px;">Error fetching online data. Check connection.</p>';
    }
}

function loadApiToCustomForm(apiData) {
    console.log("Loading API data to custom form:", apiData);
    if (!ui.customFoodContainer || !ui.customFoodTitle || !ui.apiWarning || !ui.apiResultsGrid || !ui.apiInput) {
        return console.error("Missing elements during loadApiToCustomForm");
    }

    ui.customFoodContainer.classList.remove('hidden');
    ui.customFoodTitle.textContent = "Verify & Save Online Food";
    
    if (apiData.c === 0 && apiData.p === 0 && apiData.carbs === 0) {
        console.warn("API returned incomplete data.");
        ui.apiWarning.style.display = 'block';
    } else {
        ui.apiWarning.style.display = 'none';
    }

    document.getElementById('cfName').value = apiData.name;
    document.getElementById('cfCategory').value = "snack"; 
    document.getElementById('cfP').value = apiData.p;
    document.getElementById('cfC').value = apiData.carbs;
    document.getElementById('cfF').value = apiData.f;
    document.getElementById('cfCal').value = apiData.c;
    
    ui.apiResultsGrid.classList.add('hidden');
    ui.apiInput.value = "";
    
    setTimeout(() => {
        ui.customFoodContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}


// 7. ENSURE ALL BUTTONS WORK & HAVE LISTENERS
if (ui.nlpBtn) ui.nlpBtn.addEventListener('click', processNLP);
if (ui.nlpInput) ui.nlpInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') processNLP(); });

if (ui.apiBtn) ui.apiBtn.addEventListener('click', searchOpenFoodFacts);
if (ui.apiInput) ui.apiInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') searchOpenFoodFacts(); });

if (ui.toggleCustomFoodBtn) {
    ui.toggleCustomFoodBtn.addEventListener('click', () => {
        console.log("Button clicked: Toggle Custom Food");
        ui.customFoodContainer.classList.toggle('hidden');
        ui.customFoodTitle.textContent = "Create Custom Food";
        ui.apiWarning.style.display = 'none';
        ['cfName', 'cfP', 'cfC', 'cfF', 'cfCal'].forEach(id => document.getElementById(id).value = '');
    });
}

if (ui.saveCustomFoodBtn) {
    ui.saveCustomFoodBtn.addEventListener('click', () => {
        console.log("Button clicked: Save Custom Food");
        const name = document.getElementById('cfName').value.trim();
        if (!name) return alert("Please enter a food name.");

        const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        foodDatabase[key] = {
            name: name, category: document.getElementById('cfCategory').value, baseW: 100,
            p: parseFloat(document.getElementById('cfP').value)||0, carbs: parseFloat(document.getElementById('cfC').value)||0, 
            f: parseFloat(document.getElementById('cfF').value)||0, fib: 0, c: parseFloat(document.getElementById('cfCal').value)||0, 
            diet: ui.diet.value, allergens: [], capacityKey: null
        };

        console.log(`Saved custom food: ${name} with key: ${key}`);
        alert(`✅ ${name} saved to Local Database! You can now log it.`);
        ui.customFoodContainer.classList.add('hidden');
        updateFoodDropdown();
    });
}

if (ui.planningMode) {
    ui.planningMode.addEventListener('change', (e) => {
        console.log("Planning mode changed:", e.target.value);
        ui.messInputContainer.classList.toggle('hidden', e.target.value !== 'mess');
        updateFoodDropdown();
    });
}

if (ui.foodSearch) ui.foodSearch.addEventListener('input', updateFoodDropdown);
if (ui.categoryFilter) ui.categoryFilter.addEventListener('change', updateFoodDropdown);
if (ui.foodSel) ui.foodSel.addEventListener('change', updateSizes);

if (ui.saveProfileBtn) {
    ui.saveProfileBtn.addEventListener('click', () => {
        console.log("Button clicked: Save Profile");
        const w = parseFloat(ui.weight.value) || 70;
        dailyGoal.p = w * 0.8; dailyGoal.c = w * 30;
        dailyGoal.carbs = (dailyGoal.c * 0.5) / 4; dailyGoal.f = (dailyGoal.c * 0.3) / 9; dailyGoal.fib = 30; 
        updateFoodDropdown(); 
        updateDashboard(); 
        alert("Profile updated!");
    });
}

if (ui.suggestBtn) ui.suggestBtn.addEventListener('click', generateSuggestion);

if (ui.acceptSuggBtn) {
    ui.acceptSuggBtn.addEventListener('click', () => {
        console.log("Button clicked: Accept Suggestion");
        tempSuggestion.forEach(item => commitIntake(item));
        ui.suggBox.classList.add('hidden');
    });
}

if (ui.addFoodBtn) {
    ui.addFoodBtn.addEventListener('click', () => {
        console.log("Button clicked: Add Local Food");
        if (!ui.foodSel.value || ui.addFoodBtn.disabled) return console.log("Add food aborted. Selection empty or button disabled.");
        const intake = calculateIntake(ui.foodSel.value, ui.sizeSel.value, parseFloat(ui.qty.value));
        commitIntake(intake);
        
        // Reset qty to 1 after adding for better UX
        if(ui.qty) ui.qty.value = 1;
    });
}

// Init Setup on Load
if (ui.saveProfileBtn) {
    console.log("Triggering initial profile setup...");
    ui.saveProfileBtn.click();
} else {
    console.error("Initialization Failed: saveProfileBtn missing.");
}