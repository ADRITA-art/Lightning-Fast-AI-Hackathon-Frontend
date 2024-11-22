"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "@/Components/GenerateButton";
import ArticleModal from "@/Components/ArticleModal";
import QuestionModal from "@/Components/QuestionModal";

export default function Home() {
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [image, setImage] = useState(null);

  const [syllabusImage, setSyllabusImage] = useState<File | null>(null);
  const [syllabusText, setSyllabusText] = useState("");

  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [answerImage, setAnswerImage] = useState<File | null>(null);
  
  const [evaluationResult, setEvaluationResult] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  const handleGenerateArticle = async () => {
    if (!topic.trim()) {
      setError("Topic must be provided to generate an article.");
      return;
    }
    setError("");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://lightning-hackathon-server.onrender.com/generate-article",
        { topic }
      );
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

  const handleGenerateQuestions = async () => {
    if (!syllabusImage && !syllabusText.trim()) {
      alert("Please provide either an image or text for the syllabus.");
      return;
    }

    setLoadingQuestion(true);
    try {
      const formData = new FormData();
      if (syllabusImage) formData.append("syllabus_image", syllabusImage);
      if (syllabusText.trim()) formData.append("syllabus_text", syllabusText);

      const response = await axios.post(
        "https://lightning-hackathon-server.onrender.com/generate-questions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const descriptiveQuestions = Array.isArray(response.data.descriptive_questions) ? response.data.descriptive_questions : [];
      const shortQuestions = Array.isArray(response.data.short_questions) ? response.data.short_questions : [];

      if (shortQuestions.length > 0 || descriptiveQuestions.length > 0) {
        const formattedContent = [
          "Short Questions:",
          ...shortQuestions.map((q: string, i: number) => `${i + 1}. ${q || "No question short available"}`),
          "",
          "Descriptive Questions:",
          ...descriptiveQuestions.map((q: string, i: number) => `${i + 1}. ${q || "No question text available"}`),
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

  const handleClearFile = () => {
    setSyllabusImage(null);
    setImage(null);
  };
  const handleEvaluatePerformance = async () => {
    if (!questionImage || !answerImage) {
      alert("Please upload both the question and answer images.");
      return;
    }

    setEvaluating(true);
    try {
      const formData = new FormData();
      formData.append("question_image", questionImage);
      formData.append("answer_image", answerImage);

      const response = await axios.post(
        "https://lightning-hackathon-server.onrender.com/evaluate-performance",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEvaluationResult(response.data.evaluation || "No evaluation available.");
    } catch (error) {
      console.error("Error evaluating performance:", error);
      setEvaluationResult("Failed to evaluate performance. Please try again later.");
    } finally {
      setEvaluating(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-2 gap-6 w-full max-w-5xl bg-white p-8 rounded-2xl shadow-2xl"
      >
        {/* Article Generation */}
        <motion.div
          className="p-6 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">Generate Article</h2>
          <input
            type="text"
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
            style={{ minHeight: "80px" }}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-6">
            <Button onClick={handleGenerateArticle} loading={loading}>
              Generate
            </Button>
          </div>
        </motion.div>

        {/* Question Generation */}
        <motion.div
          className="p-6 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">Generate Questions</h2>
          <div className="relative">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="block w-full p-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => {
                if (e.target.files) setSyllabusImage(e.target.files[0]);
                setSyllabusText(""); // Disable text if file is selected
              }}
              disabled={!!syllabusText.trim()}
            />
            {syllabusImage && (
              <button
                className="absolute top-0 right-0 text-red-500 p-2"
                onClick={handleClearFile}
              >
                ✖
              </button>
            )}
          </div>
          <textarea
            placeholder="Or type the syllabus here"
            rows={3}
            className="w-full p-3 mt-4 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={syllabusText}
            onChange={(e) => setSyllabusText(e.target.value)}
            disabled={!!syllabusImage}
          ></textarea>
          <div className="mt-2">
            <Button onClick={handleGenerateQuestions} loading={loadingQuestion}>
              Generate
            </Button>
          </div>
        </motion.div>
        {/* Evaluation */}
        <motion.div
  className="col-span-2 p-6 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
  whileHover={{ scale: 1.02 }}
>
  <h2 className="text-lg font-semibold text-indigo-700 mb-4">Evaluate Performance</h2>

  <div className="relative mb-4">
    <input
      type="file"
      accept="image/*"
      className="block w-64 p-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      onChange={(e) => setQuestionImage(e.target.files ? e.target.files[0] : null)}
    />
    {questionImage && (
      <button
        className="absolute top-0 right-0 text-red-500 p-2"
        onClick={() => setQuestionImage(null)}
      >
        ✖
      </button>
    )}
  </div>

  <div className="relative mb-4">
    <input
      type="file"
      accept="image/*"
      className="block w-64 p-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      onChange={(e) => setAnswerImage(e.target.files ? e.target.files[0] : null)}
    />
    {answerImage && (
      <button
        className="absolute top-0 right-0 text-red-500 p-2"
        onClick={() => setAnswerImage(null)}
      >
        ✖
      </button>
    )}
  </div>

  {/* Evaluate Button: Only visible when both images are uploaded */}
  {questionImage && answerImage && (
        <Button onClick={handleEvaluatePerformance} loading={evaluating}>
          Evaluate
        </Button>
      )}
 

  {/* Result Display */}
  {evaluationResult && (
    <motion.div
      className="mt-4 p-4 bg-white rounded-md text-gray-800 border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold">Result:</h3>
      <p>{evaluationResult}</p>
    </motion.div>
  )}
</motion.div>

        </motion.div>
        


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
