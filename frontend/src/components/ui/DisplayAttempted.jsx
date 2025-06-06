import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

export const DisplayAttempted = ({ problem, sourceCode, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const languageLowercase = language?.toLowerCase();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger */}
      <div
        onClick={openModal}
        className="cursor-pointer bg-base-100 border border-base-300 rounded-md p-3 my-2 hover:shadow-md transition"
      >
        <div className="flex justify-between items-center font-semibold">
          <span>{problem}</span>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
            {language}
          </span>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Box */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-base-100 rounded-xl shadow-2xl w-[90%] max-w-3xl relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center bg-base-200 px-4 py-3 border-b">
                  <h2 className="text-base font-semibold">{problem}</h2>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                    {language}
                  </span>
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-3 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Code */}
                <div className="max-h-[70vh] overflow-auto p-4">
                  <SyntaxHighlighter
                    language={languageLowercase}
                    style={oneDark}
                    customStyle={{ borderRadius: "0.5rem", padding: "1rem" }}
                  >
                    {sourceCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
