function downloadCSV(rows) {
        const header = "Name,PNR,Passport,Country,RBD,DOB,Need_check\n";
        const csv = rows
          .map(
            (r) =>
              `"${r.Name}","${r.PNR}","${r.Passport}","${r.Country}","${r.RBD}","${r.DOB}","${r.Need_check}"`
          )
          .join("\n");
        const blob = new Blob([header + csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "pricing_hub.csv";
        a.click();
        URL.revokeObjectURL(url);
      }
    