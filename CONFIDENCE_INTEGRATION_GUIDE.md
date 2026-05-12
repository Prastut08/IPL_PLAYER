# 🔗 Feature 3: Confidence System Integration Guide

## How to Integrate AI Confidence System into Your Project

---

## 📋 Prerequisites

- React 18+ with Hooks support
- Vite or similar build tool
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Basic understanding of React components

---

## 🔌 Installation Steps

### Step 1: Copy Component Files
Copy all 8 components to your `src/components/` directory:
```
src/components/
├── AIConfidenceSystem.jsx
├── AIConfidenceMeter.jsx
├── ProbabilityRankingPanel.jsx
├── NeuralReasoningViz.jsx
├── ConfidenceTimeline.jsx
├── FinalPredictionReveal.jsx
├── ReasoningBreakdown.jsx
└── PredictionFeedback.jsx
```

### Step 2: Copy CSS File
Copy styling to your `src/styles/` directory:
```
src/styles/
└── confidence-meter.css
```

### Step 3: Import in Main App
In your `App.jsx`:
```jsx
import AIConfidenceSystem from './components/AIConfidenceSystem';
import './styles/confidence-meter.css'; // If not auto-imported
```

### Step 4: Add Component to JSX
```jsx
function App() {
  const [activeFeature, setActiveFeature] = useState('engine');

  return (
    <>
      <Navbar />
      <main>
        {activeFeature === 'confidence' && <AIConfidenceSystem />}
      </main>
      <Footer />
    </>
  );
}
```

---

## 🎯 Component Props Reference

### AIConfidenceSystem
No required props - orchestrator manages everything internally.

```jsx
<AIConfidenceSystem />
```

**Optional Props** (for advanced usage):
```jsx
<AIConfidenceSystem
  initialConfidence={0}
  targetConfidence={85}
  animationSpeed="normal" // 'slow' | 'normal' | 'fast'
/>
```

### AIConfidenceMeter
```jsx
<AIConfidenceMeter 
  confidence={75} // 0-100
/>
```

**Props**:
- `confidence` (number): Current confidence percentage
- `mode` (string): 'exploration' | 'narrowing' | 'prediction' (auto-set based on confidence)

### ProbabilityRankingPanel
```jsx
<ProbabilityRankingPanel 
  players={[
    { id: 1, name: 'Player Name', role: 'Batsman', emoji: '🏏', team: 'RCB', probability: 78, meta: ['Tag1', 'Tag2'] }
  ]}
/>
```

**Required Props**:
- `players` (array): Array of player objects with structure above

### NeuralReasoningViz
```jsx
<NeuralReasoningViz 
  reasoning={[
    { label: 'Category', value: 'Description', confidence: 92 }
  ]}
/>
```

**Required Props**:
- `reasoning` (array): Array of reasoning items

### ConfidenceTimeline
```jsx
<ConfidenceTimeline 
  timelineData={[
    { question: 'Q1', confidence: 18 },
    { question: 'Q2', confidence: 35 }
  ]}
/>
```

**Required Props**:
- `timelineData` (array): Array of { question, confidence }

### FinalPredictionReveal
```jsx
<FinalPredictionReveal 
  playerName="Virat Kohli"
  playerEmoji="🏏"
  confidence={85}
  onCorrect={handleCorrect}
  onWrong={handleWrong}
/>
```

**Required Props**:
- `playerName` (string): Name of predicted player
- `playerEmoji` (string): Emoji representing player
- `confidence` (number): Confidence percentage
- `onCorrect` (function): Callback when "Correct" clicked
- `onWrong` (function): Callback when "Wrong" clicked

### ReasoningBreakdown
```jsx
<ReasoningBreakdown />
```

**Optional Props**:
- `factors` (array): Custom breakdown factors (uses defaults if not provided)

### PredictionFeedback
```jsx
<PredictionFeedback 
  isWrong={true}
  onSubmitFeedback={(playerName) => console.log(playerName)}
/>
```

**Props**:
- `isWrong` (boolean): Show wrong prediction feedback
- `onSubmitFeedback` (function): Callback with submitted player name

---

## 🔄 State Management Pattern

### Confidence Building Flow
```jsx
// 1. Initialize state
const [confidence, setConfidence] = useState(0);

// 2. Simulate confidence growth
useEffect(() => {
  const interval = setInterval(() => {
    setConfidence(prev => prev + Math.random() * 3);
  }, 1000);
  return () => clearInterval(interval);
}, []);

// 3. Trigger prediction when ready
useEffect(() => {
  if (confidence >= 80) {
    setShowPrediction(true);
  }
}, [confidence]);
```

### Feedback Processing Flow
```jsx
// Handle user feedback
const handleCorrect = () => {
  // Show victory screen
  setFeedbackType('correct');
};

const handleWrong = () => {
  // Ask for actual player name
  setFeedbackType('wrong');
};

// Process feedback
const handleFeedbackSubmit = (playerName) => {
  // Train AI with new data
  updateAIModel(playerName);
  // Reset for new game
  resetGame();
};
```

---

## 🎨 CSS Customization

### Override Color Scheme
In your own CSS file:
```css
:root {
  --neon-gold: #FFD700;
  --neon-cyan: #00D9FF;
  --neon-blue: #0099FF;
  --neon-purple: #A020F0;
  --accent-green: #00FF88;
  --bg-primary: #0A0E1F;
  --bg-secondary: #1A1F3A;
  --text-primary: #E8E9F3;
  --text-secondary: #A0A8C5;
}
```

### Modify Animation Speeds
Override in your CSS:
```css
@keyframes pulseConfidence {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Adjust Component Sizes
```css
.confidence-meter {
  width: 400px; /* Change from default */
  height: 400px;
}

.ranking-panel {
  width: 320px; /* Adjust sidebar width */
}
```

---

## 🚀 Advanced Integration Patterns

### Pattern 1: Custom Data Source
```jsx
import AIConfidenceSystem from './components/AIConfidenceSystem';

function MyPage() {
  const [playerDatabase, setPlayerDatabase] = useState([]);

  useEffect(() => {
    // Fetch from API
    fetchPlayersFromAPI().then(setPlayerDatabase);
  }, []);

  return <AIConfidenceSystem players={playerDatabase} />;
}
```

### Pattern 2: Confidence Callbacks
```jsx
<AIConfidenceSystem 
  onConfidenceChange={(confidence) => {
    console.log('Confidence:', confidence);
    // Update analytics, send to backend, etc.
  }}
  onPredictionMade={(prediction) => {
    console.log('Prediction:', prediction);
    // Save to database
  }}
/>
```

### Pattern 3: External State Management
```jsx
// Using Redux or Zustand
const { confidence, players, feedback } = useAppState();

return (
  <AIConfidenceSystem 
    initialConfidence={confidence}
    players={players}
    onFeedback={(feedback) => updateAppState(feedback)}
  />
);
```

### Pattern 4: Analytics Tracking
```jsx
const handlePredictionMade = (playerName) => {
  // Track prediction
  analytics.trackEvent('prediction_made', {
    player: playerName,
    confidence: confidence,
    timestamp: Date.now()
  });
};
```

---

## 🔗 API Integration Example

### Fetching Players from Backend
```jsx
useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/ipl-players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };

  fetchPlayers();
}, []);
```

### Sending Feedback to Backend
```jsx
const handleFeedbackSubmit = async (playerName) => {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        predictedPlayer: previousPrediction,
        actualPlayer: playerName,
        confidence: confidence,
        timestamp: Date.now()
      })
    });
    const result = await response.json();
    // Process result
  } catch (error) {
    console.error('Failed to submit feedback:', error);
  }
};
```

---

## 🧪 Testing Integration

### Unit Test Example (Jest)
```jsx
import { render, screen } from '@testing-library/react';
import AIConfidenceMeter from './AIConfidenceMeter';

test('displays confidence percentage', () => {
  render(<AIConfidenceMeter confidence={75} />);
  expect(screen.getByText('75%')).toBeInTheDocument();
});
```

### Integration Test Example
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import AIConfidenceSystem from './AIConfidenceSystem';

test('shows prediction after confidence reaches 80%', async () => {
  render(<AIConfidenceSystem />);
  await waitFor(() => {
    expect(screen.getByText(/Ready for Prediction/i)).toBeInTheDocument();
  }, { timeout: 10000 });
});
```

---

## 📱 Responsive Integration

### Mobile-First Approach
```jsx
<AIConfidenceSystem 
  layout="mobile" // 'mobile' | 'tablet' | 'desktop'
  compactMode={window.innerWidth < 768}
/>
```

### Handling Different Screen Sizes
```jsx
const [screenSize, setScreenSize] = useState('desktop');

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) setScreenSize('mobile');
    else if (window.innerWidth < 1024) setScreenSize('tablet');
    else setScreenSize('desktop');
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

return <AIConfidenceSystem layout={screenSize} />;
```

---

## ⚡ Performance Optimization

### Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const AIConfidenceSystem = lazy(() => 
  import('./components/AIConfidenceSystem')
);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AIConfidenceSystem />
    </Suspense>
  );
}
```

### Memoization
```jsx
import { memo } from 'react';

const MemoizedMeter = memo(AIConfidenceMeter);
const MemoizedPanel = memo(ProbabilityRankingPanel);
```

### Lazy Animation Start
```jsx
useEffect(() => {
  if (!isVisible) return; // Don't animate if off-screen
  
  const animation = setInterval(() => {
    updateConfidence();
  }, 1000);

  return () => clearInterval(animation);
}, [isVisible]);
```

---

## 🐛 Troubleshooting

### CSS Not Applying
**Problem**: Styles not showing
**Solution**: Ensure CSS file imported:
```jsx
import '../styles/confidence-meter.css';
```

### Animations Laggy
**Problem**: Low FPS performance
**Solution**: 
- Reduce number of animations
- Use `will-change` CSS property
- Check browser performance profiler
- Reduce animation complexity

### Components Not Updating
**Problem**: State not changing
**Solution**: Check if components use `useState` and `useEffect` correctly

### Confidence Not Building
**Problem**: Meter stuck at 0%
**Solution**: Check interval and state update logic in orchestrator

---

## 📚 Related Documentation

- [Main README](./AI_CONFIDENCE_SYSTEM_README.md)
- [Testing Guide](./CONFIDENCE_TESTING_GUIDE.md)
- [Visual Reference](./CONFIDENCE_VISUAL_REFERENCE.md)
- [File Checklist](./CONFIDENCE_FILE_CHECKLIST.md)

---

## 🎯 Common Use Cases

### Use Case 1: Live Quiz Show
```jsx
// Real-time confidence building with live updates
<AIConfidenceSystem 
  liveMode={true}
  updateInterval={500}
/>
```

### Use Case 2: Offline Game
```jsx
// Pre-loaded data, no API calls
<AIConfidenceSystem 
  players={staticPlayerList}
  offlineMode={true}
/>
```

### Use Case 3: Tournament Selector
```jsx
// Select between different tournaments
<AIConfidenceSystem 
  tournament="IPL2026"
  year={2026}
/>
```

---

**Status**: ✅ Integration Ready

*Seamlessly integrate the AI Confidence System into any React project!* 🚀
