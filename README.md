# Portfolio Application

A modern Angular-based portfolio application for showcasing education, work experience, projects, and professional links. Built with Angular 18+ and featuring a clean, responsive design with admin capabilities.

## 🚀 Features

- **Portfolio Display**: Showcase education, work experience, and projects
- **Tag-based Organization**: Filter content by tags across different sections
- **Admin Panel**: Full CRUD operations for managing portfolio content
- **Authentication**: Secure login system with JWT token management
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **SEO Optimized**: Dynamic meta tags and title management
- **File Upload**: Support for profile images and CV uploads

## 🏗️ Architecture

### Core Structure
```
src/app/
├── core/                    # Core application logic
│   ├── interfaces/          # TypeScript interfaces
│   ├── services/           # Business logic services
│   │   ├── endpoints/      # API endpoint definitions
│   │   ├── http/          # HTTP service layer
│   │   └── utils/         # Utility services
│   └── guards/            # Route guards and interceptors
├── sections/              # Main application sections
├── modules/               # Reusable feature modules
└── shared/               # Shared components
```

### Data Models

#### Core Entities
- **Profile**: User profile information with role and description
- **Education**: Educational background with projects and tags
- **Work**: Work experience with responsibilities and links
- **Project**: Portfolio projects with descriptions and tags
- **Tag**: Categorization system for content
- **Link**: External links for profiles, projects, and education

## 🛠️ Technology Stack

- **Frontend**: Angular 18+
- **HTTP Client**: Angular HttpClient with RxJS
- **UI Components**: Angular Material
- **Styling**: CSS3 with responsive design
- **State Management**: Angular Signals and RxJS
- **Cookie Management**: typescript-cookie
- **Authentication**: JWT tokens with HTTP interceptors

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Juancho43/PortfolioFronted.git
   cd PortfolioFronted
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create environment files:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     api_url: 'http://localhost:3000/api'
   };
   ```

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Access the application**
   - Frontend: `http://localhost:4200`
   - Admin Panel: `http://localhost:4200/admin`

## 🔧 Configuration

### API Endpoints

The application uses a RESTful API with the following main endpoints:

- **Authentication**: `/login`, `/logout`
- **Profile**: `/profile/:id`
- **Education**: `/education`, `/education/:id`
- **Projects**: `/project`, `/project/:id`
- **Work**: `/work`, `/work/:id`
- **Tags**: `/tag`, `/tag/:id`
- **Links**: `/link`, `/link/:id`


## 🎯 Usage

### Public Portfolio
Navigate through different sections to view:
- Education background with associated projects
- Work experience and responsibilities
- Project showcase with filtering capabilities
- Tag-based content organization

### Admin Panel
Access `/admin` after authentication to:
- Manage profile information
- Add/edit/delete education entries
- Create and organize projects
- Manage tags and links
- Upload profile images and CV

### Authentication Flow
1. Navigate to login page
2. Enter credentials
3. Receive JWT token stored in cookies
4. Access protected admin routes
5. Token automatically included in API requests

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP Interceptors**: Automatic token attachment to requests
- **Route Guards**: Protected admin routes
- **Cookie Management**: Secure token storage with expiration

## 📱 Responsive Design

The application features a mobile-first responsive design:
- Adaptive navigation for mobile devices
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized media queries

## 🎨 Theming

### Dark/Light Mode
- Automatic detection of system preference
- Manual theme toggle functionality
- CSS custom properties for theme variables
- Persistent theme selection

### Theme Implementation
```css
/* Light theme (default) */
:root {
  --primary-color: #your-color;
  --background-color: #ffffff;
}

/* Dark theme */
.dark-theme {
  --primary-color: #your-dark-color;
  --background-color: #000000;
}
```

## 📊 Data Management

### Services Architecture
- **HTTP Services**: Handle API communication
- **Utility Services**: Theme, notifications, meta tags
- **State Management**: RxJS subjects and Angular signals

### Error Handling
- Global error interception
- User-friendly notifications
- Graceful degradation for failed requests

## 🚦 API Integration

### HTTP Service Pattern
```typescript
// Example service method
getAll(): Observable<ApiResponseCollection<Entity>> {
  return this.http.get<ApiResponseCollection<Entity>>(
    environment.api_url + endpoint.getAll
  );
}
```

### Authentication Integration
- Automatic token injection via HTTP interceptors
- Token expiration handling
- Logout functionality with server communication

## 📈 Performance Features

- **Lazy Loading**: Route-based code splitting
- **RxJS Optimization**: Efficient data streaming
- **Signal-based State**: Modern Angular state management
- **Caching Strategy**: Smart data caching for better performance

## 🧪 Development

### Code Standards
- TypeScript strict mode
- Angular best practices
- Consistent file organization
- Interface-driven development


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: Make sure to configure your backend API endpoints according to the interface definitions provided in the codebase.
