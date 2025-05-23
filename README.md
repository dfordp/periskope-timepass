# Periskope

A modern web application built with Next.js and Supabase, featuring passwordless authentication and real-time chat capabilities.

## Features

- 🔐 Passwordless Authentication
  - Magic link email authentication
  - Secure session management
  - Protected routes
  
- 👤 User Management
  - User profiles with avatars
  - Email verification
  - Secure cookie-based session handling
  
- 💬 Chat Interface
  - Real-time messaging
  - Modern, clean UI
  - Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Database**: PostgreSQL (via Supabase)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn
- Supabase account

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```


## Project Structure

```
periskope-project/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── auth/
│   │   ├── chat/
│   │   └── helpers/
│   ├── components/
│   └── styles/
├── public/
└── ...config files
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Security Features

- Secure cookie storage
- CSRF protection
- XSS prevention
- Rate limiting
- Secure session management

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.