import { Resend } from 'resend';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// RESEND EMAIL SERVICE
const resend = new Resend(process.env.RESEND_API_KEY);

// EMAIL TEMPLATES

export const emailTemplates = {
  /* ---------- WELCOME ---------- */
  welcome: (userName) => ({
    subject: 'Welcome to Chronos — Take Control of Your Time',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #000000;
    color: #ffffff;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background: #000000;
  }
  .hero {
    position: relative;
    padding: 60px 30px 80px;
    text-align: center;
    background: radial-gradient(ellipse at top, #1a0b2e 0%, #000000 50%);
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
    pointer-events: none;
  }
  .logo {
    position: relative;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    z-index: 1;
  }
  .hero-title {
    position: relative;
    font-size: 36px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
    z-index: 1;
  }
  .gradient-text {
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-subtitle {
    position: relative;
    font-size: 18px;
    color: #94a3b8;
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto 30px;
    z-index: 1;
  }
  .cta-button {
    position: relative;
    display: inline-block;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 16px 40px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
    transition: all 0.3s ease;
    z-index: 1;
  }
  .content-section {
    padding: 60px 30px;
    background: #000000;
  }
  .section-title {
    font-size: 32px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 50px;
    letter-spacing: -0.02em;
  }
  .features-grid {
    display: table;
    width: 100%;
    margin-bottom: 40px;
  }
  .feature-card {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  .feature-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .feature-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-right: 16px;
    flex-shrink: 0;
  }
  .feature-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .feature-description {
    font-size: 15px;
    color: #94a3b8;
    line-height: 1.6;
  }
  .stats-section {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 20px;
    padding: 40px 30px;
    margin: 40px 0;
    text-align: center;
  }
  .stats-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .stats-grid {
    display: table;
    width: 100%;
  }
  .stat-item {
    display: table-row;
  }
  .stat-value {
    display: table-cell;
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 10px;
  }
  .stat-label {
    display: table-cell;
    font-size: 14px;
    color: #94a3b8;
    padding: 10px;
  }
  .footer {
    padding: 40px 30px;
    text-align: center;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }
  .footer-text {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 15px;
  }
  .footer-links {
    margin-top: 15px;
  }
  .footer-link {
    color: #8b5cf6;
    text-decoration: none;
    font-size: 14px;
    margin: 0 10px;
  }
  @media (max-width: 600px) {
    .hero-title {
      font-size: 28px;
    }
    .section-title {
      font-size: 24px;
    }
    .feature-card {
      padding: 24px;
    }
  }
</style>
</head>
<body>
<div class="container">
  <!-- Hero Section -->
  <div class="hero">
    <div class="logo">CHRONOS</div>
    <h1 class="hero-title">
      Welcome, <span class="gradient-text">${userName}</span>! 🎉
    </h1>
    <p class="hero-subtitle">
      You've just unlocked a powerful tool to master your time, build momentum, and achieve what truly matters. Let's make every moment count.
    </p>
    <a href="${process.env.FRONTEND_URL}/dashboard" class="cta-button">
      Launch Dashboard →
    </a>
  </div>

  <!-- Features Section -->
  <div class="content-section">
    <h2 class="section-title">What You Can Do with Chronos</h2>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">⏱️</div>
          <div class="feature-title">Master Your Time</div>
        </div>
        <div class="feature-description">
          Gain crystal-clear insights into how you spend every hour. Identify patterns, eliminate time-wasters, and optimize your day for maximum productivity.
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">🎯</div>
          <div class="feature-title">Achieve Your Goals</div>
        </div>
        <div class="feature-description">
          Break down ambitious goals into actionable steps. Track progress in real-time and stay motivated as you watch your achievements stack up.
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">📈</div>
          <div class="feature-title">Build Lasting Habits</div>
        </div>
        <div class="feature-description">
          Transform intentions into routines. Our intelligent tracking helps you build consistency and maintain streaks that drive real change.
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon">🚀</div>
          <div class="feature-title">Stay Focused</div>
        </div>
        <div class="feature-description">
          Cut through distractions with focused work sessions, smart reminders, and a clean interface designed to keep you in flow state.
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stats-title">Join Thousands Who've Transformed Their Time</div>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">2,500+</div>
          <div class="stat-label">Active Users</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">50,000+</div>
          <div class="stat-label">Goals Completed</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">95%</div>
          <div class="stat-label">User Satisfaction</div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div style="text-align: center; margin-top: 50px;">
      <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Ready to Get Started?</h3>
      <p style="color: #94a3b8; margin-bottom: 30px; font-size: 16px;">
        Your dashboard is ready. Start tracking, planning, and achieving today.
      </p>
      <a href="${process.env.FRONTEND_URL}/dashboard" class="cta-button">
        Go to Dashboard →
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p class="footer-text">
      Need help getting started? Our support team is here for you.
    </p>
    <p class="footer-text">
      © ${new Date().getFullYear()} Chronos. All rights reserved.
    </p>
    <div class="footer-links">
      <a href="${process.env.FRONTEND_URL}/settings" class="footer-link">Settings</a>
      <span style="color: #334155;">•</span>
    </div>
  </div>
</div>
</body>
</html>`,
    text: `CHRONOS

Welcome, ${userName}! 🎉

You've just unlocked a powerful tool to master your time, build momentum, and achieve what truly matters. Let's make every moment count.

WHAT YOU CAN DO WITH CHRONOS

⏱️ MASTER YOUR TIME
Gain crystal-clear insights into how you spend every hour. Identify patterns, eliminate time-wasters, and optimize your day for maximum productivity.

🎯 ACHIEVE YOUR GOALS
Break down ambitious goals into actionable steps. Track progress in real-time and stay motivated as you watch your achievements stack up.

📈 BUILD LASTING HABITS
Transform intentions into routines. Our intelligent tracking helps you build consistency and maintain streaks that drive real change.

🚀 STAY FOCUSED
Cut through distractions with focused work sessions, smart reminders, and a clean interface designed to keep you in flow state.

JOIN THOUSANDS WHO'VE TRANSFORMED THEIR TIME
• 2,500+ Active Users
• 50,000+ Goals Completed
• 95% User Satisfaction

READY TO GET STARTED?
Your dashboard is ready. Start tracking, planning, and achieving today.

Launch your dashboard: ${process.env.FRONTEND_URL}/dashboard

Need help getting started? Our support team is here for you.

---
© ${new Date().getFullYear()} Chronos. All rights reserved.
Settings: ${process.env.FRONTEND_URL}/settings`,
  }),

  
  /* ---------- WEEKLY SUMMARY ---------- */
weeklySummary: (userName, completedTasks, upcomingTasks, overdueTasks, stats) => ({
  subject: '📊 Your Weekly Progress Summary — Chronos',
  html: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background: #000000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #ffffff;
  }
  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .header {
    text-align: center;
    padding: 40px 30px;
    background: radial-gradient(ellipse at top, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    border-radius: 16px 16px 0 0;
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-bottom: none;
  }
  .logo {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }
  .header-subtitle {
    font-size: 14px;
    color: #94a3b8;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .card {
    background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-top: none;
    border-radius: 0 0 16px 16px;
    padding: 40px 35px;
  }
  .greeting {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #ffffff;
    letter-spacing: -0.02em;
  }
  .intro-text {
    font-size: 16px;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 35px;
  }
  .stats-container {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 14px;
    padding: 30px 25px;
    margin: 35px 0;
  }
  .stats-grid {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .stat-item {
    display: table-cell;
    text-align: center;
    padding: 15px 10px;
    vertical-align: top;
  }
  .stat-number {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .section {
    margin-top: 35px;
    background: rgba(15, 15, 15, 0.6);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 12px;
    padding: 25px;
  }
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  }
  .section-icon {
    font-size: 24px;
    margin-right: 12px;
  }
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
  }
  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .task-item {
    font-size: 15px;
    color: #cbd5e1;
    line-height: 1.6;
    padding: 12px 0;
    border-bottom: 1px solid rgba(139, 92, 246, 0.08);
    display: flex;
    align-items: flex-start;
  }
  .task-item:last-child {
    border-bottom: none;
  }
  .task-item::before {
    content: '→';
    color: #8b5cf6;
    font-weight: 700;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .task-meta {
    color: #64748b;
    font-size: 14px;
  }
  .overdue-warning {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
  .overdue-warning .section-title {
    color: #fca5a5;
  }
  .cta-container {
    text-align: center;
    margin-top: 40px;
    padding-top: 35px;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }
  .cta-text {
    font-size: 15px;
    color: #94a3b8;
    margin-bottom: 20px;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 16px 40px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
  }
  .motivational-quote {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%);
    border-left: 3px solid #8b5cf6;
    border-radius: 8px;
    padding: 20px 25px;
    margin: 30px 0;
    font-style: italic;
    color: #e2e8f0;
    font-size: 15px;
  }
  .footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 25px;
    border-top: 1px solid rgba(139, 92, 246, 0.15);
    font-size: 13px;
    color: #64748b;
  }
  @media (max-width: 600px) {
    .stats-grid {
      display: block;
    }
    .stat-item {
      display: block;
      margin-bottom: 20px;
    }
    .stat-item:last-child {
      margin-bottom: 0;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">CHRONOS</div>
      <div class="header-subtitle">Weekly Progress Report</div>
    </div>

    <div class="card">
      <div class="greeting">Hey ${userName}! 👋</div>
      
      <p class="intro-text">
        Here's your weekly snapshot. Every task you complete brings you closer to your goals. 
        Let's review your progress and keep the momentum going.
      </p>

      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">${stats.completed}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stats.totalDue}</div>
            <div class="stat-label">Due Tasks</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${stats.completionRate}%</div>
            <div class="stat-label">Success Rate</div>
          </div>
        </div>
      </div>

      ${
        overdueTasks.length > 0
          ? `<div class="section overdue-warning">
              <div class="section-header">
                <span class="section-icon">⚠️</span>
                <span class="section-title">Needs Your Attention</span>
              </div>
              <ul class="task-list">
                ${overdueTasks
                  .map((t) => {
                    const daysOverdue = Math.floor(
                      (new Date() - new Date(t.deadline)) /
                        (1000 * 60 * 60 * 24)
                    );
                    return `<li class="task-item">
                      <span>${t.goal || 'Untitled Task'}${
                      daysOverdue > 0 
                        ? ` <span class="task-meta">• ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue</span>` 
                        : ''
                    }</span>
                    </li>`;
                  })
                  .join('')}
              </ul>
            </div>`
          : ''
      }

      ${
        upcomingTasks.length > 0
          ? `<div class="section">
              <div class="section-header">
                <span class="section-icon">📅</span>
                <span class="section-title">Coming Up Next</span>
              </div>
              <ul class="task-list">
                ${upcomingTasks
                  .map(
                    (t) =>
                      `<li class="task-item">
                        <span>${t.goal || 'Untitled Task'} <span class="task-meta">• Due ${new Date(
                        t.deadline
                      ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></span>
                      </li>`
                  )
                  .join('')}
              </ul>
            </div>`
          : ''
      }

      <div class="motivational-quote">
        "Success is the sum of small efforts repeated day in and day out." — Keep building your streak!
      </div>

      <div class="cta-container">
        <p class="cta-text">Ready to tackle your next milestone?</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" class="cta-button">
          Open Dashboard →
        </a>
      </div>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Chronos • Making every moment count</p>
      <p style="margin-top: 8px; font-size: 12px;">
        You're receiving this because you're an active Chronos user
      </p>
    </div>
  </div>
</body>
</html>`,
  text: `CHRONOS — WEEKLY PROGRESS REPORT

Hey ${userName}! 👋

Here's your weekly snapshot. Every task you complete brings you closer to your goals. Let's review your progress and keep the momentum going.

YOUR STATS THIS WEEK
━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Completed: ${stats.completed}
• Due Tasks: ${stats.totalDue}
• Success Rate: ${stats.completionRate}%

${
  overdueTasks.length > 0
    ? `⚠️ NEEDS YOUR ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━
${overdueTasks
        .map((t) => {
          const daysOverdue = Math.floor(
            (new Date() - new Date(t.deadline)) /
              (1000 * 60 * 60 * 24)
          );
          return `→ ${t.goal || 'Untitled Task'}${
            daysOverdue > 0 ? ` • ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue` : ''
          }`;
        })
        .join('\n')}

`
    : ''
}

${
  upcomingTasks.length > 0
    ? `📅 COMING UP NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━
${upcomingTasks
        .map(
          (t) =>
            `→ ${t.goal || 'Untitled Task'} • Due ${new Date(
              t.deadline
            ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        )
        .join('\n')}

`
    : ''
}

"Success is the sum of small efforts repeated day in and day out." — Keep building your streak!

Ready to tackle your next milestone?
👉 ${process.env.FRONTEND_URL}/dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━
© ${new Date().getFullYear()} Chronos • Making every moment count
You're receiving this because you're an active Chronos user`,
}),

/* ---------- TASK REMINDER ---------- */
taskReminder: (userName, task, courseName) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const courseId = task?.course || ''; 
  const taskGoal = task?.goal || 'Unnamed Task';
  const taskDeadline = task?.deadline
    ? new Date(task.deadline).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'No deadline set';

  return {
    subject: `⏳ Almost There — "${taskGoal}" is due in 5 minutes`,
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background: #000000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #ffffff;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .alert-banner {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.15) 100%);
    border: 2px solid rgba(239, 68, 68, 0.4);
    border-radius: 16px 16px 0 0;
    padding: 20px 30px;
    text-align: center;
  }
  .alert-icon {
    font-size: 48px;
    margin-bottom: 8px;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  .alert-text {
    font-size: 14px;
    color: #fca5a5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .card {
    background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
    border: 2px solid rgba(239, 68, 68, 0.4);
    border-top: none;
    border-radius: 0 0 16px 16px;
    padding: 40px 35px;
  }
  .header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  }
  .logo {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .title {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  .subtitle {
    font-size: 16px;
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  .task-card {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 25px;
    margin: 30px 0;
  }
  .task-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(239, 68, 68, 0.2);
  }
  .task-icon {
    font-size: 24px;
    margin-right: 12px;
  }
  .task-header-text {
    font-size: 16px;
    font-weight: 700;
    color: #fca5a5;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .task-details {
    display: table;
    width: 100%;
  }
  .task-row {
    display: table-row;
  }
  .task-label {
    display: table-cell;
    font-size: 14px;
    color: #64748b;
    font-weight: 600;
    padding: 10px 15px 10px 0;
    width: 80px;
  }
  .task-value {
    display: table-cell;
    font-size: 15px;
    color: #e2e8f0;
    padding: 10px 0;
    font-weight: 500;
  }
  .urgency-message {
    background: rgba(15, 15, 15, 0.6);
    border-left: 3px solid #ef4444;
    border-radius: 8px;
    padding: 20px 25px;
    margin: 25px 0;
    font-size: 15px;
    color: #cbd5e1;
    line-height: 1.6;
  }
  .urgency-message strong {
    color: #fca5a5;
  }
  .cta-container {
    text-align: center;
    margin-top: 35px;
    padding-top: 30px;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }
  .cta-label {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 16px 40px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
  }
  .timer-display {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    padding: 15px 20px;
    text-align: center;
    margin: 25px 0;
  }
  .timer-text {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .timer-label {
    font-size: 13px;
    color: #64748b;
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 25px;
    border-top: 1px solid rgba(139, 92, 246, 0.15);
    font-size: 13px;
    color: #64748b;
  }
  @media (max-width: 600px) {
    .title {
      font-size: 22px;
    }
    .task-details {
      display: block;
    }
    .task-row {
      display: block;
      margin-bottom: 12px;
    }
    .task-label, .task-value {
      display: block;
      padding: 4px 0;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="alert-banner">
      <div class="alert-icon">⏰</div>
      <div class="alert-text">Urgent: Deadline Approaching</div>
    </div>

    <div class="card">
      <div class="header">
        <div class="logo">CHRONOS</div>
      </div>

      <div class="title">Final Call: Your Task is Due Soon</div>
      
      <p class="subtitle">
        Hi ${userName || 'there'}, you have just <strong>5 minutes</strong> remaining before your deadline. 
        Time to wrap things up and submit your work.
      </p>

      <div class="timer-display">
        <div class="timer-text">⏱️ 5 Minutes</div>
        <div class="timer-label">Time Remaining</div>
      </div>

      <div class="task-card">
        <div class="task-header">
          <span class="task-icon">🎯</span>
          <span class="task-header-text">Task Details</span>
        </div>
        <div class="task-details">
          <div class="task-row">
            <div class="task-label">Task</div>
            <div class="task-value">${taskGoal}</div>
          </div>
          <div class="task-row">
            <div class="task-label">Course</div>
            <div class="task-value">${courseName || 'Unnamed Course'}</div>
          </div>
          <div class="task-row">
            <div class="task-label">Deadline</div>
            <div class="task-value">${taskDeadline}</div>
          </div>
        </div>
      </div>

      <div class="urgency-message">
        <strong>Why this matters:</strong> Meeting deadlines builds discipline and momentum. 
        Every task you complete on time strengthens your commitment to excellence. Don't let this opportunity slip away.
      </div>

      <div class="cta-container">
        <div class="cta-label">Access your course now</div>
        <a href="${frontendUrl}/courses/${courseId}" class="cta-button">
          Open Course →
        </a>
      </div>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Chronos • Making every moment count</p>
      <p style="margin-top: 8px; font-size: 12px;">
        This reminder was sent because your task deadline is approaching
      </p>
    </div>
  </div>
</body>
</html>`,
    text: `⏰ CHRONOS — URGENT DEADLINE ALERT

FINAL CALL: YOUR TASK IS DUE SOON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi ${userName || 'there'},

You have just 5 MINUTES remaining before your deadline. Time to wrap things up and submit your work.

⏱️ TIME REMAINING: 5 Minutes

🎯 TASK DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task: ${taskGoal}
Course: ${courseName || 'Unnamed Course'}
Deadline: ${taskDeadline}

WHY THIS MATTERS:
Meeting deadlines builds discipline and momentum. Every task you complete on time strengthens your commitment to excellence. Don't let this opportunity slip away.

ACCESS YOUR COURSE NOW:
👉 ${frontendUrl}/courses/${courseId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© ${new Date().getFullYear()} Chronos • Making every moment count
This reminder was sent because your task deadline is approaching`,
  };
},
};


/* ===========================
   BASE EMAIL SENDER
   =========================== */
export const sendEmail = async (to, template) => {
  if (!resend) {
    return { success: false, error: 'Resend not configured'}
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Chronos <onboarding@resend.dev>',
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Chrono',
        'List-Unsubscribe': `<${process.env.FRONTEND_URL}/settings/notifications>`,
      },
    });
    if (error) {
      console.error('Error sending email', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }
    
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/* ===========================
   EMAIL PREFERENCE CHECK
   =========================== */
export const shouldSendEmail = async (userId) => {
  try {
    const user = await User.findById(userId).select('emailNotifications');
    if (!user) return false;
    return user.emailNotifications !== false;
  } catch {
    return false;
  }
};

/* ===========================
   WRAPPERS
   =========================== */
export const sendEmailIfEnabled = async (userId, email, template) => {
  if (!(await shouldSendEmail(userId))) {
    return { success: false, reason: 'notifications_disabled' };
  }
  return sendEmail(email, template);
};

export const sendWelcomeEmail = (email, name) =>
  sendEmail(email, emailTemplates.welcome(name));

export const sendWeeklySummaryEmail = (
  userId,
  email,
  name,
  completed,
  upcoming,
  overdue,
  stats
) =>
  sendEmailIfEnabled(
    userId,
    email,
    emailTemplates.weeklySummary(
      name,
      completed,
      upcoming,
      overdue,
      stats
    )
  );

export const sendTaskReminderEmail = (
  userId,
  email,
  name,
  task,
  course
) =>
  sendEmailIfEnabled(
    userId,
    email,
    emailTemplates.taskReminder(name, task, course)
  );
