import React, { useState, useEffect } from "react";
import { generateQuestions, predictPlayer } from "../utils/groqAPI";
import { updateUserStats, addPredictionRecord, getUserRank } from "../utils/firebaseUserUtils";
import { useAuth } from "../utils/useAuth";
import AfterGamePopup from "./AfterGamePopup";
import "./PredictionGame.css";

const PredictionGame = ({ onClose }) => {
  const { user } = useAuth();
  const [stage, setStage] = useState("loading"); // loading, questions, result
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load questions when component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    const result = await generateQuestions();
    if (result.success) {
      setQuestions(result.questions);
      setStage("questions");
    } else {
      setError("Failed to load questions: " + result.error);
      setQuestions(result.questions); // Use fallback
      setStage("questions");
    }
    setLoading(false);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [
      ...answers,
      {
        question: questions[currentQuestionIndex].question,
        answer,
      },
    ];
    setAnswers(newAnswers);

    // Move to next question or predict
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, predict player
      predictPlayerNow(newAnswers);
    }
  };

  const predictPlayerNow = async (answers) => {
    setLoading(true);
    setError(null);
    const result = await predictPlayer(answers);
    if (result.success) {
      setPrediction(result.prediction);
      setStage("result");

      // Update user stats and add prediction record in Firestore
      if (user) {
        try {
          const stats = await updateUserStats(user.uid, 10, true); // Award 10 XP
          await addPredictionRecord(user.uid, {
            prediction: result.prediction.playerName,
            confidence: result.prediction.confidence,
            xp: 10,
            answers,
          });

          const rankRes = await getUserRank(user.uid);
          if (rankRes.success) setUserRank(rankRes.rank);
        } catch (e) {
          console.warn('Error saving leaderboard data:', e);
        }
      }
    } else {
      setError("Failed to predict player: " + result.error);
    }
    setLoading(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setPrediction(null);
    loadQuestions();
  };

  if (stage === "loading") {
    return (
      <div className="game-container">
        <div className="game-card">
          <h2>Loading Game...</h2>
          <div className="spinner"></div>
          <p>{error ? error : "Generating questions..."}</p>
          {error && (
            <button onClick={loadQuestions} className="retry-btn">
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (stage === "questions") {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="game-container">
        <div className="game-card">
          <div className="game-header">
            <h2>🎮 Guess The Player</h2>
            <button onClick={onClose} className="close-btn">✕</button>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length} • {Math.round(progress)}% Complete
          </p>

          <div className="question-container">
            <h3>{currentQuestion?.question}</h3>
          </div>

          <div className="answer-buttons mcq">
            {currentQuestion?.options && currentQuestion.options.length === 4 ? (
              currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className={`answer-btn option-btn option-${idx}`}
                  disabled={loading}
                >
                  {String.fromCharCode(65 + idx)}) {opt}
                </button>
              ))
            ) : (
              // Fallback to simple choices if options are missing
              <>
                <button onClick={() => handleAnswer("Yes")} className="answer-btn yes-btn" disabled={loading}>✓ Yes</button>
                <button onClick={() => handleAnswer("Maybe")} className="answer-btn maybe-btn" disabled={loading}>? Maybe</button>
                <button onClick={() => handleAnswer("No")} className="answer-btn no-btn" disabled={loading}>✕ No</button>
              </>
            )}
          </div>

          {loading && <div className="spinner"></div>}
        </div>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <AfterGamePopup
        prediction={prediction}
        user={user}
        userRank={userRank}
        xpAwarded={10}
        onPlayAgain={handleRestart}
        onClose={onClose}
      />
    );
  }
};

export default PredictionGame;
