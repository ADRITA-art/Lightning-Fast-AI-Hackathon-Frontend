export default function QuestionModal({
                        content,
                        onClose,
                      }: {
                        content: string;
                        onClose: () => void;
                      }) {
                        return (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                              <h3 className="text-lg font-bold mb-4 text-center">Generated Questions</h3>
                              {content ? (
                                <pre className="text-gray-700 whitespace-pre-wrap">{content}</pre>
                              ) : (
                                <p className="text-gray-500 text-center">No questions available.</p>
                              )}
                              <div className="flex justify-end mt-4">
                                <button
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                                  onClick={onClose}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      