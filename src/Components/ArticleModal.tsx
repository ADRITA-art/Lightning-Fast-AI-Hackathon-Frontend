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
    doc.setFont("Helvetica", "normal");
    doc.text("Generated Article", 10, 10);
    doc.text(content, 10, 20);
    doc.save("generated-article.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">Generated Article</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            ✖
          </button>
        </div>
        <div className="mt-4 max-h-72 overflow-y-auto text-gray-700">
          <p>{content}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-5 py-2 bg-purple-600 text-white rounded-lg"
            onClick={handleDownload}
          >
            Download as PDF
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
