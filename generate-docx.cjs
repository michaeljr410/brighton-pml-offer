const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition,
} = require("docx");

const ORANGE = "DF4601";
const ORANGE_LIGHT = "FF6B2B";
const GOLD = "F5A623";
const BLACK = "1A1A1A";
const DARK_BG = "0D0D0D";
const DARK_CARD = "1C1C1C";
const DARK_CARD2 = "262626";
const GRAY_TEXT = "B0B0B0";
const WHITE = "FFFFFF";
const GREEN = "22C55E";
const YELLOW = "FACC15";
const RED = "EF4444";

const border = { style: BorderStyle.SINGLE, size: 1, color: "333333" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function darkCell(text, width, opts = {}) {
  const { bold, color, fill, align, font, size, colspan } = {
    bold: false, color: WHITE, fill: DARK_CARD, align: AlignmentType.LEFT,
    font: "Arial", size: 20, colspan: 1, ...opts,
  };
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: cellMargins,
    columnSpan: colspan,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, color, font, size })],
    })],
  });
}

function headerCell(text, width, opts = {}) {
  return darkCell(text, width, { bold: true, fill: ORANGE, color: WHITE, ...opts });
}

function makeTable(headers, rows, colWidths) {
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => headerCell(h, colWidths[i])) }),
      ...rows.map((row, ri) =>
        new TableRow({
          children: row.map((cell, ci) =>
            darkCell(cell, colWidths[ci], { fill: ri % 2 === 0 ? DARK_CARD : DARK_CARD2 })
          ),
        })
      ),
    ],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, color: ORANGE, font: "Arial", size: 32 })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: ORANGE, space: 4 } },
  });
}

function subHeading(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: GOLD, font: "Arial", size: 24 })],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, color: opts.color || WHITE, font: "Arial", size: 20, bold: opts.bold || false })],
  });
}

function bulletItem(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360, hanging: 180 },
    children: [
      new TextRun({ text: "• ", color: ORANGE, font: "Arial", size: 20 }),
      new TextRun({ text, color: opts.color || WHITE, font: "Arial", size: 20 }),
    ],
  });
}

function verdictBadge(text, color) {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, bold: true, color, font: "Arial", size: 28 })],
  });
}

function signalRow(category, signal, rating, fill) {
  const ratingColors = { GREEN, YELLOW, RED: "EF4444" };
  return [category, signal, rating];
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20, color: WHITE } },
    },
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: ORANGE, space: 4 } },
            children: [
              new TextRun({ text: "CONFIDENTIAL", bold: true, color: ORANGE, font: "Arial", size: 16 }),
              new TextRun({ text: "\t3221 Brighton St | Underwriting Report", color: GRAY_TEXT, font: "Arial", size: 16 }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: "333333", space: 4 } },
            children: [
              new TextRun({ text: "TOP Wheels | 443 Innovative Solutions LLC", color: GRAY_TEXT, font: "Arial", size: 14 }),
              new TextRun({ text: "\tPage ", color: GRAY_TEXT, font: "Arial", size: 14 }),
              new TextRun({ children: [PageNumber.CURRENT], color: GRAY_TEXT, font: "Arial", size: 14 }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          })],
        }),
      },
      children: [
        // ─── TITLE PAGE ───
        new Paragraph({ spacing: { before: 2400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [new TextRun({ text: "UNDERWRITING REPORT", bold: true, color: ORANGE, font: "Arial", size: 48 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [new TextRun({ text: "3221 Brighton St, Baltimore, MD 21216", bold: true, color: WHITE, font: "Arial", size: 32 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Co-Living Conversion Analysis", color: GOLD, font: "Arial", size: 24 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: ORANGE, space: 8 }, bottom: { style: BorderStyle.SINGLE, size: 2, color: ORANGE, space: 8 } },
          spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "CONDITIONAL GO", bold: true, color: GREEN, font: "Arial", size: 36 })],
        }),
        new Paragraph({ spacing: { after: 300 } }),
        makeTable(
          ["Field", "Detail"],
          [
            ["Prepared By", "Mike Davis / 443 Innovative Solutions LLC"],
            ["Strategy", "Subject-To Acquisition + Land Trust + Co-Living"],
            ["Date", "May 13, 2026"],
            ["Property", "3BR/1BA Row Home | 1,176 SF | Built 1923"],
            ["Purchase Price", "$99,000"],
            ["PML Ask", "$85,000 @ 12% Interest-Only"],
            ["Projected CoC", "43% (MUST-BUY Tier)"],
          ],
          [3200, 6920],
        ),

        // ─── EXECUTIVE SUMMARY ───
        new PageBreak(),
        sectionHeading("EXECUTIVE SUMMARY"),
        bodyText("3221 Brighton St is a 3BR/1BA row home (1,176 SF, built 1923) in Baltimore’s Rosemont neighborhood being acquired subject-to an existing mortgage at 4% fixed. Purchase price is $99,000 with $7,000 down payment to the seller. The property will be converted into a 4-room, 2-bathroom co-living rental generating $2,550/month gross income at stabilization."),
        bodyText("An $85,000 private money loan at 12% interest-only funds the full renovation: basement finish (4th room + private bath), upstairs bathroom remodel, bedroom refresh, HVAC, kitchen, and cosmetic work. The primary exit is a DSCR refinance at month 12."),
        verdictBadge("VERDICT: CONDITIONAL GO", GREEN),
        bodyText("The financials are strong (43% CoC, $430/mo net cash flow with PML active, DSCR 1.94–2.22 for refi), but regulatory compliance must be confirmed before closing. Baltimore City requires a rooming house license for 3+ unrelated tenants, and the R-7/R-8 zoning may require conditional use approval."),

        // ─── 1. DEAL STRUCTURE ───
        new PageBreak(),
        sectionHeading("1. DEAL STRUCTURE"),
        makeTable(
          ["Field", "Value"],
          [
            ["Purchase Price", "$99,000"],
            ["Acquisition Type", "Subject-To (existing FHA mortgage stays in place)"],
            ["Down Payment to Seller", "$7,000"],
            ["Existing Loan Balance", "$87,000"],
            ["Existing Loan Rate", "4% fixed"],
            ["Existing Loan Payment (PITI)", "~$760/mo"],
            ["Remaining Term", "12 years"],
            ["Lender", "M&T Bank / Lakeview"],
            ["PML Raise", "$85,000 @ 12% I/O, 12-month term"],
            ["Total Basis", "$172,000 (1st: $87K + 2nd: $85K)"],
            ["Entity", "Brighton Street Land Trust (Trustee: 443 Innovative Solutions LLC)"],
          ],
          [3200, 6920],
        ),

        // ─── 2. COMPARABLE SALES ───
        new PageBreak(),
        sectionHeading("2. COMPARABLE SALES ANALYSIS"),
        subHeading("As-Is Comps (Staircase Method)"),
        makeTable(
          ["Address", "Price", "Date", "Bed/Bath", "SF", "Condition"],
          [
            ["3202 Brighton St", "$70,000", "May 2024", "3/1", "1,268", "As-is"],
            ["3114 Brighton St", "$95,000", "Listed 2025", "3/2", "1,192", "Needs work"],
            ["3002 Presstman St", "$64,000", "Nov 2025", "4/1", "1,330", "As-is"],
            ["2801 Presbury St", "$60,000", "Mar 2026", "3/1", "1,200", "As-is"],
            ["2904 Winchester St", "$60,000", "Jan 2026", "3/1", "1,488", "As-is"],
            ["2826 Riggs Ave", "$95,000", "Jan 2026", "3/1", "1,412", "Light rehab"],
          ],
          [2200, 1200, 1200, 1100, 1000, 1420],
        ),
        bodyText("As-Is Value Range: $65,000–$85,000", { bold: true }),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Renovated Comps"),
        makeTable(
          ["Address", "Price", "Date", "Bed/Bath", "SF", "Condition"],
          [
            ["3200 Brighton St", "$190,000", "Aug 2022", "?/1", "1,316", "Renovated"],
            ["2912 Brighton St", "$200,000", "Jan 2025", "?/2", "1,800", "Renovated"],
            ["3044 Brighton St", "$125,000", "Jan 2025", "3/1.5", "2,306", "Renovated"],
            ["1210 N Bentalou St", "$176,000", "Jul 2025", "4/2", "1,556", "Fully renovated"],
            ["732 Whitmore Ave", "$229,900", "May 2025", "4/2", "1,653", "Renovated"],
            ["2920 Winchester St", "$128,000", "Nov 2025", "3/1", "1,538", "Updated"],
            ["2504 N Longwood St", "$287,999", "Apr 2025", "4/3", "1,892", "Premium reno"],
          ],
          [2200, 1200, 1200, 1100, 1000, 1420],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("ARV Conclusion"),
        makeTable(
          ["Scenario", "ARV Range"],
          [
            ["Traditional (4BR/2BA retail buyer)", "$165,000–$195,000"],
            ["Income-based (investor/co-living)", "$185,000–$215,000"],
            ["Working ARV (blended)", "$180,000–$200,000"],
          ],
          [5060, 5060],
        ),
        bodyText("Key comps: 3200 Brighton (same block) sold $190K renovated. 2912 Brighton sold $200K renovated Jan 2025. The street supports $180K+."),
        bodyText("Note: 21216 average home values trending down 5.7% YoY per Zillow. Conservative end of range warranted.", { color: YELLOW }),

        // ─── 3. ROOM RENTAL RATES ───
        new PageBreak(),
        sectionHeading("3. ROOM RENTAL RATE ANALYSIS"),
        subHeading("Market Data (21216 / West Baltimore, May 2026)"),
        makeTable(
          ["Type", "Price Range", "Sources"],
          [
            ["Unfurnished, shared bath (Rosemont)", "$550–$700/mo", "Roomies, SpareRoom, Craigslist"],
            ["Furnished, shared bath", "$650–$800/mo", "SpareRoom, Roomies"],
            ["Private bath room", "$800–$850/mo", "SpareRoom, Roomies"],
            ["Basement, private bath + entrance", "$800–$1,150/mo", "SpareRoom, Trovit"],
            ["PadSplit rooms (Baltimore)", "$155–$250/wk ($672–$1,083/mo)", "PadSplit"],
          ],
          [3400, 3200, 3520],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Pro Forma Rents vs. Market"),
        makeTable(
          ["Unit", "Pro Forma", "Market Range", "Assessment"],
          [
            ["Room 1 (shared bath)", "$625", "$550–$700", "MARKET CENTER"],
            ["Room 2 (shared bath)", "$625", "$550–$700", "MARKET CENTER"],
            ["Room 3 (shared bath)", "$625", "$550–$700", "MARKET CENTER"],
            ["Room 4 (private bath + entrance)", "$675", "$800–$1,150", "CONSERVATIVE"],
          ],
          [2800, 1600, 2200, 3520],
        ),
        bodyText("Key Finding: The basement unit with private bath and private entrance is significantly underpriced at $675. Market data shows comparable units at $800–$1,150. Upside potential of $125–$475/month on Room 4 alone.", { bold: true }),
        bodyText("Upside Scenario: If Room 4 is priced at market ($800/mo), gross income increases to $2,675/mo (+$125/mo or $1,500/yr).", { color: GREEN }),

        // ─── 4. FINANCIAL ANALYSIS ───
        new PageBreak(),
        sectionHeading("4. FINANCIAL ANALYSIS"),
        subHeading("Pro Forma — Stabilized (Month 4+)"),
        makeTable(
          ["Line Item", "Monthly", "Annual"],
          [
            ["Gross Rental Income (4 rooms)", "$2,550", "$30,600"],
            ["Less: Vacancy (10%)", "-$255", "-$3,060"],
            ["Less: Repairs & Maintenance (10%)", "-$255", "-$3,060"],
            ["Effective Gross Income", "$2,040", "$24,480"],
            ["Less: 1st Lien PITI", "-$760", "-$9,120"],
            ["Less: PML Interest (12%)", "-$850", "-$10,200"],
            ["Net Cash Flow (PML active)", "$430", "$5,160"],
            ["Net Cash Flow (PML retired)", "$1,280", "$15,360"],
          ],
          [5060, 2500, 2560],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Key Metrics"),
        makeTable(
          ["Metric", "Value", "Threshold", "Rating"],
          [
            ["Cash-on-Cash Return (PML active)", "43%", "12% minimum", "MUST-BUY"],
            ["Cash-on-Cash Return (PML retired)", "128%", "15% golden", "MUST-BUY"],
            ["Monthly Cash Flow (PML active)", "$430", "$500 minimum", "MARGINAL"],
            ["Monthly Cash Flow (PML retired)", "$1,280", "$1,000 excellent", "EXCELLENT"],
            ["DSCR (current, both liens)", "1.27", "1.25 minimum", "PASSES"],
            ["DSCR (post-refi, conservative)", "2.22", "1.25 minimum", "STRONG"],
            ["DSCR (post-refi, realistic)", "1.94", "1.25 minimum", "STRONG"],
          ],
          [2800, 1600, 2200, 1520],
        ),
        bodyText("Cash-on-Cash Calculation: Cash invested $12,000 ($7K down + $5K closing). Annual cash flow $5,160. CoC = 43% (Tier 7: Must-Buy).", { bold: true }),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Capital Stack & LTV"),
        makeTable(
          ["Position", "Amount", "LTV ($180K Cons.)", "LTV ($200K Real.)"],
          [
            ["1st Lien", "$87,000", "48%", "44%"],
            ["2nd Lien (PML)", "$85,000", "47%", "43%"],
            ["Total", "$172,000", "96%", "86%"],
          ],
          [2500, 2000, 2800, 2820],
        ),

        // ─── 5. PML EXIT ANALYSIS ───
        new PageBreak(),
        sectionHeading("5. PML EXIT ANALYSIS"),
        subHeading("Primary Exit — DSCR Refinance at Month 12"),
        makeTable(
          ["Metric", "Conservative ($180K)", "Realistic ($200K)"],
          [
            ["ARV", "$180,000", "$200,000"],
            ["Refi at 75% LTV", "$135,000", "$150,000"],
            ["1st Lien Payoff (~12 months)", "-$83,000", "-$83,000"],
            ["Cash Available for PML", "$52,000", "$67,000"],
            ["PML Balance", "$85,000", "$85,000"],
            ["Gap", "-$33,000", "-$18,000"],
            ["12 Months Cash Flow", "+$5,160", "+$5,160"],
            ["Net Gap", "-$27,840", "-$12,840"],
          ],
          [3400, 3360, 3360],
        ),
        bodyText("At realistic ARV ($200K): Gap of $12,840 — easily manageable via PML extension at reduced rate or portfolio cash injection."),
        bodyText("At conservative ARV ($180K): Gap of $27,840 — requires PML extension of 6–12 months + continued cash flow paydown.", { color: YELLOW }),
        bodyText("DSCR at refi (1.94–2.22) is well above the 1.25 lender threshold — refinancing is highly feasible.", { color: GREEN }),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Backup Exits"),
        bulletItem("PML Term Extension — Negotiate continued 12% I/O or reduced rate"),
        bulletItem("Cash Flow Paydown — $430/mo net reduces balance over time"),
        bulletItem("Sale at ARV — $180K–$200K sale covers all debt with proceeds to spare"),
        bulletItem("PadSplit Conversion — Furnished rooms at $155–$250/wk increases gross income significantly"),

        // ─── 6. REGULATORY & ZONING ───
        new PageBreak(),
        sectionHeading("6. REGULATORY & ZONING ANALYSIS"),
        verdictBadge("⚠ CRITICAL: ROOMING HOUSE LICENSE REQUIRED", YELLOW),
        bodyText("Baltimore City requires a rooming house license for properties with 3+ unrelated tenants sharing common facilities. Without this license, operating a 4-room co-living unit violates city code."),
        makeTable(
          ["Requirement", "Status", "Cost/Action"],
          [
            ["Property Registration (DHCD)", "Required within 10 days", "$500 fine if late"],
            ["Rental Dwelling License", "Required — $60/unit, 2-year", "Includes passing inspection"],
            ["Rooming House License", "REQUIRED for 3+ unrelated", "Confirm with DHCD"],
            ["Lead Paint Registration (MDE)", "MANDATORY (1923 build)", "$75 for 2-year period"],
            ["Lead Paint Inspection", "At every tenant turnover", "$150–$300 per inspection"],
            ["Zoning Approval", "May need conditional use", "Consult zoning attorney"],
          ],
          [3400, 3000, 3720],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Zoning"),
        bulletItem("Current designation: R-7 or R-8 (Rowhouse Residential)"),
        bulletItem("Conversion to multi-tenant requires conditional use approval by City Council ordinance"),
        bulletItem("2 unrelated persons maximum without rooming house classification"),
        bulletItem("Housing Options and Opportunities Act (pending) would allow duplex/triplex/fourplex in R-7/R-8"),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Lead Paint (Non-Negotiable)"),
        bulletItem("Annual registration under owner-specific MDE Tracking Number"),
        bulletItem("Lead inspection at every tenant turnover (unless certified lead-free)"),
        bulletItem("All chipping/peeling paint must be corrected before certificate issued"),
        bulletItem("Budget: $2,000–$5,000 for lead-safe certification, $150–$300 per turnover inspection"),

        // ─── 7. LOCATION ANALYSIS ───
        new PageBreak(),
        sectionHeading("7. BLOCK-LEVEL LOCATION ANALYSIS"),
        subHeading("Neighborhood Tier: 4 (Transitional)"),
        makeTable(
          ["Factor", "Detail"],
          [
            ["Tier", "4 (Transitional)"],
            ["Cap Rate Target", "12–15%+"],
            ["Vacancy Assumption", "10%"],
            ["Risk Profile", "Higher risk, higher potential returns"],
          ],
          [3200, 6920],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Crime & Safety"),
        bulletItem("Western District — historically one of Baltimore’s most challenged police districts"),
        bulletItem("POSITIVE: City-wide homicides at 50-year low (131 in 2025, down 31% YoY)", { color: GREEN }),
        bulletItem("POSITIVE: Non-fatal shootings down 24%, carjackings down 37%", { color: GREEN }),
        bulletItem("CAUTION: Western District still had elevated violent crime in July 2024", { color: YELLOW }),
        bulletItem("Block-by-block variation is extreme — walking the 3200 block is essential"),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Proximity to Anchors"),
        makeTable(
          ["Anchor", "Distance"],
          [
            ["Mondawmin Mall / Metro Station", "~1.5 mi"],
            ["Coppin State University", "~1.5 mi"],
            ["West Baltimore MARC Station", "~2 mi"],
            ["Gwynns Falls Park", "Adjacent"],
            ["Walbrook Junction Shopping", "~0.5 mi"],
            ["CityLink bus routes", "On North Ave nearby"],
          ],
          [5060, 5060],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Market Dynamics"),
        bulletItem("Rosemont median home prices up 32% YoY ($113K median)", { color: GREEN }),
        bulletItem("$100M state investment in Baltimore vacant property revitalization"),
        bulletItem("Co-living demand: 163,000 housing unit deficit in Baltimore metro"),
        bulletItem("PadSplit has 98 rooms listed in Baltimore — growing market"),

        // ─── 8. RISK MATRIX ───
        new PageBreak(),
        sectionHeading("8. RISK MATRIX"),
        makeTable(
          ["#", "Risk", "Severity", "Mitigation", "Residual"],
          [
            ["1", "Rooming house license denial", "HIGH", "Research with DHCD before closing. Fallback: 2-tenant traditional", "MEDIUM"],
            ["2", "Conditional use permit required", "MEDIUM", "Budget $3K–$5K and 3–6 months for approval", "MEDIUM"],
            ["3", "Lead paint remediation costs", "MEDIUM", "Budget $2K–$5K in renovation. Full inspection at acquisition", "LOW"],
            ["4", "PML refi gap at conservative ARV", "MEDIUM", "Pre-negotiate extension. Cash flow covers $430/mo paydown", "LOW"],
            ["5", "Rehab budget overrun", "LOW-MED", "15% contingency in $85K budget. Standard scope", "LOW"],
            ["6", "Due-on-sale clause triggered", "LOW", "18yr seasoned. Land trust. 4% rate = no incentive to call", "VERY LOW"],
            ["7", "Vacancy exceeds 10%", "LOW", "4 streams vs 1. Room rates at/below market", "LOW"],
            ["8", "Neighborhood crime/safety", "MEDIUM", "City-wide trends positive. Walk block before committing", "MEDIUM"],
            ["9", "Months 1–3 negative cash flow", "LOW", "~$1,600–$3,700 burn funded from PML reserves", "VERY LOW"],
          ],
          [500, 2600, 1200, 3820, 1000],
        ),

        // ─── 9. GO/NO-GO ───
        new PageBreak(),
        sectionHeading("9. GO/NO-GO RECOMMENDATION"),
        verdictBadge("VERDICT: CONDITIONAL GO", GREEN),
        makeTable(
          ["Category", "Signal", "Rating"],
          [
            ["Financials", "CoC 43%, cash flow $430–$1,280/mo, DSCR 1.94–2.22", "GREEN"],
            ["Comps/ARV", "$180K–$200K supported by same-street sales", "GREEN"],
            ["Room Rates", "$625 validated at market center, $675 conservative", "GREEN"],
            ["PML Exit", "Gap manageable at realistic ARV, tight at conservative", "YELLOW"],
            ["Regulations", "Rooming house license + conditional use needed", "RED"],
            ["Location", "Tier 4 transitional, crime improving, 32% growth", "YELLOW"],
            ["Lead Paint", "Mandatory compliance, budgeted in renovation scope", "YELLOW"],
          ],
          [2000, 5520, 2600],
        ),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Conditions for Full GO"),
        bulletItem("Confirm rooming house license feasibility — Contact DHCD before closing"),
        bulletItem("Verify exact zoning — Use CityView to confirm R-7 vs R-8"),
        bulletItem("Walk the 3200 block — Count vacants, assess condition, talk to neighbors"),
        bulletItem("Get lead paint inspection — Full inspection to scope remediation costs"),
        bulletItem("Pre-negotiate PML extension terms — Ensure fallback if refi proceeds fall short"),
        bulletItem("Get co-living insurance quote — Commercial landlord policy with lead paint coverage"),
        bulletItem("Consult Baltimore zoning attorney — $500–$1,000 for definitive answer"),
        new Paragraph({ spacing: { before: 200 } }),
        subHeading("Fallback Strategy (If rooming house license denied)"),
        bulletItem("Option A: Rent to 2 unrelated tenants (2BR traditional) — gross ~$1,250–$1,400/mo"),
        bulletItem("Option B: Rent to a family (whole unit) — gross ~$1,200–$1,500/mo for 4BR/2BA"),
        bulletItem("Option C: PadSplit partnership (they handle licensing/compliance)"),
        bodyText("In all fallback scenarios, the property still cash flows and the PML is serviceable, but returns compress significantly."),

        // ─── 10. UPSIDE SCENARIOS ───
        new PageBreak(),
        sectionHeading("10. UPSIDE SCENARIOS"),
        makeTable(
          ["Scenario", "Impact"],
          [
            ["Room 4 priced at market ($800 vs $675)", "+$125/mo, +$1,500/yr, CoC jumps to 55%"],
            ["All rooms furnished + utilities included", "+$100–$200/room/mo. Gross could reach $3,400/mo"],
            ["PadSplit placement (weekly billing)", "$155–$250/wk per room. 4 rooms at $175/wk avg = $3,033/mo"],
            ["Housing Options Act passes", "Simplifies zoning, removes conditional use barrier"],
            ["Section 8 / BRHP voucher tenants", "Guaranteed rent payments, reduced vacancy risk"],
          ],
          [4500, 5620],
        ),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: "333333", space: 8 } },
          spacing: { before: 200 },
          children: [new TextRun({ text: "Report generated May 13, 2026. All projections are estimates based on current market data.", color: GRAY_TEXT, font: "Arial", size: 16, italics: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Sources: Redfin, Zillow, Homes.com, Roomies, SpareRoom, PadSplit, Zumper, Craigslist, Baltimore City DHCD, BPD.", color: GRAY_TEXT, font: "Arial", size: 16, italics: true })],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/Users/michaeljr410/Desktop/brighton-pml-offer/3221-Brighton-Underwriting-Report.docx", buffer);
  console.log("DOCX generated: 3221-Brighton-Underwriting-Report.docx");
});
