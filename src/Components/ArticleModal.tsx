import jsPDF from "jspdf";

export default function ArticleModal({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  const handleDownload = () => {
    const doc = new jsPDF();
  
    // Remove markdown-like formatting and keep plain text
    const plainContent = content
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown (**text**)
      .replace(/\*(.*?)\*/g, "$1")     // Remove italic markdown (*text*)
      .replace(/\n/g, "\n");           // Preserve line breaks
  
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10; // Approximate line height
    const maxWidth = 180; // Usable width of the page
    const contentLines = doc.splitTextToSize(plainContent, maxWidth);
  
    let yPosition = margin; // Start position for text
  
    doc.setFont("Helvetica", "normal");
    doc.text("Generated Article", margin, yPosition);
    yPosition += lineHeight;
  
    // Loop through lines and handle page breaks
    contentLines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage(); // Add a new page if space runs out
        yPosition = margin; // Reset y position for new page
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight; // Move to the next line
    });
  
    doc.save("generated-article.pdf");
  };
  
  // Format content: basic Markdown-like handling
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold (**text**)
    .replace(/\*(.*?)\*/g, "<em>$1</em>")            // Italic (*text*)
    .replace(/\n/g, "<br />");                       // Line breaks

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800">Generated Article</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            ✖
          </button>
        </div>
        <div className="mt-6 max-h-[65vh] overflow-y-auto text-gray-700 leading-relaxed pr-4">
          <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div>
        <div className="mt-8 flex justify-end space-x-6">
          <button
            className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-transform transform hover:scale-105"
            onClick={handleDownload}
          >
            Download as PDF
          </button>
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-transform transform hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
