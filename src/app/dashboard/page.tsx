"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa"; 
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

  const [syllabusImage, setSyllabusImage] = useState<File | null>(null);
  const [syllabusText, setSyllabusText] = useState("");

  const [questionImage, setQuestionImage] = useState<File | null>(null);
  const [answerImage, setAnswerImage] = useState<File | null>(null);
  
  const [evaluationResult, setEvaluationResult] = useState("");
  const [evaluationScore, setEvaluationScore] = useState<number | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  // Object URLs for image previews
  const [questionImagePreview, setQuestionImagePreview] = useState<string>("");
  const [answerImagePreview, setAnswerImagePreview] = useState<string>("");

  // Generate Object URLs when images are selected
  useEffect(() => {
    if (questionImage) {
      const preview = URL.createObjectURL(questionImage);
      setQuestionImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    } else {
      setQuestionImagePreview("");
    }
  }, [questionImage]);

  useEffect(() => {
    if (answerImage) {
      const preview = URL.createObjectURL(answerImage);
      setAnswerImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    } else {
      setAnswerImagePreview("");
    }
  }, [answerImage]);

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
          "### Short Questions:",
          ...shortQuestions.map((q: string, i: number) => `${i + 1}. ${q || "No short question available."}`),
          "",
          "### Descriptive Questions:",
          ...descriptiveQuestions.map((q: string, i: number) => `${i + 1}. ${q || "No descriptive question available."}`),
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
    setSyllabusText("");
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
        "https://lightning-hackathon-server.onrender.com/evaluate-answer",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEvaluationResult(response.data.evaluation || "No evaluation available.");
      setEvaluationScore(response.data.score !== undefined ? response.data.score : null);
    } catch (error) {
      console.error("Error evaluating performance:", error);
      setEvaluationResult("Failed to evaluate performance. Please try again later.");
      setEvaluationScore(null);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center p-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 mb-6"
      >
        Dashboard
      </motion.h1>
      {/* Decorative Underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 mb-12 rounded-full"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl bg-white p-10 rounded-3xl shadow-2xl"
      >
        <motion.div
          className="p-6 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Generate Article</h2>
          <input
            type="text"
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base transition"
            style={{ minHeight: "80px" }}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-6">
            <Button onClick={handleGenerateArticle} loading={loading}>
              Generate
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Generate Questions</h2>
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus Image:</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="block w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              onChange={(e) => {
                if (e.target.files) setSyllabusImage(e.target.files[0]);
                setSyllabusText(""); // Disable text if file is selected
              }}
              disabled={!!syllabusText.trim()}
            />
            {syllabusImage && (
              <button
                className="absolute top-12 right-4 text-red-500 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
                onClick={handleClearFile}
                aria-label="Clear syllabus image"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Or Syllabus Text:</label>
            <textarea
              placeholder="Type the syllabus here"
              rows={3}
              className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              disabled={!!syllabusImage}
            ></textarea>
          </div>
          <div className="mt-4">
            <Button onClick={handleGenerateQuestions} loading={loadingQuestion}>
              Generate
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="col-span-1 md:col-span-2 p-6 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Evaluate Performance</h2>

          <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
            <div className="relative flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Image:</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                onChange={(e) => setQuestionImage(e.target.files ? e.target.files[0] : null)}
              />
              {questionImage && (
                <button
                  className="absolute top-12 right-4 text-red-500 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
                  onClick={() => setQuestionImage(null)}
                  aria-label="Clear question image"
                >
                  <FaTimes />
                </button>
              )}
              <p className="mt-2 text-sm text-gray-700">
                <strong>Question Image:</strong> {questionImage ? questionImage.name : "No file selected."}
              </p>
            </div>

            <div className="relative flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer Image:</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                onChange={(e) => setAnswerImage(e.target.files ? e.target.files[0] : null)}
              />
              {answerImage && (
                <button
                  className="absolute top-12 right-4 text-red-500 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
                  onClick={() => setAnswerImage(null)}
                  aria-label="Clear answer image"
                >
                  <FaTimes />
                </button>
              )}
              <p className="mt-2 text-sm text-gray-700">
                <strong>Answer Image:</strong> {answerImage ? answerImage.name : "No file selected."}
              </p>
            </div>
          </div>

          {questionImage && answerImage && (
            <div className="mb-6">
              <Button onClick={handleEvaluatePerformance} loading={evaluating}>
                Evaluate
              </Button>
            </div>
          )}

          {evaluationResult && (
            <motion.div
              className="mt-4 p-6 bg-gradient-to-tr from-green-100 to-green-50 rounded-md text-gray-800 border border-green-300 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-green-700 mb-4">Evaluation Result</h3>
              
              <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
                <div className="flex-1">
                  <p className="font-semibold mb-2">Question Image:</p>
                  {questionImagePreview && (
                    <img
                      src={questionImagePreview}
                      alt="Question Uploaded"
                      className="w-full h-auto rounded-md shadow-sm border border-gray-300"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold mb-2">Answer Image:</p>
                  {answerImagePreview && (
                    <img
                      src={answerImagePreview}
                      alt="Answer Uploaded"
                      className="w-full h-auto rounded-md shadow-sm border border-gray-300"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">{evaluationResult}</p>

              {evaluationScore !== null && (
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800">Score:</p>
                  <span className="ml-3 px-4 py-2 bg-green-500 text-white text-xl font-bold rounded-full shadow">
                    {evaluationScore}/10
                  </span>
                </div>
              )}
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
