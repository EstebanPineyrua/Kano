const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvmtvtq9GWGnjmmOiEU9j_3JRxhj5bEYsrwSdW5kEuGgJkrc0ybApBjoTHW_s7n9mrzYT5htkoVF-9/pub?gid=0&single=true&output=tsv';

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