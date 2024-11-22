import { toPng } from "html-to-image";

export default function QuestionModal({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  // Format content into paragraphs and lines
  const formattedContent = content
    .split("\n\n")
    .map((paragraph, index) => (
      <p key={index} className="mb-6">
        {paragraph.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    ));

  // Handle downloading the content as an image
  const handleDownload = async () => {
    const node = document.getElementById("questions-content");
    if (node) {
      try {
        const dataUrl = await toPng(node, {
          backgroundColor: "white", // Ensures white background in the image
        });
        const link = document.createElement("a");
        link.download = "questions.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            📋 Generated Questions
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            ✖
          </button>
        </div>
        <div
          id="questions-content"
          className="mt-6 max-h-[65vh] overflow-y-auto text-gray-700 leading-relaxed pr-4"
        >
          {content ? (
            <div>{formattedContent}</div>
          ) : (
            <p className="text-gray-500 text-center text-lg">
              No questions available.
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-end space-x-6">
          <button
            className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-transform transform hover:scale-105"
            onClick={handleDownload}
          >
            Download as Image
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
