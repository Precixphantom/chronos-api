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
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #0f0f0f;
    color: #e5e5e5;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .header {
    text-align: center;
    padding: 30px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    margin-bottom: 30px;
  }
  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }
  .content {
    background-color: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    padding: 40px 30px;
    line-height: 1.6;
  }
  .greeting {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .message {
    font-size: 16px;
    color: #b4b4b4;
    margin-bottom: 15px;
  }
  .features {
    background-color: #0f0f0f;
    border-radius: 8px;
    padding: 20px;
    margin: 25px 0;
  }
  .feature-item {
    display: flex;
    align-items: start;
    margin-bottom: 15px;
  }
  .feature-icon {
    font-size: 20px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .feature-text {
    color: #d1d1d1;
    font-size: 14px;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0;
    transition: transform 0.2s;
  }
  .footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #2a2a2a;
    color: #666;
    font-size: 14px;
  }
  .footer-link {
    color: #667eea;
    text-decoration: none;
  }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1 class="logo">Chronos</h1>
  </div>
  
  <div class="content">
    <div class="greeting">Hi ${userName}! 👋</div>
    
    <p class="message">
      Welcome to Chronos! We're excited to have you here. You've just taken a powerful step toward managing your time better and staying consistent with what truly matters.
    </p>
    
    <p class="message">
      Chronos helps you plan smarter, stay focused, and make every moment count. Whether you're tracking tasks, meeting deadlines, or building productive routines, Chronos keeps you in control.
    </p>
    
    <div class="features">
      <div class="feature-item">
        <span class="feature-icon">⏱️</span>
        <span class="feature-text"><strong>Track Your Time:</strong> Understand how you spend your time with clear insights</span>
      </div>
      <div class="feature-item">
        <span class="feature-icon">🎯</span>
        <span class="feature-text"><strong>Set Clear Goals:</strong> Break tasks into manageable, achievable steps</span>
      </div>
      <div class="feature-item">
        <span class="feature-icon">📈</span>
        <span class="feature-text"><strong>Stay Consistent:</strong> Build habits that move you forward every day</span>
      </div>
    </div>
    
    <center>
      <a href="${process.env.FRONTEND_URL}/dashboard" class="cta-button">
        Go to Your Dashboard →
      </a>
    </center>
    
    <p class="message" style="margin-top: 25px;">
      If you ever need help or have questions, don’t hesitate to reach out. We’re here to help you make the most of your time.
    </p>
    
    <p class="message">
      Stay focused and keep moving forward 🚀
    </p>
  </div>
  
  <div class="footer">
    <p>© ${new Date().getFullYear()} Chronos. All rights reserved.</p>
    <p>
      <a href="${process.env.FRONTEND_URL}/settings" class="footer-link">Settings</a>
    </p>
  </div>
</div>
</body>
</html>`,
    text: `Hi ${userName}! 👋

Welcome to Chronos!

We're excited to have you here. You've just taken a powerful step toward managing your time better and staying consistent with what truly matters.

Chronos helps you plan smarter, track tasks, and stay focused on your goals.

What you can do with Chronos:
⏱️ Track Your Time: Understand how your time is spent
🎯 Set Clear Goals: Break tasks into achievable steps
📈 Stay Consistent: Build productive habits that last

Get started now:
${process.env.FRONTEND_URL}/dashboard

If you need any help, feel free to reach out. We’re here to help you make the most of your time.

Stay focused and keep moving forward 🚀

---
© ${new Date().getFullYear()} Chronos
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
  body {
    margin: 0;
    padding: 0;
    background-color: #0f0f0f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #e5e5e5;
  }
  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 30px 20px;
  }
  .card {
    background-color: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 14px;
    padding: 35px 30px;
  }
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  .logo {
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
  }
  .title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #ffffff;
  }
  .text {
    font-size: 15px;
    color: #b4b4b4;
    line-height: 1.6;
    margin-bottom: 18px;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin: 25px 0;
  }
  .stat-box {
    background-color: #0f0f0f;
    border-radius: 10px;
    padding: 18px;
    text-align: center;
  }
  .stat-number {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
  }
  .stat-label {
    font-size: 13px;
    color: #999;
    margin-top: 5px;
  }
  .section {
    margin-top: 30px;
  }
  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #ffffff;
  }
  ul {
    padding-left: 18px;
    margin: 0;
  }
  li {
    font-size: 14px;
    color: #d1d1d1;
    margin-bottom: 8px;
  }
  .cta {
    display: inline-block;
    margin-top: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
  }
  .footer {
    text-align: center;
    margin-top: 30px;
    font-size: 13px;
    color: #666;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">Chronos</div>
      </div>

      <div class="title">Your Weekly Study Summary</div>

      <p class="text">
        Hi ${userName}, here’s a snapshot of how you managed your study tasks this week.
        Consistency compounds — and every completed task matters.
      </p>

      <div class="stats">
        <div class="stat-box">
          <div class="stat-number">${stats.completed}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${stats.totalDue}</div>
          <div class="stat-label">Due Tasks</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${stats.completionRate}%</div>
          <div class="stat-label">Completion Rate</div>
        </div>
      </div>

      ${
        overdueTasks.length > 0
          ? `<div class="section">
              <div class="section-title">⚠️ Overdue Tasks</div>
              <ul>
                ${overdueTasks
                  .map((t) => {
                    const daysOverdue = Math.floor(
                      (new Date() - new Date(t.deadline)) /
                        (1000 * 60 * 60 * 24)
                    );
                    return `<li>${t.goal || 'Untitled Task'}${
                      daysOverdue > 0 ? ` — overdue by ${daysOverdue} day(s)` : ''
                    }</li>`;
                  })
                  .join('')}
              </ul>
            </div>`
          : ''
      }

      ${
        upcomingTasks.length > 0
          ? `<div class="section">
              <div class="section-title">📅 Upcoming Tasks</div>
              <ul>
                ${upcomingTasks
                  .map(
                    (t) =>
                      `<li>${t.goal || 'Untitled Task'} — due ${new Date(
                        t.deadline
                      ).toLocaleDateString()}</li>`
                  )
                  .join('')}
              </ul>
            </div>`
          : ''
      }

      <center>
        <a href="${process.env.FRONTEND_URL}/dashboard" class="cta">
          View Dashboard →
        </a>
      </center>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Chronos — Make every moment count
    </div>
  </div>
</body>
</html>`,
  text: `Hi ${userName},

Here’s your weekly progress summary from Chronos.

Completed Tasks: ${stats.completed}
Tasks Due: ${stats.totalDue}
Completion Rate: ${stats.completionRate}%

${
  overdueTasks.length > 0
    ? `Overdue Tasks:\n${overdueTasks
        .map((t) => {
          const daysOverdue = Math.floor(
            (new Date() - new Date(t.deadline)) /
              (1000 * 60 * 60 * 24)
          );
          return `• ${t.goal || 'Untitled Task'}${
            daysOverdue > 0 ? ` — overdue by ${daysOverdue} day(s)` : ''
          }`;
        })
        .join('\n')}\n`
    : ''
}

${
  upcomingTasks.length > 0
    ? `Upcoming Tasks:\n${upcomingTasks
        .map(
          (t) =>
            `• ${t.goal || 'Untitled Task'} — due ${new Date(
              t.deadline
            ).toLocaleDateString()}`
        )
        .join('\n')}\n`
    : ''
}

Review your progress:
${process.env.FRONTEND_URL}/dashboard

© ${new Date().getFullYear()} Chronos — Make every moment count`,
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
  body {
    margin: 0;
    padding: 0;
    background-color: #0f0f0f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #e5e5e5;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px 20px;
  }
  .card {
    background-color: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    padding: 30px;
  }
  .header {
    text-align: center;
    margin-bottom: 25px;
  }
  .logo {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
  }
  .title {
    font-size: 22px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 15px;
  }
  .text {
    font-size: 15px;
    color: #b4b4b4;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  .task-box {
    background-color: #0f0f0f;
    border-radius: 8px;
    padding: 18px;
    margin: 20px 0;
  }
  .task-item {
    font-size: 14px;
    color: #d1d1d1;
    margin-bottom: 8px;
  }
  .cta {
    display: inline-block;
    margin-top: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
  }
  .footer {
    text-align: center;
    margin-top: 25px;
    font-size: 13px;
    color: #666;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">⏳ Chronos</div>
      </div>

      <div class="title">Deadline Approaching</div>

      <p class="text">
        Hi ${userName || 'there'}, this is a reminder that one of your study tasks is about to reach its deadline.
      </p>

      <div class="task-box">
        <div class="task-item"><strong>Task:</strong> ${taskGoal}</div>
        <div class="task-item"><strong>Course:</strong> ${courseName || 'Unnamed Course'}</div>
        <div class="task-item"><strong>Due:</strong> ${taskDeadline}</div>
      </div>

      <p class="text">
        Staying consistent is how progress compounds. Take action now to stay on track.
      </p>

      <center>
        <a href="${frontendUrl}/courses/${courseId}" class="cta">
          Go to Course →
        </a>
      </center>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Chronos — Make every moment count
    </div>
  </div>
</body>
</html>`,
    text: `Hi ${userName || 'there'},

Your task is almost due.

Task: ${taskGoal}
Course: ${courseName || 'Unnamed Course'}
Due: ${taskDeadline}

Take action now to stay consistent:
${frontendUrl}/courses/${courseId}

© ${new Date().getFullYear()} Chronos — Make every moment count`,
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
