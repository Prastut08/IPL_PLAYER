import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mic, TrendingUp, Cpu, History, BrainCircuit, Activity } from 'lucide-react';
import ContextBar from './ContextBar';
import ConversationalPanel from './ConversationalPanel';
import QuestionMetrics from './QuestionMetrics';
import DecisionFlow from './DecisionFlow';

const AdaptiveEngine = () => {
  const [history, setHistory] = useState([]);
  const [currentStrategy, setCurrentStrategy] = useState("Broad Candidate Filtering");
  const [metrics, setMetrics] = useState({
    gain: 0,
    entropy: 1.0,
    efficiency: 0
  });
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [aiComment, setAiComment] = useState("Analyzing the field...");

  const handleResponse = (answer, question) => {
    const newHistory = [...history, { question: question.text, answer }];
    setHistory(newHistory);
    
    // Simulate Strategy Adaptation
    if (newHistory.length > 2) {
      setCurrentStrategy("Niche Attribute Deduction");
      setAiComment("That narrows it down. Let's dig deeper into the stats.");
    } else if (newHistory.length > 5) {
      setCurrentStrategy("Franchise Context Search");
      setAiComment("I have a few suspects in mind. Testing the team logic.");
    }

    // Update Metrics
    setMetrics({
      gain: Math.random() * 40 + 20,
      entropy: Math.max(metrics.entropy - 0.15, 0.12),
      efficiency: Math.random() * 20 + 75
    });
  };

  return (
    <section className="adaptive-engine">
      <div className="adaptive-container">
        
        <ContextBar 
          history={history} 
          strategy={currentStrategy} 
        />

        <div className="conversational-panel">
          <ConversationalPanel 
            comment={aiComment} 
            onResponse={handleResponse} 
          />
          
          <aside className="metrics-sidebar">
            <QuestionMetrics metrics={metrics} />
            <DecisionFlow history={history} />
          </aside>
        </div>

        <div className="voice-controls container">
          <div className="voice-wrapper">
            <button 
              className={`voice-button ${isVoiceActive ? 'active' : ''}`}
              onClick={() => setIsVoiceActive(!isVoiceActive)}
            >
              <Mic size={24} className={isVoiceActive ? 'text-accent-cyan' : ''} />
            </button>
            {isVoiceActive && <VoiceWaveform />}
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .adaptive-engine {
          min-height: 100vh;
          background: radial-gradient(circle at top right, rgba(34, 211, 238, 0.05), transparent), var(--bg-dark);
          padding-top: 4rem;
        }
        .voice-controls {
          display: flex;
          justify-content: center;
          padding: 2rem 0;
        }
        .voice-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
      `}</style>
    </section>
  );
};

const VoiceWaveform = () => (
  <div className="waveform-container">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="waveform-bar"
        animate={{ height: ['20%', '80%', '40%', '100%', '20%'] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

export default AdaptiveEngine;
