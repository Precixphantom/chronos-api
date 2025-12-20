import cron from 'node-cron';
import User from '../models/User.js';
import Task from '../models/Task.js';
import {
  sendWeeklySummaryEmail,
  sendTaskReminderEmail
} from '../services/emailService.js';

/* ============================
   WEEKLY SUMMARY
   ============================ */
cron.schedule(
  '0 17 * * 0',
  async () => {
    console.log('Weekly summary cron triggered at:', new Date().toISOString());

    try {
      const users = await User.find();
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneWeekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      for (const user of users) {
        const completedTasks = await Task.find({
          user: user._id,
          completed: true,
          updatedAt: { $gte: oneWeekAgo }
        }).populate('course');

        const tasksDueLastWeek = await Task.find({
          user: user._id,
          deadline: { $gte: oneWeekAgo, $lte: now }
        }).populate('course');

        const upcomingTasks = await Task.find({
          user: user._id,
          completed: false,
          deadline: { $gte: now, $lte: oneWeekAhead }
        }).populate('course');

        const overdueTasks = await Task.find({
          user: user._id,
          completed: false,
          deadline: { $lt: now }
        })
          .populate('course')
          .sort({ deadline: 1 });

        const completedOfDue = tasksDueLastWeek.filter(t => t.completed).length;

        const stats = {
          completed: completedTasks.length,
          totalDue: tasksDueLastWeek.length,
          completionRate:
            tasksDueLastWeek.length > 0
              ? Math.round((completedOfDue / tasksDueLastWeek.length) * 100)
              : 0,
          overdue: overdueTasks.length
        };

        const result = await sendWeeklySummaryEmail(
          user._id,
          user.email,
          user.name,
          completedTasks,
          upcomingTasks,
          overdueTasks,
          stats
        );

        if (result.success) {
          console.log(`Weekly summary sent to: ${user.email}`);
        } else {
          console.log(
            ` Weekly summary skipped for ${user.email}: ${
              result.reason || result.error
            }`
          );
        }
      }
    } catch (err) {
      console.error('Error sending weekly summaries:', err);
    }
  },
  {
    timezone: 'Africa/Lagos'
  }
);

/* ============================
   TASK REMINDERS (EVERY MINUTE)
   Send reminder 5 minutes before deadline
   ============================ */
cron.schedule(
  '* * * * *',
  async () => {
    console.log('Task reminder check at:', new Date().toISOString());

    try {
      const now = new Date();
      
      // Find tasks where deadline is between 4-6 minutes from now
      const fourMinutesFromNow = new Date(now.getTime() + 4 * 60 * 1000);
      const sixMinutesFromNow = new Date(now.getTime() + 6 * 60 * 1000);

      const upcomingTasks = await Task.find({
        completed: false,
        reminderSent: { $ne: true },
        deadline: { 
          $gte: fourMinutesFromNow, 
          $lte: sixMinutesFromNow 
        }
      }).populate('user course');

      console.log(`Found ${upcomingTasks.length} tasks needing reminders`);

      for (const task of upcomingTasks) {
        // Calculate exact minutes until deadline
        const minutesUntilDeadline = Math.round(
          (new Date(task.deadline) - now) / (60 * 1000)
        );
        
        console.log(`Task "${task.goal}" due in ${minutesUntilDeadline} minutes`);

        const result = await sendTaskReminderEmail(
          task.user._id,
          task.user.email,
          task.user.name,
          task,
          task.course?.courseTitle || 'Unnamed Course'
        );

        if (result.success) {
          console.log(`Reminder sent to ${task.user.email} for "${task.goal}"`);
          task.reminderSent = true;
          await task.save();
        } else {
          console.log(`Reminder failed for ${task.user.email}: ${result.error || result.reason}`);
        }
      }
    } catch (err) {
      console.error('Error in task reminder cron:', err);
    }
  },
  {
    timezone: 'Africa/Lagos'
  }
);

// Log when cron jobs are initialized
console.log('Cron jobs initialized successfully');
console.log('Weekly summary: Every Sunday at 5:00 PM Lagos time');
console.log('Task reminders: Every minute (checks for tasks due in 4-6 minutes)');