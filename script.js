const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const storageKey = "projectops-records";
const csvHeaders = [
    "clientName",
    "toolName",
    "ownerName",
    "assessedScore",
    "slaTarget",
    "slaActual",
    "kpiTarget",
    "kpiActual",
    "reviewDate"
];

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

function readRecords() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeRecords(records) {
    localStorage.setItem(storageKey, JSON.stringify(records));
}

function escapeCsvValue(value) {
    const str = String(value ?? "");
    if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r")) {
        return `"${str.replaceAll("\"", "\"\"")}"`;
    }
    return str;
}

function toCsv(records) {
    const lines = [csvHeaders.join(",")];

    records.forEach((record) => {
        const row = csvHeaders.map((header) => escapeCsvValue(record[header]));
        lines.push(row.join(","));
    });

    return lines.join("\n");
}

function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const next = line[i + 1];

        if (char === "\"") {
            if (inQuotes && next === "\"") {
                current += "\"";
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            cells.push(current);
            current = "";
            continue;
        }

        current += char;
    }

    cells.push(current);
    return cells;
}

function parseCsv(csvText) {
    const lines = csvText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length < 2) {
        return [];
    }

    const headers = parseCsvLine(lines[0]).map((header) => header.trim());
    const missingHeader = csvHeaders.some((header) => !headers.includes(header));
    if (missingHeader) {
        throw new Error("CSV header is invalid. Use an exported ProjectOps Hub CSV file.");
    }

    const columnIndex = Object.fromEntries(headers.map((header, index) => [header, index]));

    return lines.slice(1).map((line) => {
        const cells = parseCsvLine(line);

        return {
            clientName: String(cells[columnIndex.clientName] || "").trim(),
            toolName: String(cells[columnIndex.toolName] || "").trim(),
            ownerName: String(cells[columnIndex.ownerName] || "").trim(),
            assessedScore: Number(cells[columnIndex.assessedScore]),
            slaTarget: Number(cells[columnIndex.slaTarget]),
            slaActual: Number(cells[columnIndex.slaActual]),
            kpiTarget: Number(cells[columnIndex.kpiTarget]),
            kpiActual: Number(cells[columnIndex.kpiActual]),
            reviewDate: String(cells[columnIndex.reviewDate] || "").trim()
        };
    });
}

function isValidRecord(record) {
    if (!record.clientName || !record.toolName || !record.ownerName || !record.reviewDate) {
        return false;
    }

    const numbersAreValid = [
        record.assessedScore,
        record.slaTarget,
        record.slaActual,
        record.kpiTarget,
        record.kpiActual
    ].every((value) => Number.isFinite(value));

    if (!numbersAreValid) {
        return false;
    }

    if (record.assessedScore < 1 || record.assessedScore > 5) {
        return false;
    }

    const percentFields = [record.slaTarget, record.slaActual, record.kpiTarget, record.kpiActual];
    return percentFields.every((value) => value >= 0 && value <= 100);
}

function showCsvMessage(element, text, isError = false) {
    if (!element) {
        return;
    }

    element.textContent = text;
    element.classList.toggle("status-bad", isError);
    element.classList.toggle("status-good", !isError && text.length > 0);
}

function createSeedRecords() {
    return [
        {
            clientName: "Northwind Health",
            toolName: "Ticket Resolution QA",
            ownerName: "A. Shah",
            assessedScore: 4.4,
            slaTarget: 98,
            slaActual: 97.2,
            kpiTarget: 90,
            kpiActual: 88,
            reviewDate: "2026-09-18"
        },
        {
            clientName: "Blue Harbor Finance",
            toolName: "Claims Automation",
            ownerName: "M. Reed",
            assessedScore: 3.9,
            slaTarget: 97,
            slaActual: 98.4,
            kpiTarget: 88,
            kpiActual: 91,
            reviewDate: "2026-09-20"
        },
        {
            clientName: "Apex Retail Group",
            toolName: "Inventory Sync Monitor",
            ownerName: "J. Lopez",
            assessedScore: 2.8,
            slaTarget: 99,
            slaActual: 95.9,
            kpiTarget: 92,
            kpiActual: 84.5,
            reviewDate: "2026-09-21"
        }
    ];
}

function getStatus(record) {
    const slaGap = Number(record.slaActual) - Number(record.slaTarget);
    const kpiGap = Number(record.kpiActual) - Number(record.kpiTarget);
    const score = Number(record.assessedScore);

    let riskPoints = 0;
    if (slaGap < 0) {
        riskPoints += Math.abs(slaGap) >= 2 ? 2 : 1;
    }
    if (kpiGap < 0) {
        riskPoints += Math.abs(kpiGap) >= 5 ? 2 : 1;
    }
    if (score < 3) {
        riskPoints += 2;
    } else if (score < 4) {
        riskPoints += 1;
    }

    let risk = "Low";
    if (riskPoints >= 4) {
        risk = "High";
    } else if (riskPoints >= 2) {
        risk = "Medium";
    }

    return {
        slaMet: slaGap >= 0,
        kpiMet: kpiGap >= 0,
        risk
    };
}

function badgeClass(risk) {
    if (risk === "High") {
        return "badge badge-high";
    }
    if (risk === "Medium") {
        return "badge badge-medium";
    }
    return "badge badge-low";
}

function renderDashboard(records) {
    const totalClients = document.querySelector("#total-clients");
    const slaCompliance = document.querySelector("#sla-compliance");
    const kpiAttainment = document.querySelector("#kpi-attainment");
    const highRisk = document.querySelector("#high-risk");

    if (!totalClients || !slaCompliance || !kpiAttainment || !highRisk) {
        return;
    }

    if (records.length === 0) {
        totalClients.textContent = "0";
        slaCompliance.textContent = "0%";
        kpiAttainment.textContent = "0%";
        highRisk.textContent = "0";
        return;
    }

    let slaMetCount = 0;
    let kpiMetCount = 0;
    let highRiskCount = 0;

    records.forEach((record) => {
        const status = getStatus(record);
        if (status.slaMet) {
            slaMetCount += 1;
        }
        if (status.kpiMet) {
            kpiMetCount += 1;
        }
        if (status.risk === "High") {
            highRiskCount += 1;
        }
    });

    totalClients.textContent = String(records.length);
    slaCompliance.textContent = `${Math.round((slaMetCount / records.length) * 100)}%`;
    kpiAttainment.textContent = `${Math.round((kpiMetCount / records.length) * 100)}%`;
    highRisk.textContent = String(highRiskCount);
}

function renderTracker(records) {
    const body = document.querySelector("#tracker-body");
    const emptyMessage = document.querySelector("#tracker-empty");

    if (!body || !emptyMessage) {
        return;
    }

    body.innerHTML = "";

    if (records.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    records.forEach((record) => {
        const status = getStatus(record);
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.clientName}</td>
            <td>${record.toolName}</td>
            <td>${record.ownerName}</td>
            <td>${Number(record.assessedScore).toFixed(1)}</td>
            <td>
                ${Number(record.slaActual).toFixed(1)}% / ${Number(record.slaTarget).toFixed(1)}%
                <span class="inline-status ${status.slaMet ? "status-good" : "status-bad"}">${status.slaMet ? "Met" : "Missed"}</span>
            </td>
            <td>
                ${Number(record.kpiActual).toFixed(1)}% / ${Number(record.kpiTarget).toFixed(1)}%
                <span class="inline-status ${status.kpiMet ? "status-good" : "status-bad"}">${status.kpiMet ? "Met" : "Missed"}</span>
            </td>
            <td><span class="${badgeClass(status.risk)}">${status.risk}</span></td>
            <td>${record.reviewDate}</td>
        `;

        body.appendChild(row);
    });
}

function initializeTracker() {
    const trackerForm = document.querySelector("#tracker-form");
    const clearButton = document.querySelector("#clear-records");
    const exportButton = document.querySelector("#export-csv");
    const importButton = document.querySelector("#import-csv");
    const csvFileInput = document.querySelector("#csv-file");
    const csvMessage = document.querySelector("#csv-message");
    const reviewDateInput = document.querySelector('input[name="reviewDate"]');

    if (reviewDateInput && !reviewDateInput.value) {
        reviewDateInput.value = new Date().toISOString().split("T")[0];
    }

    let records = readRecords();
    if (records.length === 0) {
        records = createSeedRecords();
        writeRecords(records);
    }

    renderTracker(records);
    renderDashboard(records);

    if (trackerForm) {
        trackerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(trackerForm);

            const newRecord = {
                clientName: String(formData.get("clientName") || "").trim(),
                toolName: String(formData.get("toolName") || "").trim(),
                ownerName: String(formData.get("ownerName") || "").trim(),
                assessedScore: Number(formData.get("assessedScore")),
                slaTarget: Number(formData.get("slaTarget")),
                slaActual: Number(formData.get("slaActual")),
                kpiTarget: Number(formData.get("kpiTarget")),
                kpiActual: Number(formData.get("kpiActual")),
                reviewDate: String(formData.get("reviewDate") || "")
            };

            records.unshift(newRecord);
            writeRecords(records);
            renderTracker(records);
            renderDashboard(records);
            trackerForm.reset();

            if (reviewDateInput) {
                reviewDateInput.value = new Date().toISOString().split("T")[0];
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            localStorage.removeItem(storageKey);
            records = [];
            renderTracker(records);
            renderDashboard(records);
            showCsvMessage(csvMessage, "All records cleared.");
        });
    }

    if (exportButton) {
        exportButton.addEventListener("click", () => {
            if (records.length === 0) {
                showCsvMessage(csvMessage, "Nothing to export yet. Add or import records first.", true);
                return;
            }

            const csv = toCsv(records);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            const dateTag = new Date().toISOString().split("T")[0];

            downloadLink.href = url;
            downloadLink.download = `projectops-report-${dateTag}.csv`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            URL.revokeObjectURL(url);
            showCsvMessage(csvMessage, `Exported ${records.length} record(s) to CSV.`);
        });
    }

    if (importButton && csvFileInput) {
        importButton.addEventListener("click", () => {
            csvFileInput.click();
        });

        csvFileInput.addEventListener("change", async () => {
            const file = csvFileInput.files?.[0];
            if (!file) {
                return;
            }

            try {
                const text = await file.text();
                const imported = parseCsv(text);
                const validRecords = imported.filter(isValidRecord);

                if (validRecords.length === 0) {
                    showCsvMessage(csvMessage, "Import failed: no valid records found in CSV.", true);
                    return;
                }

                records = validRecords;
                writeRecords(records);
                renderTracker(records);
                renderDashboard(records);

                const skippedCount = imported.length - validRecords.length;
                const summary = skippedCount > 0
                    ? `Imported ${validRecords.length} record(s). Skipped ${skippedCount} invalid row(s).`
                    : `Imported ${validRecords.length} record(s) successfully.`;

                showCsvMessage(csvMessage, summary);
            } catch (error) {
                showCsvMessage(csvMessage, `Import failed: ${error instanceof Error ? error.message : "unknown error"}`, true);
            } finally {
                csvFileInput.value = "";
            }
        });
    }
}

initializeTracker();