  // Įvykio apdorojimas, kai paspaudžiamas mygtukas "Launch demo modal"
document.getElementById("launchModalBtn").addEventListener("click", function() {
  // Nieko nedaryti čia, tiesiog atverti modalinį langą
});

// Įvykio apdorojimas, kai paspaudžiamas mygtukas "Save changes"
document.getElementById("saveChangesBtn").addEventListener("click", function() {
  // Gauname paveikslėlio URL
  const imageUrl = document.getElementById("formFile").value;
  // Gauname įvestą tekstą
  const text = document.getElementById("exampleFormControlTextarea1").value;

  // Sukurkime objektą su reikiamais duomenimis
  const data = {
    imageUrl: imageUrl,
    text: text
  };

  // Konvertuojame objektą į JSON formatą ir išsaugome į localStorage
  localStorage.setItem("savedData", JSON.stringify(data));

  // Iškviečiame funkciją, kuri atvaizduoja įkeltus duomenis sąraše su grid
  displaySavedDataGrid(data);
});

// Funkcija, kuri atvaizduoja įkeltus duomenis sąraše su grid
function displaySavedDataGrid(data) {
  // Sukurkite naują <div> elementą su klasėmis iš Bootstrap
  const gridItem = document.createElement("div");
  gridItem.classList.add("col-4", "mb-3"); // Pridėta "mb-3" klasė, kad būtų tarpai tarp stulpelių

  // Sukurkite <img> elementą su įkeltais atributais
  const imageElement = document.createElement("img");
  imageElement.src = data.imageUrl;
  imageElement.classList.add("img-fluid");

  // Sukurkite <p> elementą su tekstu
  const textElement = document.createElement("p");
  textElement.textContent = data.text;

  // Įdėkite paveikslėlį ir tekstą į <div> elementą
  gridItem.appendChild(imageElement);
  gridItem.appendChild(textElement);

  // Tikriname, ar naujai sukurta eilutė pridedama į pirmą eilutę
  const currentRow = document.querySelector("#imageList .row:last-child");
  if (!currentRow || currentRow.childNodes.length === 3) {
    // Sukuriame naują eilutę, jei dabartinė eilutė jau pilna arba neegzistuoja
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.appendChild(gridItem);
    document.getElementById("imageList").appendChild(newRow);
  } else {
    // Pridedame stulpelį į dabartinę eilutę
    currentRow.appendChild(gridItem);
  }
}



// Įvykio apdorojimas, kai puslapis užkraunamas
window.addEventListener("load", function() {
  // Gauti išsaugotus duomenis iš localStorage
  const savedData = localStorage.getItem("savedData");

  // Tikriname, ar yra išsaugotų duomenų
  if(savedData) {
    // Konvertuojame JSON formatą į objektą
    const data = JSON.parse(savedData);

    // Atvaizduojame įkeltus duomenis su grid
    displaySavedDataGrid(data);
  }
});
