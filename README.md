# SAP

📂 SAP/
│── 📂 frontend/           # React Frontend
│── 📂 backend/            # Spring Boot Backend
│── 📂 docs/               # Documentation (SRS, API docs, etc.)
│── 📄 README.md           # Project Overview



📂 frontend/
│── 📂 src/
│   │── 📂 components/                 # Reusable UI components
│   │   │── Navbar.js                   # Top Navigation
│   │   │── Sidebar.js                  # Sidebar for roles
│   │   │── ChartComponent.js            # Graphs & Analytics
│   │   │── Calendar.js                  # Event Scheduling
│   │   │── PrivateRoute.js              # Route Protection
│   │── 📂 pages/                        # Page Components
│   │   │── Login.js                      # Login Page
│   │   │── Dashboard.js                  # Common Dashboard
│   │   │── StudentDashboard.js           # Student Role View
│   │   │── FacultyDashboard.js           # Faculty Role View
│   │   │── FacultyAdvisorDashboard.js    # FA Role View
│   │   │── StudentRequests.js            # Request Management
│   │   │── FacultyRequests.js            # Faculty Approvals
│   │   │── FARequests.js                 # Faculty Advisor Requests
│   │   │── StudentDoubts.js              # Student Doubts
│   │   │── FacultyDoubts.js              # Doubt Management
│   │   │── FAStudentList.js              # Faculty Advisor Students
│   │── 📂 context/                      # State Management
│   │   │── AuthContext.js                # Authentication State
│   │── 📂 services/                      # API Calls
│   │   │── authService.js                # Auth API
│   │   │── requestService.js             # Request Handling
│   │   │── studentService.js             # Student Data
│   │── App.js                            # Routes & Navigation
│   │── index.js                          # Entry Point
│── 📂 public/                            # Static Assets
│── 📄 package.json                        # Dependencies
│── 📄 .env                                # Environment Variables



📂 backend/
│── 📂 src/main/java/com/s6_se_lab/
│   │── 📂 controller/                    # API Endpoints
│   │   │── AuthController.java           # Authentication
│   │   │── StudentController.java        # Student APIs
│   │   │── FacultyController.java        # Faculty APIs
│   │   │── FacultyAdvisorController.java # FA APIs
│   │   │── RequestController.java        # Request Handling
│   │   │── DoubtController.java          # Doubt Management
│   │── 📂 model/                         # Entity Models
│   │   │── User.java                     # User Model
│   │   │── Student.java                  # Student Model
│   │   │── Faculty.java                  # Faculty Model
│   │   │── Request.java                  # Request Model
│   │   │── Event.java                    # Event Model
│   │── 📂 repository/                     # Database Access
│   │   │── UserRepository.java           # User Repo
│   │   │── StudentRepository.java        # Student Repo
│   │   │── FacultyRepository.java        # Faculty Repo
│   │   │── RequestRepository.java        # Request Repo
│   │── 📂 service/                        # Business Logic
│   │   │── AuthService.java              # Authentication Logic
│   │   │── StudentService.java           # Student Logic
│   │   │── FacultyService.java           # Faculty Logic
│   │   │── FAService.java                # FA Logic
│   │   │── RequestService.java           # Request Processing
│   │── 📂 config/                         # Security & Config
│   │   │── SecurityConfig.java           # Spring Security
│   │── 📂 dto/                            # Data Transfer Objects
│   │   │── LoginDTO.java                 # Login Payload
│   │   │── RequestDTO.java               # Request Data
│   │── 📄 Application.java                # Main Spring Boot App
│── 📂 src/main/resources/
│   │── application.properties            # Database Config
│── 📂 target/                             # Compiled Output
│── 📄 pom.xml                             # Maven Dependencies
