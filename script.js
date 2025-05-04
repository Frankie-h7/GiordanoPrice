// Aspetta che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
  // Catalogo completo per i prodotti consigliati
  const allProducts = [
    { name: "Smartphone XYZ Pro", price: 799, discount: "15%" },
    { name: "Laptop ABC Ultra", price: 1299, discount: "20%" },
    { name: "Cuffie Bluetooth Premium", price: 199, discount: "10%" },
    { name: "Monitor 4K HDR", price: 499, discount: "25%" },
    { name: "Tastiera Meccanica Gaming", price: 129, discount: "5%" },
    { name: "Mouse Wireless Ergonomico", price: 59, discount: "10%" },
    { name: "Webcam 4K con Microfono", price: 129, discount: "15%" },
    { name: "SSD NVMe 2TB", price: 199, discount: "20%" },
    { name: "Router WiFi 6E", price: 299, discount: "10%" },
    { name: "Power Bank 20000mAh", price: 49, discount: "5%" },
    { name: "Dock Station USB-C", price: 89, discount: "10%" },
    { name: "Monitor Curvo 32\"", price: 349, discount: "30%" },
    { name: "Tastiera Senza Fili", price: 79, discount: "5%" },
    { name: "Mouse Gaming 16000DPI", price: 69, discount: "15%" },
    { name: "Hub USB 10 Porte", price: 39, discount: "5%" }
  ];

  // Variabili per la paginazione
  let currentPage = 1;
  const productsPerPage = 6; // Aumentato da 4 a 6
  
  // Funzione per mostrare i prodotti consigliati
  function showRecommendedProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = allProducts.slice(startIndex, endIndex);
    
    const container = document.getElementById('recommended-products');
    if (!container) {
      console.error("Elemento con ID 'recommended-products' non trovato");
      return;
    }
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Prezzo: €${product.price} <span class="discount">(${product.discount} di sconto)</span></p>
        <button class="buy-btn">Acquista</button>
      `;
      container.appendChild(productCard);
    });
    
    // Aggiorna info paginazione
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
      pageInfo.textContent = `Pagina ${currentPage} di ${Math.ceil(allProducts.length / productsPerPage)}`;
    }
    
    // Disabilita pulsanti se necessario
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === Math.ceil(allProducts.length / productsPerPage);
  }

  // Event listeners per paginazione
  const prevBtn = document.getElementById('prev-page');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showRecommendedProducts();
      }
    });
  }

  const nextBtn = document.getElementById('next-page');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < Math.ceil(allProducts.length / productsPerPage)) {
        currentPage++;
        showRecommendedProducts();
      }
    });
  }

  // Mostra i prodotti consigliati all'avvio
  showRecommendedProducts();

    // [Mantieni tutto il resto del tuo codice esistente...]
  // ... (le tue funzioni originali rimangono identiche)
  

// Funzione per gestire il clic sul pulsante di ricerca
document.getElementById("searchBtn").addEventListener("click", function() {
  // Ottiene il valore di ricerca dall'input e rimuove spazi bianchi extra
  const searchQuery = document.getElementById("searchInput").value.trim();
  
  // Verifica se l'input è vuoto
  if (searchQuery === "") {
    alert("Per favore, inserisci un prodotto da cercare.");
    return; // Interrompe l'esecuzione se non c'è una query di ricerca
  }

  // Simuliamo dei risultati di ricerca con dati fittizi
  const results = simulateSearchResults(searchQuery);

  // Mostriamo i risultati nella pagina
  displayResults(results);
});

// Funzione per simulare dei risultati di ricerca (dati fittizi)
function simulateSearchResults(query) {
  // Database fittizio di prodotti
  const products = [
    { name: "Smartphone XYZ", price: 199, discount: "20%" },
    { name: "Laptop ABC", price: 499, discount: "15%" },
    { name: "Cuffie Bluetooth", price: 59, discount: "10%" },
    { name: "Monitor 4K", price: 299, discount: "25%" },
  ];

  // Filtriamo i prodotti in base alla query di ricerca (case insensitive)
  // Utilizziamo toLowerCase() per rendere la ricerca insensibile a maiuscole/minuscole
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Funzione per visualizzare i risultati nella pagina
function displayResults(results) {
  // Seleziona il contenitore dei risultati
  const resultsContainer = document.getElementById("results");
  
  // Verifica se il contenitore esiste (debug aggiuntivo)
  if (!resultsContainer) {
      console.error("Elemento con ID 'results' non trovato nel DOM");
      return;
  }

  // Svuotiamo prima i risultati precedenti
  resultsContainer.innerHTML = "";

  // Se non ci sono risultati
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
    return;
  }

  // Creiamo e mostriamo ogni risultato
  results.forEach(product => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-item");

    // Aggiungiamo il contenuto HTML per ogni prodotto
    resultDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Prezzo: €${product.price} <span class="discount">(${product.discount} di sconto)</span></p>
      <button class="buy-btn">Acquista</button>
    `;

    // Aggiungiamo l'elemento al contenitore
    resultsContainer.appendChild(resultDiv);
  });
}

// Effetto pop-up per i pulsanti "Acquista"
document.addEventListener("click", function(event) {
  // Verifica se l'elemento cliccato è un pulsante "Acquista"
  if (event.target.classList.contains("buy-btn")) {
      // Aggiunge un effetto di scaling al click
      event.target.style.transform = "scale(1.1)";
      
      // Dopo 200ms riporta il pulsante alla dimensione originale
      setTimeout(() => {
          event.target.style.transform = "scale(1)";
          
          // Aggiunto: Messaggio di conferma all'acquisto
          alert(`Prodotto aggiunto al carrello!`);
      }, 200);
    }
  });
});