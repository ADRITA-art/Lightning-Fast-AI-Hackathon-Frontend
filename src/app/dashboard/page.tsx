// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import jsPDF from "jspdf";


// export default function Home() {
//   const [showArticleModal, setShowArticleModal] = useState(false);
//   const [articleContent, setArticleContent] = useState('');
//   const [showQuestionModal, setShowQuestionModal] = useState(false);
//   const [topic, setTopic] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [questionContent, setQuestionContent] = useState('');
//   const [syllabus, setSyllabus] = useState('');
//   const [loadingArticle, setLoadingArticle] = useState(false);
//   const [loadingQuestion, setLoadingQuestion] = useState(false);
//   const [syllabusText, setSyllabusText] = useState('');
//   const [file, setFile] = useState<File | null>(null);
  

//   const handleGenerateArticle = async () => {
//     if (!topic.trim()) {
//       alert('Please enter a topic.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('https://lightning-hackathon-server.onrender.com/generate-article', {
//         topic,
//       });

//       setArticleContent(response.data.article || 'No article was generated.');
//       setShowArticleModal(true);
//     } catch (error) {
//       console.error('Error generating article:', error);
//       setArticleContent('Failed to generate article. Please try again later.');
//       setShowArticleModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleGenerateQuestions = async (syllabusImage?: File, syllabusTextInput?: string) => {
//     if (!syllabusTextInput?.trim() && !syllabusImage) {
//       alert("Please upload an image or type the syllabus manually.");
//       return;
//     }
  
//     setLoadingQuestion(true);
  
//     try {
//       const formData = new FormData();
  
//       if (syllabusImage) {
//         formData.append("syllabus_image", syllabusImage); // Match backend key for image
//       }
//       if (syllabusTextInput?.trim()) {
//         formData.append("syllabus_text", syllabusTextInput); // Match backend key for text
//       }
  
//       const response = await axios.post(
//         "https://lightning-hackathon-server.onrender.com/generate-questions",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
  
//       // Extract the questions correctly
//       const shortQuestions = response.data.short_questions || [];
//       const descriptiveQuestions = response.data.descriptive_questions || [];
  
//       if (shortQuestions.length > 0 || descriptiveQuestions.length > 0) {
//         const formattedContent = [
//           "Short Questions:",
//           ...shortQuestions.map((q: string, i: number) => `${i + 1}. ${q}`),
//           "",
//           "Descriptive Questions:",
//           ...descriptiveQuestions.map((q: string, i: number) => `${i + 1}. ${q}`),
//         ].join("\n");
  
//         setQuestionContent(formattedContent); // Set the modal content
//       } else {
//         setQuestionContent("No questions were generated.");
//       }
  
//       setShowQuestionModal(true); // Show the modal
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error generating questions:", error.response?.data || error.message);
//       } else {
//         console.error("Error generating questions:", error);
//       }
  
//       setQuestionContent("Failed to generate questions. Please try again later.");
//       setShowQuestionModal(true);
//     } finally {
//       setLoadingQuestion(false);
//     }
//   };
  
  
  
//   return (
//     <div className="min-h-screen bg-purple-600 flex justify-center items-center">
//       <div className="grid grid-cols-2 gap-4 p-8 bg-gray-100 rounded-lg">
//         {/* Article Generation Section */}
//         <div className="p-4 bg-gray-300 rounded-md shadow-md">
//           <h2 className="text-xl font-bold mb-4">Article Generation</h2>
//           <input
//             type="text"
//             placeholder="Give topic"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="w-full p-2 border border-gray-400 rounded-md mb-4"
//           />
//           <button
//             className={`bg-red-600 text-white px-4 py-2 rounded-md ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             onClick={handleGenerateArticle}
//             disabled={loading}
//           >
//             {loading ? 'Generating...' : 'Generate Article'}
//           </button>
//       </div>


//         {/* Question Generation Section */}
//         <div className="p-4 bg-gray-300 rounded-md shadow-md">
//   <h2 className="text-xl font-bold mb-4">Generate Questions</h2>
//   <input
//     type="file"
//     className="block mb-4"
//     id="syllabusUpload"
//     accept="image/*"
//     onChange={(e) => {
//       if (e.target.files && e.target.files[0]) {
//         const uploadedFile = e.target.files[0];
//         handleGenerateQuestions(uploadedFile, undefined); // Pass only the file
//       }
//     }}
//   />
//   <textarea
//     placeholder="Or type the syllabus"
//     className="w-full p-2 border border-gray-400 rounded-md mb-4"
//     rows={4}
//     onBlur={(e) => {
//       const text = e.target.value;
//       if (text.trim()) {
//         handleGenerateQuestions(undefined, text); // Pass only the text
//       }
//     }}
//   ></textarea>
//   <button
//     className={`bg-red-600 text-white px-4 py-2 rounded-md ${
//       loadingQuestion ? "opacity-50 cursor-not-allowed" : ""
//     }`}
//     onClick={() => alert("Please use the input field or text area to submit data.")}
//     disabled={loadingQuestion}
//   >
//     {loadingQuestion ? "Generating..." : "Generate Questions"}
//   </button>
// </div>
//       </div>  



//       {/* Modals */}
//       {showArticleModal && (
//         <ArticleModal
//           content={articleContent}
//           onClose={() => setShowArticleModal(false)}
//         />
//       )}
// {showQuestionModal && (
//   <QuestionModal
//     content={questionContent}
//     onClose={() => setShowQuestionModal(false)} 
//   />
// )}

//     </div>
//   );
// }

// function ArticleModal({
//   content,
//   onClose,
// }: {
//   content: string;
//   onClose: () => void;
// }) {
//   // Function to handle PDF download
//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.setFont("Helvetica", "normal");
//     doc.text("Generated Article", 10, 10); // Title
//     doc.text(content, 10, 20); // Content starting after title
//     doc.save("generated-article.pdf"); // Save as PDF
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h3 className="text-xl font-semibold text-gray-800">Generated Article</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-600 transition duration-200"
//             aria-label="Close"
//           >
//             ✖
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="mt-4 max-h-72 overflow-y-auto text-gray-700 leading-relaxed">
//           <p>{content}</p>
//         </div>

//         {/* Modal Footer */}
//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
//             onClick={handleDownload}
//           >
//             Download as PDF
//           </button>
//           <button
//             className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// function QuestionModal({ content, onClose }: { content: string; onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-md shadow-lg w-96 max-h-[90vh] overflow-y-auto">
//         <h3 className="text-lg font-bold mb-4 text-center">Generated Questions</h3>
//         {content ? (
//           <pre className="text-gray-700 whitespace-pre-wrap">{content}</pre>
//         ) : (
//           <p className="text-gray-500 text-center">No questions available.</p>
//         )}
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";
import ArticleModal from "@/Components/ArticleModal";
import QuestionModal from "@/Components/QuestionModal";

export default function Home() {
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionContent, setQuestionContent] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const handleGenerateArticle = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://lightning-hackathon-server.onrender.com/generate-article", { topic });
      setArticleContent(response.data.article || "No article was generated.");
      setShowArticleModal(true);
    } catch (error) {
      console.error("Error generating article:", error);
      setArticleContent("Failed to generate article. Please try again later.");
      setShowArticleModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async (syllabusImage?: File, syllabusTextInput?: string) => {
    if (!syllabusTextInput?.trim() && !syllabusImage) {
      alert("Please upload an image or type the syllabus manually.");
      return;
    }

    setLoadingQuestion(true);
    try {
      const formData = new FormData();

      if (syllabusImage) formData.append("syllabus_image", syllabusImage);
      if (syllabusTextInput?.trim()) formData.append("syllabus_text", syllabusTextInput);

      const response = await axios.post(
        "https://lightning-hackathon-server.onrender.com/generate-questions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const shortQuestions = response.data.short_questions || [];
      const descriptiveQuestions = response.data.descriptive_questions || [];
      if (shortQuestions.length > 0 || descriptiveQuestions.length > 0) {
        const formattedContent = [
          "Short Questions:",
          ...shortQuestions.map((q: string, i: number) => `${i + 1}. ${q}`),
          "",
          "Descriptive Questions:",
          ...descriptiveQuestions.map((q: string, i: number) => `${i + 1}. ${q}`),
        ].join("\n");

        setQuestionContent(formattedContent);
      } else {
        setQuestionContent("No questions were generated.");
      }
      setShowQuestionModal(true);
    } catch (error) {
      console.error("Error generating questions:", error);
      setQuestionContent("Failed to generate questions. Please try again later.");
      setShowQuestionModal(true);
    } finally {
      setLoadingQuestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-600 flex justify-center items-center">
      <div className="grid grid-cols-2 gap-4 p-8 bg-gray-100 rounded-lg">
        {/* Article Generation Section */}
        <div className="p-4 bg-gray-300 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Article Generation</h2>
          <input
            type="text"
            placeholder="Give topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-md mb-4"
          />
          <button
            className={`bg-red-600 text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleGenerateArticle}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Article"}
          </button>
        </div>

        {/* Question Generation Section */}
        <div className="p-4 bg-gray-300 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Generate Questions</h2>
          <input
            type="file"
            className="block mb-4"
            id="syllabusUpload"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const uploadedFile = e.target.files[0];
                handleGenerateQuestions(uploadedFile, undefined);
              }
            }}
          />
          <textarea
            placeholder="Or type the syllabus"
            className="w-full p-2 border border-gray-400 rounded-md mb-4"
            rows={4}
            onBlur={(e) => {
              const text = e.target.value;
              if (text.trim()) {
                handleGenerateQuestions(undefined, text);
              }
            }}
          ></textarea>
          <button
            className={`bg-red-600 text-white px-4 py-2 rounded-md ${loadingQuestion ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => alert("Please use the input field or text area to submit data.")}
            disabled={loadingQuestion}
          >
            {loadingQuestion ? "Generating..." : "Generate Questions"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {showArticleModal && (
        <ArticleModal content={articleContent} onClose={() => setShowArticleModal(false)} />
      )}
      {showQuestionModal && (
        <QuestionModal content={questionContent} onClose={() => setShowQuestionModal(false)} />
      )}
    </div>
  );
}
