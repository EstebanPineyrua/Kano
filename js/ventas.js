const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwXhcFDzDXJ98LRtTUrVm7xenO1LxS2hFBWI9bZol9fJ-NP5yX5Gmighd76o5QkM1t-P_1oOdBTQuO/pub?gid=14956279&single=true&output=tsv';

    fetch(url)
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split('\n');
        const tbody = document.querySelector('#tablaStock tbody');

        rows.slice(1).forEach(row => {
          const cols = row.split(',');
          const tr = document.createElement('tr');
          cols.forEach(col => {
            const td = document.createElement('td');
            td.textContent = col;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      })
      .catch(err => console.error('Error cargando CSV', err));