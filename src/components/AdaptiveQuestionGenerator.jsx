import React, { useState, useEffect } from 'react';
import AdaptiveQuestionPanel from './AdaptiveQuestionPanel';
import ContextAwarenessPanel from './ContextAwarenessPanel';
import QuestionIntelligenceMeter from './QuestionIntelligenceMeter';
import CategoryAdaptation from './CategoryAdaptation';
import AIPersonalityLayer from './AIPersonalityLayer';
import AdaptiveFlowVisualization from './AdaptiveFlowVisualization';
import '../styles/adaptive-questions.css';

// Comprehensive question bank
const ADAPTIVE_QUESTIONS = {
  initial: [
    "Is your player known for explosive finishing?",
    "Does your player primarily bat in the top order?",
    "Is your player an all-rounder?",
  ],
  batting: [
    "Has your player scored more than 1000 IPL runs?",
    "Is your player known for aggressive batting style?",
    "Does your player often bat in the middle order?",
    "Is your player from a traditional cricket nation?",
  ],
  bowling: [
    "Does your player bowl fast deliveries?",
    "Has your player taken more than 50 IPL wickets?",
    "Does your player bowl during death overs?",
    "Is your player primarily a pace bowler?",
  ],
  allround: [
    "Is your player more valuable for batting?",
    "Has your player captained an IPL franchise?",
    "Does your player bat in the middle order?",
    "Is your player from an overseas nation?",
  ],
  captaincy: [
    "Has your player won an IPL title as captain?",
    "Is your player known for aggressive captaincy?",
    "Has your player led their team for multiple seasons?",
  ],
  recent: [
    "Has your player played in recent IPL seasons?",
    "Is your player still actively playing?",
    "Has your player won any awards recently?",
  ],
};

const CATEGORIES = ['Team History', 'Batting Style', 'Bowling Role', 'IPL Awards', 'Captaincy', 'Nationality', 'Match Situations'];

const AdaptiveQuestionGenerator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(
    "Is your player known for explosive finishing?"
  );
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [answers, setAnswers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Team History');
  const [contextReasoning, setContextReasoning] = useState('');
  const [adaptiveStrategy, setAdaptiveStrategy] = useState('');

  // Question effectiveness metrics
  const [metrics, setMetrics] = useState({
    effectiveness: 78,
    gain: 65,
    entropy: 72,
    confidence: 83,
  });

  const reasoning_templates = [
    "Filtering overseas batsmen... Found 32 matches. Narrowing by left-hand batting style.",
    "Cross-referencing captaincy history with recent IPL performances... 12 candidates remain.",
    "Analyzing death-over bowling statistics... Shifted focus to pace bowlers.",
    "Processing defensive batting patterns... Identified all-rounders subset.",
    "Comparing team franchise history with current roster... Eliminated 15 players.",
  ];

  const strategy_templates = [
    "Analyzing player batting profiles and recent IPL performance metrics...",
    "Shifting focus toward overseas batting all-rounders...",
    "Examining captaincy records and team leadership patterns...",
    "Analyzing death-over bowling specialists...",
    "Processing defensive batting metrics and team history...",
  ];

  // Adaptive question selection based on answers
  const selectNextQuestion = (answerCount) => {
    let questionSet = ADAPTIVE_QUESTIONS.initial;

    if (answerCount >= 2) {
      const randomCategory = Math.random();
      if (randomCategory < 0.3) questionSet = ADAPTIVE_QUESTIONS.batting;
      else if (randomCategory < 0.6) questionSet = ADAPTIVE_QUESTIONS.bowling;
      else questionSet = ADAPTIVE_QUESTIONS.allround;
    }

    if (answerCount >= 5) {
      questionSet = Math.random() < 0.5 
        ? ADAPTIVE_QUESTIONS.captaincy 
        : ADAPTIVE_QUESTIONS.recent;
    }

    const selectedIndex = answerCount % questionSet.length;
    return questionSet[selectedIndex];
  };

  // Handle user response
  const handleResponse = (response) => {
    setIsThinking(true);
    const newAnswers = [...answers, response];
    setAnswers(newAnswers);

    // Simulate AI thinking delay
    setTimeout(() => {
      const newQuestion = selectNextQuestion(newAnswers.length);
      const newCategory = CATEGORIES[newAnswers.length % CATEGORIES.length];
      
      setCurrentQuestion(newQuestion);
      setQuestionNumber(prev => Math.min(prev + 1, totalQuestions));
      setActiveCategory(newCategory);
      
      // Update reasoning and strategy
      setContextReasoning(
        reasoning_templates[newAnswers.length % reasoning_templates.length]
      );
      setAdaptiveStrategy(
        strategy_templates[newAnswers.length % strategy_templates.length]
      );

      // Animate typing effect
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);

      // Update metrics with slight variations
      setMetrics({
        effectiveness: Math.max(60, Math.min(95, 78 + (Math.random() - 0.5) * 20)),
        gain: Math.max(50, Math.min(90, 65 + (Math.random() - 0.5) * 20)),
        entropy: Math.max(55, Math.min(88, 72 + (Math.random() - 0.5) * 20)),
        confidence: Math.max(70, Math.min(95, 83 + (Math.random() - 0.5) * 15)),
      });

      setIsThinking(false);
    }, 1500);
  };

  const handleReset = () => {
    setCurrentQuestion(selectNextQuestion(0));
    setQuestionNumber(1);
    setAnswers([]);
    setIsTyping(false);
    setActiveCategory('Team History');
    setContextReasoning('');
    setAdaptiveStrategy('');
    setMetrics({
      effectiveness: 78,
      gain: 65,
      entropy: 72,
      confidence: 83,
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Main Question Panel */}
      <AdaptiveQuestionPanel
        question={currentQuestion}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        isTyping={isTyping}
        onQuestionChange={handleResponse}
      />

      {/* Left Side - Intelligence Meter */}
      <QuestionIntelligenceMeter
        questionEffectiveness={Math.floor(metrics.effectiveness)}
        informationGain={Math.floor(metrics.gain)}
        entropyReduction={Math.floor(metrics.entropy)}
        confidenceIncrease={Math.floor(metrics.confidence)}
      />

      {/* Right Side - Context Panel */}
      <ContextAwarenessPanel
        answers={answers}
        reasoning={contextReasoning}
        adaptiveStrategy={adaptiveStrategy}
      />

      {/* Category Pills */}
      <CategoryAdaptation
        activeCategory={activeCategory}
        answerCount={answers.length}
      />

      {/* AI Personality Bubble */}
      <AIPersonalityLayer
        answerCount={answers.length}
        isThinking={isThinking}
      />

      {/* Flow Visualization */}
      <AdaptiveFlowVisualization questionHistory={answers} />

      {/* Reset Button - Hidden initially but available for demo */}
      {answers.length >= 5 && (
        <button
          onClick={handleReset}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '12px 24px',
            background: 'rgba(0, 217, 255, 0.1)',
            border: '2px solid var(--neon-cyan)',
            borderRadius: '12px',
            color: 'var(--neon-cyan)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            zIndex: 100,
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.4)';
            e.target.style.borderColor = 'var(--neon-gold)';
            e.target.style.color = 'var(--neon-gold)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = 'none';
            e.target.style.borderColor = 'var(--neon-cyan)';
            e.target.style.color = 'var(--neon-cyan)';
          }}
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default AdaptiveQuestionGenerator;
