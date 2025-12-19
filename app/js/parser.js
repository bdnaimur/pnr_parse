  function parsePNR(raw) {
        let lines = raw
          .replace(/\r/g, "")
          .replace(/MD«/g, "")
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        const results = [];
        let currentPNR = "";
        let RBD = "";

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          const RBD_find = line.match(/^\d+\s[^.]+\.{2}\d\.([A-Z])/);
          if (RBD_find) RBD = RBD_find[1];

          const pnrMatch = line.match(/\.{6,}\s*([A-Z0-9]{6})/i);
          if (pnrMatch) {
            currentPNR = pnrMatch[1];
            continue;
          }

          if (/SSR DOCS/i.test(line)) {
            let nextLine =
              i + 1 < lines.length && /^[0-9]/.test(lines[i + 1])
                ? lines[i + 1]
                : "";
            const combined = line + " " + nextLine;

            // Extract Name (handle cases like "SHAHABULMR" with no space before MR)
            const nameMatch = combined.match(
              /\d\.\d\s+([A-Z\/\s]+?)(?:\s*|\b)(MR|MRS|MS|MISS|MSTR)\b/i
            );
            let name = nameMatch ? nameMatch[1].trim() : "";

            // If still no name found, try fallback (just take whatever is after 1.1)
            if (!name) {
              const fallbackName = combined.match(/\d\.\d\s+([A-Z\/\s]+)/i);
              name = fallbackName ? fallbackName[1].trim() : "";
            }

            // Clean up trailing "MR" etc accidentally stuck
            name = name.replace(/(MR|MRS|MS|MISS|MSTR)$/i, "").trim();

            let passport = "",
              country = "";
            const passSSR = line.match(/\/P\/([A-Z]{2,3})\/([A-Z0-9]+)/i);
            const passNext = nextLine.match(/^([0-9]+)/);

            if (passSSR && passNext) {
              country = passSSR[1];
              passport = passSSR[2] + passNext[1];
            } else {
              const fallback = combined.match(
                /([A-Z]{1,3}[0-9]{4,6})\/(BD|BGD)/i
              );
              if (fallback) {
                passport = fallback[1];
                country = fallback[2];
              }
            }

            if (name || passport) {
              results.push({
                Name: name,
                PNR: currentPNR,
                Passport: passport,
                Country: country,
                RBD: RBD || "",
                Need_check:
                  passport && passport.length !== 9 ? "YES" : "May be",
              });
            }
          }
        }

        downloadCSV(results);
        showErrors(results);
        resetInputs();
      }
