import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Email templates
export const emailTemplates = {
  welcome: (userName) => ({
    subject: '🚀 Welcome to Study Tracker — Stay on Top of Your Learning!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #0a0a0a;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #1a1a1a;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4);
              border: 1px solid #2a2a2a;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              text-align: center;
              padding: 48px 32px;
              position: relative;
            }
            .header-icon {
              font-size: 56px;
              margin-bottom: 12px;
            }
            .header-title {
              font-size: 32px;
              font-weight: 700;
              margin: 0 0 8px 0;
              letter-spacing: -0.5px;
            }
            .header-subtitle {
              font-size: 16px;
              font-weight: 400;
              margin: 0;
              opacity: 0.95;
            }
            .content {
              padding: 40px 32px;
              color: #e5e5e5;
            }
            .greeting {
              font-size: 18px;
              font-weight: 500;
              margin-bottom: 20px;
              color: #ffffff;
            }
            .intro-text {
              font-size: 16px;
              color: #b4b4b4;
              margin-bottom: 32px;
              line-height: 1.7;
            }
            .features-section {
              margin: 32px 0;
            }
            .features-title {
              font-size: 20px;
              font-weight: 600;
              color: #ffffff;
              margin-bottom: 24px;
              text-align: center;
            }
            .feature-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 32px;
            }
            .feature-card {
              background-color: #252525;
              padding: 20px;
              border-radius: 10px;
              border: 1px solid #333333;
              border-left: 4px solid #10b981;
              transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
            }
            .feature-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
              border-left-color: #34d399;
            }
            .feature-icon {
              font-size: 32px;
              margin-bottom: 8px;
            }
            .feature-title {
              font-size: 15px;
              font-weight: 600;
              color: #ffffff;
              margin-bottom: 6px;
            }
            .feature-description {
              font-size: 13px;
              color: #9ca3af;
              line-height: 1.5;
              margin: 0;
            }
            .button-container {
              text-align: center;
              margin: 40px 0;
            }
            .button {
              display: inline-block;
              padding: 16px 40px;
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white !important;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
              transition: transform 0.2s, box-shadow 0.2s;
            }
            .button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 24px rgba(16, 185, 129, 0.5);
            }
            .closing-text {
              text-align: center;
              font-size: 15px;
              color: #9ca3af;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #2a2a2a;
            }
            .footer {
              padding: 32px;
              background-color: #141414;
              text-align: center;
              border-top: 1px solid #2a2a2a;
            }
            .footer-help {
              font-size: 14px;
              color: #b4b4b4;
              margin-bottom: 16px;
            }
            .footer-links {
              font-size: 13px;
              color: #6b7280;
              margin-top: 12px;
            }
            .footer-links a {
              color: #10b981;
              text-decoration: none;
              margin: 0 8px;
            }
            .footer-links a:hover {
              text-decoration: underline;
              color: #34d399;
            }
            .footer-brand {
              font-weight: 600;
              color: #ffffff;
              font-size: 14px;
              margin-top: 12px;
            }
            @media screen and (max-width: 600px) {
              .container {
                margin: 20px auto;
                border-radius: 0;
              }
              .header {
                padding: 32px 24px;
              }
              .header-title {
                font-size: 26px;
              }
              .content {
                padding: 28px 24px;
              }
              .feature-grid {
                grid-template-columns: 1fr;
              }
              .button {
                padding: 14px 32px;
                font-size: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-icon">🚀</div>
              <h1 class="header-title">Welcome to Study Tracker!</h1>
              <p class="header-subtitle">Your journey to organized learning starts now</p>
            </div>
            
            <div class="content">
              <p class="greeting">Hi ${userName},</p>
              <p class="intro-text">
                We're thrilled to have you onboard! Study Tracker is designed to help you stay organized, 
                manage your tasks efficiently, and achieve your learning goals with confidence.
              </p>
              
              <div class="features-section">
                <h2 class="features-title">What You Can Do</h2>
                <div class="feature-grid">
                  <div class="feature-card">
                    <div class="feature-icon">📝</div>
                    <div class="feature-title">Manage Tasks</div>
                    <p class="feature-description">Create and organize tasks for each course and study session</p>
                  </div>
                  
                  <div class="feature-card">
                    <div class="feature-icon">📅</div>
                    <div class="feature-title">Track Deadlines</div>
                    <p class="feature-description">Set deadlines and never miss an important due date</p>
                  </div>
                  
                  <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <div class="feature-title">Weekly Summaries</div>
                    <p class="feature-description">Get email summaries every Sunday to review your progress</p>
                  </div>
                  
                  <div class="feature-card">
                    <div class="feature-icon">⏰</div>
                    <div class="feature-title">Smart Reminders</div>
                    <p class="feature-description">Receive timely notifications before task deadlines</p>
                  </div>
                </div>
              </div>

              <div class="button-container">
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Get Started Now</a>
              </div>

              <p class="closing-text">
                Let's make your study sessions productive, organized, and successful! 🎯
              </p>
            </div>
            
            <div class="footer">
              <p class="footer-help">
                Have questions? We're here to help! Reply to this email anytime.
              </p>
              <p class="footer-brand">Study Tracker</p>
              <p style="font-size: 13px; color: #777777; margin: 8px 0;">
                &copy; ${new Date().getFullYear()} Study Tracker. All rights reserved.
              </p>
              <div class="footer-links">
                <a href="${process.env.FRONTEND_URL}/settings">Settings</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

🚀 Welcome to Study Tracker!

We're thrilled to have you onboard! Study Tracker helps you stay organized, manage your tasks efficiently, and achieve your learning goals.

WHAT YOU CAN DO:

📝 Manage Tasks
Create and organize tasks for each course and study session

📅 Track Deadlines
Set deadlines and never miss an important due date

📊 Weekly Summaries
Get email summaries every Sunday to review your progress

⏰ Smart Reminders
Receive timely notifications before task deadlines

GET STARTED:
${process.env.FRONTEND_URL}/dashboard

Let's make your study sessions productive, organized, and successful!

---

Have questions? Reply to this email anytime — we're here to help!

Study Tracker
© ${new Date().getFullYear()} Study Tracker. All rights reserved.

Settings: ${process.env.FRONTEND_URL}/settings
    `,
  }),



weeklySummary: (userName, completedTasks, upcomingTasks, overdueTasks, stats) => ({
  subject: '📊 Your Weekly Summary - Chrono',
  html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <h2 style="text-align:center; background:#2196F3; color:white; padding:20px; margin:0;">
          Your Weekly Summary
        </h2>
        <div style="padding:20px;">
          <p>Hi ${userName},</p>
          <p>Here's your activity summary for the past week:</p>

          <h3 style="color: #2196F3;">📈 Statistics</h3>
          <p><strong>Tasks Completed:</strong> ${stats.completed}</p>
          <p><strong>Tasks Due:</strong> ${stats.totalDue}</p>
          <p><strong>Completion Rate:</strong> ${stats.completionRate}%</p>

          ${overdueTasks.length > 0 ? `
            <h3 style="color: #f44336;">⚠️ Overdue Tasks</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${overdueTasks.map(t => {
                const daysOverdue = Math.floor((new Date() - new Date(t.deadline)) / (1000 * 60 * 60 * 24));
                return `
                  <li style="padding: 8px; background: #ffebee; margin-bottom: 5px; border-radius: 4px; border-left: 4px solid #f44336;">
                    <strong>${t.goal || 'Untitled Task'}</strong>
                    ${daysOverdue > 0 ? ` - <span style="color: #f44336;">Overdue by ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''}</span>` : ''}
                    ${t.course?.name ? `<br><i style="color: #666; font-size: 14px;">${t.course.name}</i>` : ''}
                  </li>
                `;
              }).join('')}
            </ul>
          ` : ''}

          ${completedTasks.length > 0 ? `
            <h3 style="color: #4CAF50;">✅ Completed Tasks</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${completedTasks.map(t => `
                <li style="padding: 8px; background: #f0f0f0; margin-bottom: 5px; border-radius: 4px;">
                  <strong>${t.goal || 'Untitled Task'}</strong> 
                  ${t.course?.name ? `<i style="color: #666;">- ${t.course.name}</i>` : ''}
                </li>
              `).join('')}
            </ul>
          ` : '<p><em>No tasks completed this week.</em></p>'}

          ${upcomingTasks.length > 0 ? `
            <h3 style="color: #FF9800;">📅 Upcoming Tasks (Next 7 Days)</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${upcomingTasks.map(t => `
                <li style="padding: 8px; background: #fff3e0; margin-bottom: 5px; border-radius: 4px;">
                  <strong>${t.goal || 'Untitled Task'}</strong> - Due: ${new Date(t.deadline).toLocaleDateString()}
                  ${t.course?.name ? `<br><i style="color: #666; font-size: 14px;">${t.course.name}</i>` : ''}
                </li>
              `).join('')}
            </ul>
          ` : '<p><em>No upcoming tasks in the next 7 days.</em></p>'}

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL}/dashboard"
               style="display:inline-block; padding:12px 30px; background:#2196F3; color:white; text-decoration:none; border-radius:5px; font-weight:bold;">
              View Dashboard
            </a>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            ${overdueTasks.length > 0 ? '⚠️ Don\'t forget to complete your overdue tasks!<br>' : ''}
            Keep up the great work! 🚀
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Hi ${userName},

Your Weekly Summary
==================

Statistics:
- Tasks Completed: ${stats.completed}
- Tasks Due: ${stats.totalDue}
- Completion Rate: ${stats.completionRate}%

${overdueTasks.length > 0 ? `
⚠️ Overdue Tasks:
${overdueTasks.map(t => {
  const daysOverdue = Math.floor((new Date() - new Date(t.deadline)) / (1000 * 60 * 60 * 24));
  const overdueText = daysOverdue > 0 ? ` - Overdue by ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''}` : '';
  return `• ${t.goal || 'Untitled Task'}${overdueText}${t.course?.name ? ` (${t.course.name})` : ''}`;
}).join('\n')}
` : ''}

${completedTasks.length > 0 ? `
Completed Tasks:
${completedTasks.map(t => `• ${t.goal || 'Untitled Task'}${t.course?.name ? ` - ${t.course.name}` : ''}`).join('\n')}
` : 'No tasks completed this week.'}

${upcomingTasks.length > 0 ? `
Upcoming Tasks (Next 7 Days):
${upcomingTasks.map(t => `• ${t.goal || 'Untitled Task'} - Due: ${new Date(t.deadline).toLocaleDateString()}${t.course?.name ? ` (${t.course.name})` : ''}`).join('\n')}
` : 'No upcoming tasks in the next 7 days.'}

View your dashboard: ${process.env.FRONTEND_URL}/dashboard

${overdueTasks.length > 0 ? '⚠️ Don\'t forget to complete your overdue tasks!\n' : ''}
Keep up the great work! 🚀

- Chrono Team
  `,
}),

taskReminder: (userName, task, courseName) => {
  // Safe fallbacks
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const taskId = task?._id || "";
  const taskGoal = task?.goal || "Unnamed Task";
  const taskDeadline = task?.deadline ? new Date(task.deadline).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : "No deadline set";

  return {
    subject: `⏰ Reminder: "${taskGoal}" is due in 5 minutes!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; line-height: 1.6; }
          .container { max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #FF6B35 0%, #FF5722 100%); color: white; text-align: center; padding: 32px 20px; }
          .header-icon { font-size: 48px; margin-bottom: 8px; }
          .header-title { font-size: 26px; font-weight: 600; margin: 0; }
          .content { padding: 32px 28px; color: #2c3e50; }
          .greeting { font-size: 18px; font-weight: 500; margin-bottom: 20px; color: #1a1a1a; }
          .task-card { background-color: #fff8f5; border-left: 4px solid #FF5722; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .task-title { font-size: 16px; font-weight: 600; color: #FF5722; margin-bottom: 12px; }
          .task-details { font-size: 14px; color: #555; margin: 8px 0; }
          .task-details strong { color: #2c3e50; font-weight: 600; }
          .button-container { text-align: center; margin: 28px 0; }
          .button { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF6B35 0%, #FF5722 100%); color: white !important; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(255,87,34,0.3); transition: transform 0.2s, box-shadow 0.2s; }
          .button:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(255,87,34,0.4); }
          .footer { padding: 24px 28px; background-color: #fafafa; font-size: 13px; color: #777; text-align: center; border-top: 1px solid #e0e0e0; }
          .footer a { color: #FF5722; text-decoration: none; }
          .footer a:hover { text-decoration: underline; }
          .footer-brand { font-weight: 600; color: #2c3e50; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">⏰</div>
            <h1 class="header-title">Task Reminder</h1>
          </div>
          <div class="content">
            <p class="greeting">Hi ${userName || "there"},</p>
            <p>This is a friendly reminder that your task is due very soon.</p>
            
            <div class="task-card">
              <div class="task-title">📝 ${taskGoal}</div>
              <div class="task-details"><strong>Course:</strong> ${courseName || "Unnamed Course"}</div>
              <div class="task-details"><strong>Due:</strong> ${taskDeadline}</div>
              <div class="task-details" style="color: #FF5722; font-weight: 600; margin-top: 12px;">⚠️ Due in 5 minutes!</div>
            </div>

            <div class="button-container">
              <a href="${frontendUrl}/tasks/${taskId}" class="button" target="_blank" rel="noopener noreferrer">
                Mark as Complete
              </a>
            </div>

            <p style="font-size: 14px; color: #777; margin-top: 24px;">
              Stay on track with your studies. You've got this! 💪
            </p>
          </div>

          <div class="footer">
            <p class="footer-brand">Chrono</p>
            <p>&copy; ${new Date().getFullYear()} Chrono. All rights reserved.</p>
            <p>
              <a href="${process.env.FRONTEND_URL}/settings">Settings</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${userName || "there"},

Your task "${taskGoal}" in the course "${courseName || "Unnamed Course"}" is due in 5 minutes!

Mark it as complete: ${frontendUrl}/tasks/${taskId}
Settings: ${process.env.FRONTEND_URL}/settings

Chrono © ${new Date().getFullYear()}
`
  };
},

};

// Base send email function 
export const sendEmail = async (to, template) => {
    if (!transporter) {
      console.error("transporter is not configured");
      return { success: false, error: "Transporter not configured" };
    }

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject: template.subject,
        html: template.html,
        text: template.text,
        headers: {
            'X-Priority': '3',
            'X-Mailer': 'Chrono',
            'List-Unsubscribe': `<${process.env.FRONTEND_URL}/api/settings/notifications>`,
        },
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error(`Error sending Email: ${err.message}`);
        return { success: false, error: err.message };
    }
};

// Helper function to check if user has email notifications enabled
export const shouldSendEmail = async (userId) => {
  try {
    const user = await User.findById(userId).select('emailNotifications');
    
    if (!user) {
      console.error(`User ${userId} not found when checking email preferences`);
      return false; // Don't send if user doesn't exist
    }
    
    // Explicitly check: if field is true or undefined (new users), send email
    // If field is explicitly false, don't send
    return user.emailNotifications !== false;
    
  } catch (error) {
    console.error('Error checking notification preference:', error);
    return false; 
  }
};

// Wrapper function for sending emails with notification check
export const sendEmailIfEnabled = async (userId, userEmail, template) => {
  const isEnabled = await shouldSendEmail(userId);
  
  if (!isEnabled) {
    console.log(`Email notifications disabled for user ${userId}`);
    return { success: false, reason: 'notifications_disabled' };
  }
  
  return await sendEmail(userEmail, template);
};

// For welcome email (ALWAYS send, ignore notification setting)
export const sendWelcomeEmail = async (userEmail, userName) => {
  const template = emailTemplates.welcome(userName);
  return await sendEmail(userEmail, template);
};

// For weekly summary (respects notification setting)
export const sendWeeklySummaryEmail = async (userId, userEmail, userName, completedTasks, upcomingTasks, overdueTasks, stats) => {
  const template = emailTemplates.weeklySummary(
    userName, 
    completedTasks, 
    upcomingTasks,
    overdueTasks,
    stats
  );
  
  return await sendEmailIfEnabled(userId, userEmail, template);
};

// For task reminder (respects notification setting)
export const sendTaskReminderEmail = async (userId, userEmail, userName, task, courseName) => {
  const template = emailTemplates.taskReminder(userName, task, courseName);
  return await sendEmailIfEnabled(userId, userEmail, template);
};