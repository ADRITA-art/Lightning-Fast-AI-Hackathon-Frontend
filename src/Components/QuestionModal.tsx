import { toPng } from "html-to-image";

export default function QuestionModal({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
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

  const handleDownload = async () => {
    const node = document.getElementById("questions-content");
    if (node) {
      try {
        const dataUrl = await toPng(node, {
          backgroundColor: "white", // Set a solid background
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
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto transform transition-all scale-105 hover:scale-100 duration-300">
        <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
          📋 Generated Questions
        </h3>
        {content ? (
          <div
            id="questions-content"
            className="text-gray-800 leading-relaxed text-lg bg-white p-4"
          >
            {formattedContent}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">No questions available.</p>
        )}
        <div className="flex justify-between items-center mt-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-110 shadow-md"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-110 shadow-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
