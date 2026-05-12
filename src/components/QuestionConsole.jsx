import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  { text: "Is your player a Wicket-Keeper?", category: "ROLE" },
  { text: "Has your player captained an IPL franchise?", category: "LEADERSHIP" },
  { text: "Is your player currently in the MI squad?", category: "TEAM" },
  { text: "Has your player won the Orange Cap?", category: "AWARD" },
  { text: "Is your player an overseas cricketer?", category: "NATIONALITY" }
];

const QuestionConsole = ({ step, isThinking, onAnswer }) => {
  const currentQuestion = QUESTIONS[step % QUESTIONS.length];

  return (
    <div className="reasoning-question">
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          className="question-box glass"
        >
          <div className="category-tag">{currentQuestion.category}</div>
          
          <h2 className="question-text">
            {isThinking ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Processing Neural Path...
              </motion.span>
            ) : (
              currentQuestion.text
            )}
          </h2>

          <div className="answer-grid">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => onAnswer('yes')}
              disabled={isThinking}
            >
              YES
            </button>
            <button 
              className="btn btn-outline btn-lg" 
              onClick={() => onAnswer('no')}
              disabled={isThinking}
            >
              NO
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => onAnswer('maybe')}
              disabled={isThinking}
            >
              MAYBE
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => onAnswer('unknown')}
              disabled={isThinking}
            >
              DON'T KNOW
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <style jsx="true">{`
        .btn-lg {
          padding: 1.5rem;
          font-size: 1.25rem;
          border-radius: 12px;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default QuestionConsole;
