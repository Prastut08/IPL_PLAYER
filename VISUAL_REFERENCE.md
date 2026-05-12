# Feature 2: Visual Reference & Quick Guide

## 🎨 Component Layout

```
┌─────────────────────────────────────────────────────────┐
│                    APP HEADER/NAVBAR                     │
├──────────────┬─────────────────────────┬─────────────────┤
│              │                         │                 │
│  LEFT METER  │   MAIN QUESTION PANEL   │  RIGHT CONTEXT  │
│              │                         │                 │
│  • Effective │  ╔═══════════════════╗  │  • Timeline     │
│  • Information│  ║ CricketMind AI    ║  │  • Reasoning    │
│  • Entropy   │  ║ Analysis          ║  │  • Strategy     │
│  • Confidence│  ║ ───────────────── ║  │                 │
│              │  ║ Your question     ║  │  ┌───────────┐  │
│              │  ║ goes here...      ║  │  │ Answer 1  │  │
│  ┌─────────┐ │  ║ (with typing)     ║  │  │ Answer 2  │  │
│  │ 78% ◯   │ │  ║                   ║  │  │ Answer 3  │  │
│  └─────────┘ │  ║ YES NO MAYBE SKIP ║  │  │ Reasoning │  │
│              │  ║                   ║  │  └───────────┘  │
│              │  ║ Q: 1 of 20        ║  │                 │
│              │  ╚═══════════════════╝  │                 │
│              │                         │                 │
├──────────────┴──────────────────────────┴─────────────────┤
│                  CATEGORY PILLS                           │
│  [TEAM] [BATTING] [BOWLING] [AWARDS] [CAPTAINCY] [...]   │
├────────────────────────────────────────────────────────────┤
│                     FLOW VISUALIZATION                     │
│                       (Q Nodes)                            │
│                                                            │
│                   AI PERSONALITY BUBBLE                    │
│              "Interesting... Shifting focus..."            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎭 Component Hierarchy

```
AdaptiveQuestionGenerator
│
├── Particle Background (8 particles)
├── Neural Scan Layer
│
├── AdaptiveQuestionPanel
│   ├── AI Indicator (pulsing dot)
│   ├── Question Text (with typing)
│   └── Response Buttons (4 options)
│
├── QuestionIntelligenceMeter (Left)
│   ├── 4 Progress Bars
│   └── Circular Score
│
├── ContextAwarenessPanel (Right)
│   ├── Context Timeline
│   └── Reasoning Display
│
├── CategoryAdaptation
│   └── 7 Category Pills
│
├── AIPersonalityLayer
│   └── Commentary Bubble
│
└── AdaptiveFlowVisualization
    └── SVG Flow Diagram
```

---

## 📊 Color Usage Guide

### Primary Interaction
```
Component                 Color      Hex       Usage
────────────────────────────────────────────────────────
Primary Glow             Cyan       #00D9FF   Main UI, active state
Primary Text             Light      #E8E9F3   Main content
Background               Dark Navy  #0A0E27   Page background
Panel Background         Dark Blue  #1A1F3A   Cards, containers
```

### Secondary Interaction
```
Component                 Color      Hex       Usage
────────────────────────────────────────────────────────
Secondary Glow           Blue       #0099FF   Hover, alternate
Secondary Text           Gray       #A0A8C5   Meta, secondary info
Accent Highlight         Gold       #FFD700   Hover states, special
Emphasis Color           Purple     #A020F0   Reasoning, special
```

---

## ✨ Animation Reference

### Question Text Animation
```
Duration: Variable (typing speed)
Pattern: Letter by letter reveal
Effect: Cursor blink at end
Usage: On question display
```

### Glow Pulse
```
Duration: 3 seconds
Pattern: Shadow intensity increases then decreases
Effect: Breathing glow effect
Usage: Active question panel
```

### Neon Border
```
Duration: Continuous
Pattern: Cyan → Blue → Cyan cycle
Effect: Color shifting border
Usage: Intelligence meter
```

### Floating Particles
```
Duration: 6-9 seconds (varies)
Pattern: Up + horizontal movement
Effect: Organic particle drift
Usage: Background decoration
```

### Button Ripple
```
Duration: 0.6 seconds
Pattern: Expanding circle from click point
Effect: Water droplet ripple
Usage: On button click
```

### Typing Indicator
```
Duration: 1.4 seconds (total loop)
Pattern: Dot 1 → Dot 2 → Dot 3 → repeat
Delay: 0.2s between each dot
Usage: AI thinking state
```

---

## 🎮 Interactive States Reference

### Button States

**Normal**
```
Background: rgba(0, 217, 255, 0.1)
Border: 2px solid #00D9FF
Color: #00D9FF
```

**Hover**
```
Background: rgba(0, 217, 255, 0.15)
Border: 2px solid #FFD700
Color: #FFD700
Transform: translateY(-3px)
Shadow: 0 0 20px rgba(255, 215, 0, 0.4)
```

**Active**
```
Background: rgba(0, 217, 255, 0.2)
Border: 2px solid #00D9FF
Color: #00D9FF
Shadow: Ripple animation
```

### Category Pill States

**Normal**
```
Background: rgba(0, 217, 255, 0.05)
Border: 1px solid rgba(0, 217, 255, 0.2)
Color: #A0A8C5
Opacity: 1
```

**Active**
```
Background: rgba(0, 217, 255, 0.2)
Border: 1px solid #00D9FF
Color: #00D9FF
Shadow: 0 0 15px rgba(0, 217, 255, 0.4)
Animation: glowPulse 2s infinite
```

**Faded**
```
Opacity: 0.3
Pointer: none
```

---

## 📱 Responsive Breakpoints

### Desktop (>1400px)
- Left Meter: Fixed right position
- Right Context: Fixed left position
- Question Panel: Centered max-width
- Flow: Fixed bottom-left
- Particles: 8 (full effect)

### Laptop (1024px-1400px)
- Left Meter: Adjusted width
- Right Context: Adjusted width
- Question Panel: Responsive
- Flow: Still positioned fixed

### Tablet (768px-1024px)
- Sidebars: Stack vertically
- Question: Takes full width
- Flow: Below main panel
- Category Pills: Wrapped

### Mobile (<768px)
- Single column layout
- Full-width components
- Adjusted font sizes
- Simplified metrics
- Particles: Reduced to 4

---

## 🔧 Component Props Reference

### AdaptiveQuestionGenerator
```jsx
// No required props (self-contained)
// Future props available:
// - maxQuestions: number
// - questionBank: object
// - onGameComplete: function
// - playerDatabase: array
```

### AdaptiveQuestionPanel
```jsx
Props:
- question: string (required)
- questionNumber: number (required)
- totalQuestions: number (required)
- isTyping: boolean (default: false)
- onQuestionChange: function (required)
```

### ContextAwarenessPanel
```jsx
Props:
- answers: array (default: [])
- reasoning: string (default: '')
- adaptiveStrategy: string (default: '')
```

### QuestionIntelligenceMeter
```jsx
Props:
- questionEffectiveness: number (0-100)
- informationGain: number (0-100)
- entropyReduction: number (0-100)
- confidenceIncrease: number (0-100)
```

### CategoryAdaptation
```jsx
Props:
- activeCategory: string (required)
- answerCount: number (required)
```

### AIPersonalityLayer
```jsx
Props:
- answerCount: number (default: 0)
- isThinking: boolean (default: false)
```

### AdaptiveFlowVisualization
```jsx
Props:
- questionHistory: array (default: [])
```

---

## 🎯 CSS Class Reference

### Main Container
```css
.adaptive-question-container    /* Full page wrapper */
.question-panel                 /* Central question box */
.neural-scan                    /* Scan line effect */
.particle-background            /* Particle container */
```

### Panels
```css
.context-panel                  /* Right sidebar */
.intelligence-meter             /* Left sidebar */
.flow-visualization             /* Bottom left diagram */
```

### Elements
```css
.ai-indicator                   /* Status indicator */
.question-text                  /* Question display */
.response-btn                   /* Response buttons */
.category-pill                  /* Category badges */
.ai-personality-bubble          /* AI commentary */
```

### Animation Classes
```css
.typing                         /* Typing animation */
.active                         /* Active state */
.faded                          /* Faded category */
.glowPulse                      /* Pulsing glow */
.slideUp                        /* Slide up animation */
```

---

## 🎬 Animation Timing Reference

| Animation | Duration | Function | Use Case |
|-----------|----------|----------|----------|
| AI Typing | Variable | linear | Question display |
| Glow Pulse | 3s | ease-in-out | Active panel |
| Neon Border | ∞ | ∞ | Border effect |
| Float | 6-9s | linear | Particles |
| Morph | 4s | ease | Shape change |
| Ripple | 0.6s | ease-out | Button click |
| Neural Scan | 3s | linear | Background |
| Typing Dot | 1.4s | infinite | AI thinking |
| Slide Up | 0.8s | ease-out | Panel appear |
| Fade In | 0.3s | linear | Element appear |

---

## 🚀 Performance Optimization Tips

### For Lower-End Devices
1. Reduce particle count: `{...Array(4)}` instead of 8
2. Disable some animations: Remove from CSS
3. Simplify gradients: Use solid colors
4. Reduce blur effects: Lower backdrop-filter blur value

### For Better Mobile Experience
1. Increase button size: `padding: 16px 32px`
2. Simplify font sizes: Larger on mobile
3. Wider spacing: More padding
4. Larger tap targets: 44x44px minimum

### For Faster Load Times
1. Minify CSS (automatically done in build)
2. Lazy load images/assets if needed
3. Cache animations in memory
4. Use CSS transforms over position changes

---

## 🐛 Common Issues & Solutions

### Issue: Animations Stuttering
**Solution**: Check GPU acceleration in browser settings

### Issue: Text Not Typing
**Solution**: Verify `isTyping` prop is being set correctly

### Issue: Sidebars Overlapping
**Solution**: Check viewport width is > 1024px

### Issue: Colors Not Right
**Solution**: Verify CSS variables are loaded

### Issue: Buttons Not Responsive
**Solution**: Check `onQuestionChange` handler is passed

---

## 💡 Customization Examples

### Change Primary Color
```css
:root {
  --neon-cyan: #FF00FF; /* New color */
}
```

### Adjust Animation Speed
```css
@keyframes glowPulse {
  animation: glowPulse 2s ease-in-out infinite; /* Changed from 3s */
}
```

### Modify Question
```jsx
const ADAPTIVE_QUESTIONS = {
  initial: [
    "Your custom question?",
  ]
}
```

### Change Button Text
```jsx
<button className="response-btn" onClick={() => onQuestionChange('yes')}>
  Custom Text
</button>
```

---

## 📚 File Quick Links

| File | Purpose | Size |
|------|---------|------|
| AdaptiveQuestionGenerator.jsx | Main orchestrator | ~200 lines |
| AdaptiveQuestionPanel.jsx | Question display | ~60 lines |
| ContextAwarenessPanel.jsx | Context sidebar | ~50 lines |
| QuestionIntelligenceMeter.jsx | Metrics display | ~70 lines |
| CategoryAdaptation.jsx | Category pills | ~40 lines |
| AIPersonalityLayer.jsx | AI commentary | ~50 lines |
| AdaptiveFlowVisualization.jsx | Flow diagram | ~80 lines |
| adaptive-questions.css | All styling | ~1,200 lines |

---

## ✅ Verification Checklist

Before deploying, verify:

- [ ] All animations run at 60fps
- [ ] Responsive works on all sizes
- [ ] No console errors
- [ ] Buttons are clickable
- [ ] Questions change on response
- [ ] Metrics update correctly
- [ ] Context panel populates
- [ ] Categories adapt properly
- [ ] AI personality shows
- [ ] Flow diagram displays
- [ ] Colors match brand
- [ ] Text is readable
- [ ] Mobile layout works
- [ ] No accessibility issues

---

## 🎊 Success Indicators

Your feature is working correctly if:

✅ Questions appear with typing effect
✅ Metrics animate and update
✅ Context shows previous answers
✅ Categories glow and fade intelligently
✅ AI bubble shows commentary
✅ Flow diagram displays deduction
✅ Smooth 60fps animations
✅ Responsive on all devices
✅ No console errors
✅ Engaging, premium feel

---

**Quick Reference Version**: May 2026
*Keep this guide nearby during development!* 📋
