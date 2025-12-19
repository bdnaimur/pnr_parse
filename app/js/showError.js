 function showErrors(rows) {
        const old = document.getElementById("errorTable");
        if (old) old.remove();

        const errors = rows.filter((r) => r.Need_check === "YES");
        if (!errors.length) return;

        const table = document.createElement("table");
        table.id = "errorTable";
        table.style.width = "100%";
        table.style.marginTop = "20px";
        table.border = "1";

        table.innerHTML = `
          <thead>
            <tr>
              <th>Name</th><th>PNR</th><th>Passport</th><th>Country</th><th>RBD</th>
            </tr>
          </thead>
          <tbody>
            ${errors
              .map(
                (e) => `
              <tr>
                <td>${e.Name}</td>
                <td>${e.PNR}</td>
                <td>${e.Passport}</td>
                <td>${e.Country}</td>
                <td>${e.RBD}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        `;

        document.querySelector(".card").appendChild(table);
        const header = "Name,PNR,Passport,Country,RBD,Need_check\n";
        const csv = errors
          .map(
            (r) =>
              `"${r.Name}","${r.PNR}","${r.Passport}","${r.Country}","${r.RBD}","${r.Need_check}"`
          )
          .join("\n");
        const blob = new Blob([header + csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "error_pnrs.csv";
        a.click();
        URL.revokeObjectURL(url);
      }