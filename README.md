# Chronos Backend

> A production-ready RESTful API powering intelligent study management with automated scheduling and email notifications.

**Chronos Backend** is the server-side foundation for Chronos, a study tracking platform that helps students and learners organize courses, manage task deadlines, and maintain consistency through smart automation. Built with scalability and reliability in mind, this API handles everything from secure authentication to background job processing.

---

## 🌐 Production API

**Base URL:** `https://chronos-backend-bqjf.onrender.com`

**Health Check:** `GET /health`

**Status:** Live and monitored with 99%+ uptime

---

## 🎯 Core Capabilities

### Authentication & Security

- JWT-based authentication system
- Role-based access control and route protection
- Secure password hashing with bcrypt

### Data Management

- Course organization and CRUD operations
- Task management with deadline tracking
- User profile and preference customization

### Automation & Notifications

- Welcome emails for new users
- Smart deadline reminders
- Weekly progress summaries
- Configurable email preferences

### Infrastructure

- Scheduled background jobs using node-cron
- Production deployment on Render
- Active monitoring with UptimeRobot
- MongoDB Atlas for cloud database hosting

---

## 🏗️ Technical Architecture

**Runtime:** Node.js  
**Framework:** Express.js  
**Database:** MongoDB with Mongoose ODM  
**Authentication:** JSON Web Tokens (JWT)  
**Email Service:** Resend API  
**Job Scheduling:** node-cron  
**Hosting:** Render  
**Monitoring:** UptimeRobot

---

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User authentication
- `GET /api/user/logout` - Logout (protected)
- `DELETE /api/settings/delete` - Delete account

### Course Management

- `POST /api/courses` - Create new course
- `GET /api/courses` - List user courses
- `GET /api/courses/:id` - Get a course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Remove course

### Task Management

- `POST /api/tasks` - Create task with deadline
- `GET /api/tasks` - Retrieve tasks
- `PUT /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete task

### Email Preferences

- `GET /api/settings/` - Get settings
- `GET /api/settings/notifications` - Get notification settings
- `POST /api/settings/notifications` - Update notification settings

---

## 🚀 Local Development

### Prerequisites

- Node.js v14+ and npm
- MongoDB instance (local or Atlas)
- Resend API key

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Precixphantom/chronos-backend.git
cd chronos-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev
```

### Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:3000
```

---

## 📈 Current Progress & Roadmap

### ✅ Completed

- [x] RESTful API architecture
- [x] User authentication system
- [x] Course and task management
- [x] Automated email system
- [x] Production deployment
- [x] Uptime monitoring

### 🔄 In Progress

- [ ] API rate limiting
- [ ] Comprehensive unit testing
- [ ] Performance optimization

### 🎯 Planned Features

- [ ] Real-time notifications via WebSockets
- [ ] Analytics dashboard endpoints
- [ ] Third-party calendar integrations
- [ ] Mobile app support
- [ ] Advanced task prioritization algorithms

---

## 🤝 Contributing

This project is actively maintained and open to contributions! Whether you're interested in:

- Reporting bugs
- Suggesting features
- Improving documentation
- Submitting pull requests

Feel free to open an issue or reach out directly.

---

## 📊 Project Stats

- **Uptime:** 99%+ (monitored)
- **Response Time:** <200ms average
- **Database:** Cloud-hosted MongoDB Atlas
- **Active Users:** Growing daily

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 👨‍💻 Built By

**Precious Afolabi**

Computer Science Student | Backend Developer

Building reliable, scalable solutions one commit at a time.

- GitHub: [@Precixphantom](https://github.com/Precixphantom)
- Portfolio: [Coming Soon]
- LinkedIn: <www.linkedin.com/in/precious-afolabi-34194138b>

---

## 🙏 Acknowledgments

Built with modern best practices and inspired by the need for better study management tools. Special thanks to the open-source community for the incredible tools and libraries that made this possible.

---

**⭐ Star this repo if you find it helpful!**

*Last Updated: December 2024*
