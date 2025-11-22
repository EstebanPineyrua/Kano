const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwXhcFDzDXJ98LRtTUrVm7xenO1LxS2hFBWI9bZol9fJ-NP5yX5Gmighd76o5QkM1t-P_1oOdBTQuO/pub?gid=632464503&single=true&output=csv';

// Función para parsear CSV correctamente
function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(current);
      current = '';
    } else if (char === '\n' && !insideQuotes) {
      row.push(current);
      rows.push(row);
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current) row.push(current);
  if (row.length > 0) rows.push(row);

  return rows;
}

fetch(url)
  .then(res => res.text())
  .then(text => {
    const rows = parseCSV(text);  
    const tbody = document.querySelector('#tablaStock tbody');

    rows.slice(1).forEach(cols => {
      const tr = document.createElement('tr');

      cols.forEach(col => {
        const td = document.createElement('td');
        const value = col.trim();

        // Detectar automáticamente si la celda es un link
        if (value.startsWith("http://") || value.startsWith("https://")) {
          td.innerHTML = <a href="${value}" target="_blank">Ver producto</a>;
        } else {
          td.textContent = value;
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('Error cargando CSV', err));