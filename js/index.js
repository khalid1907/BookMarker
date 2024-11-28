var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var sites = [];
var siteNames = [];

window.onload = function () {
    if (localStorage.getItem("sites")) {
        sites = JSON.parse(localStorage.getItem("sites"));
        siteNames = sites.map(site => site.name.toLowerCase());
        displaySite();
    }
};

// Validation
function validateInputs() {
    if (!siteNameInput.value || !siteUrlInput.value) {
        alert("Please fill in both fields.");
        return false;
    }

    var newSiteName = siteNameInput.value.trim().toLowerCase();
    if (siteNames.includes(newSiteName)) {
        alert("Site name already exists!");
        clearInputs()
        return false;
    }

    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    if (!urlRegex.test(siteUrlInput.value)) {
        alert("Invalid URL");
        clearInputs();
        return false;
    }

    return true;
}

// Add a new site
function addSite() {
    if (!validateInputs()) {
        return;
    }

    var newSiteName = siteNameInput.value.trim().toLowerCase(); 
    var site = {
        name: siteNameInput.value.trim(),
        url: siteUrlInput.value.trim(),
    };

    sites.push(site);
    siteNames.push(newSiteName); 
    saveToLocalStorage();
    displaySite();
    clearInputs();
}

// Display all sites
function displaySite() {
    var row = '';
    for (var i = 0; i < sites.length; i++) {
        row += `
            <tr>
                <td>${i + 1}</td>
                <td>${sites[i].name}</td>
                <td><a target="_blank" href="${sites[i].url}"><button class="btn btn-success fw-bold"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-danger fw-bold"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tableBody").innerHTML = row;
}

// Clear inputs
function clearInputs() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

// Delete
function deleteSite(index) {
    sites.splice(index, 1);
    siteNames = sites.map(site => site.name.toLowerCase());
    saveToLocalStorage();
    displaySite();
}

// save to local storage
function saveToLocalStorage() {
    localStorage.setItem("sites", JSON.stringify(sites));
}
