
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
