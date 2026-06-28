import jsPDF from 'jspdf'

// A4 dimensions in mm: 210 x 297
// We replicate the hospital letterhead: logo header top, footer bottom, content in between

export const generateBillPDF = (bill, patient, items) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = 210
  const pageH = 297
  const margin = 15

  // ── COLORS ──
  const blue = [13, 71, 161]
  const darkGray = [31, 41, 55]
  const medGray = [107, 114, 128]
  const red = [185, 28, 28]

  // ══════════════════════════════
  // HEADER — matches letterhead
  // ══════════════════════════════
  // Blue top bar
  doc.setFillColor(...blue)
  doc.rect(0, 0, pageW, 28, 'F')

  // Hospital name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('RISHI CARE HOSPITAL', margin, 12)

  // Tagline
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('You Are In Safe Hands  |  24/7 Service', margin, 18)

  // Right side phone
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('+91 9391156294', pageW - margin, 12, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.text('Peerzadiguda, Hyderabad - 500092', pageW - margin, 18, { align: 'right' })

  // Watermark logo (faint circle in center)
  doc.setDrawColor(220, 230, 245)
  doc.setLineWidth(0.3)
  doc.setFillColor(240, 245, 255)
  doc.circle(pageW / 2, pageH / 2, 40, 'S')

  // ══════════════════════════════
  // BILL TITLE BAR
  // ══════════════════════════════
  doc.setFillColor(240, 245, 255)
  doc.rect(margin, 33, pageW - margin * 2, 10, 'F')
  doc.setTextColor(...blue)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('MEDICAL BILL / RECEIPT', pageW / 2, 40, { align: 'center' })

  // ══════════════════════════════
  // BILL INFO ROW
  // ══════════════════════════════
  let y = 52

  // Left: Patient info
  doc.setTextColor(...darkGray)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('Patient Details', margin, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.text(`Name   : ${patient.name}`, margin, y + 6)
  doc.text(`Age    : ${patient.age} yrs  |  Gender: ${patient.gender}`, margin, y + 12)
  doc.text(`Phone  : ${patient.phone}`, margin, y + 18)
  doc.text(`Doctor : ${patient.doctor_name}`, margin, y + 24)

  // Right: Bill info
  const rightX = pageW - margin
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Bill Details', rightX, y, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.text(`Bill No : ${bill.bill_number}`, rightX, y + 6, { align: 'right' })
  doc.text(`Date    : ${new Date(bill.created_at).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  })}`, rightX, y + 12, { align: 'right' })
  doc.text(`Time    : ${new Date(bill.created_at).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  })}`, rightX, y + 18, { align: 'right' })

  // Divider
  y += 32
  doc.setDrawColor(...blue)
  doc.setLineWidth(0.4)
  doc.line(margin, y, pageW - margin, y)

  // ══════════════════════════════
  // TABLE HEADER
  // ══════════════════════════════
  y += 4
  doc.setFillColor(...blue)
  doc.rect(margin, y, pageW - margin * 2, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')

  const cols = {
    no: margin + 2,
    name: margin + 10,
    qty: margin + 90,
    price: margin + 110,
    gst: margin + 130,
    total: pageW - margin - 2,
  }

  doc.text('#', cols.no, y + 5.5)
  doc.text('Medicine Name', cols.name, y + 5.5)
  doc.text('Qty', cols.qty, y + 5.5)
  doc.text('Unit Price', cols.price, y + 5.5)
  doc.text('GST%', cols.gst, y + 5.5)
  doc.text('Total', cols.total, y + 5.5, { align: 'right' })

  // ══════════════════════════════
  // TABLE ROWS
  // ══════════════════════════════
  y += 8
  doc.setTextColor(...darkGray)
  doc.setFontSize(8)

  items.forEach((item, index) => {
    const rowBg = index % 2 === 0 ? [255, 255, 255] : [248, 250, 252]
    doc.setFillColor(...rowBg)
    doc.rect(margin, y, pageW - margin * 2, 7, 'F')

    doc.setFont('helvetica', 'normal')
    doc.text(String(index + 1), cols.no, y + 5)
    doc.text(item.medicine_name.substring(0, 35), cols.name, y + 5)
    doc.text(String(item.quantity), cols.qty, y + 5)
    doc.text(`₹${Number(item.unit_price).toFixed(2)}`, cols.price, y + 5)
    doc.text(`${item.gst_percent}%`, cols.gst, y + 5)
    doc.text(`₹${Number(item.line_total).toFixed(2)}`, cols.total, y + 5, { align: 'right' })

    y += 7
  })

  // Bottom border of table
  doc.setDrawColor(200, 210, 230)
  doc.setLineWidth(0.3)
  doc.line(margin, y, pageW - margin, y)

  // ══════════════════════════════
  // TOTALS SECTION
  // ══════════════════════════════
  y += 6
  const totalsX = pageW - margin - 60
  const totalsValueX = pageW - margin

  const drawTotalRow = (label, value, isBold = false, isGrand = false) => {
    if (isGrand) {
      doc.setFillColor(...blue)
      doc.rect(totalsX - 5, y - 4, 65, 9, 'F')
      doc.setTextColor(255, 255, 255)
    } else {
      doc.setTextColor(...darkGray)
    }
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')
    doc.setFontSize(isGrand ? 9.5 : 8.5)
    doc.text(label, totalsX, y)
    doc.text(`₹${Number(value).toFixed(2)}`, totalsValueX, y, { align: 'right' })
    y += isGrand ? 10 : 7
  }

  drawTotalRow('Subtotal (before GST):', bill.subtotal)
  drawTotalRow('GST Amount:', bill.gst_amount)
  doc.setDrawColor(...blue)
  doc.setLineWidth(0.3)
  doc.line(totalsX - 5, y - 2, pageW - margin, y - 2)
  drawTotalRow('GRAND TOTAL:', bill.grand_total, true, true)

  // ══════════════════════════════
  // THANK YOU NOTE
  // ══════════════════════════════
  y += 6
  doc.setTextColor(...medGray)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Thank you for choosing Rishi Care Hospital. Wishing you a speedy recovery!', pageW / 2, y, { align: 'center' })

  // ══════════════════════════════
  // FOOTER — matches letterhead
  // ══════════════════════════════
  // Bottom blue bar
  doc.setFillColor(...blue)
  doc.rect(0, pageH - 18, pageW, 18, 'F')

  // 24/7 badge area
  doc.setFillColor(...red)
  doc.rect(0, pageH - 18, 28, 18, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('24/7', 14, pageH - 10, { align: 'center' })
  doc.setFontSize(6)
  doc.text('SERVICE', 14, pageH - 5, { align: 'center' })

  // Footer address
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.text(
    '# 18-1/40/3, Ground Floor, Opp. Telangana Grameena Bank, Peerzadiguda Main Road, Hyderabad - 500 092',
    pageW / 2 + 5, pageH - 10, { align: 'center' }
  )
  doc.setFont('helvetica', 'bold')
  doc.text('Phone: +91 9391156294', pageW / 2 + 5, pageH - 4, { align: 'center' })

  // ── Save ──
  doc.save(`Bill_${bill.bill_number}_${patient.name.replace(/\s+/g, '_')}.pdf`)
}