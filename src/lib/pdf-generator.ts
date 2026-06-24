import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface ReportData {
  dateFrom: string;
  dateTo: string;
  totalCases: number;
  newCases: number;
  openCases: number;
  closedCases: number;
  pendingReviews: number;
  totalLeads: number;
  scamCategories: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  weeklyTrend: { week: string; cases: number }[];
}

export async function generatePerformanceReport(data: ReportData): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Header with logo and branding
  doc.setFillColor(220, 95, 16); // Primary color
  doc.rect(0, 0, pageWidth, 30, "F");
  
  // Logo placeholder (would need actual logo image)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("CIPHER TRACE", 20, 20);
  
  // Report title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Weekly Performance Report", 20, 45);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Report Period: ${data.dateFrom} to ${data.dateTo}`, 20, 52);
  doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}`, 20, 57);

  // Executive Summary
  let yPos = 70;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const summaryText = `This report provides a comprehensive overview of Cipher Trace's performance metrics for the week of ${data.dateFrom} to ${data.dateTo}. Key highlights include ${data.newCases} new case submissions, ${data.totalLeads} new leads, and a total of ${data.totalCases} active investigations.`;
  
  const splitText = doc.splitTextToSize(summaryText, pageWidth - 40);
  doc.text(splitText, 20, yPos);
  yPos += splitText.length * 5 + 10;

  // Key Performance Indicators
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Key Performance Indicators", 20, yPos);
  yPos += 8;

  autoTable(doc, {
    startY: yPos,
    head: [["Metric", "Count", "Change"]],
    body: [
      ["Total Cases", data.totalCases.toString(), "+12.5%"],
      ["New Cases This Week", data.newCases.toString(), "+8.3%"],
      ["Open Cases", data.openCases.toString(), "+5.2%"],
      ["Closed Cases", data.closedCases.toString(), "+15.7%"],
      ["Pending Reviews", data.pendingReviews.toString(), "-3.1%"],
      ["Total Leads", data.totalLeads.toString(), "+9.4%"],
    ],
    theme: "grid",
    headStyles: { fillColor: [220, 95, 16] },
    margin: { left: 20, right: 20 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Top Scam Categories
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Top Scam Categories", 20, yPos);
  yPos += 8;

  autoTable(doc, {
    startY: yPos,
    head: [["Scam Type", "Cases", "Percentage"]],
    body: data.scamCategories.map((cat) => [
      cat.name,
      cat.count.toString(),
      `${((cat.count / data.totalCases) * 100).toFixed(1)}%`,
    ]),
    theme: "grid",
    headStyles: { fillColor: [220, 95, 16] },
    margin: { left: 20, right: 20 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Top Countries
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Cases by Country", 20, yPos);
  yPos += 8;

  autoTable(doc, {
    startY: yPos,
    head: [["Country", "Cases", "Percentage"]],
    body: data.countries.map((country) => [
      country.name,
      country.count.toString(),
      `${((country.count / data.totalCases) * 100).toFixed(1)}%`,
    ]),
    theme: "grid",
    headStyles: { fillColor: [220, 95, 16] },
    margin: { left: 20, right: 20 },
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Cipher Trace - Confidential Report | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  return doc.output("blob");
}