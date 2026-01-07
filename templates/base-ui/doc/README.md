# Document Management Application

A modern, feature-rich document management application built with Next.js, featuring document upload, sharing, analytics, and a beautiful dashboard interface.

<div align="center">
  <img src="./public/screenshot.png" alt="Document Management Application Screenshot" width="100%"/>
</div>

## Features

- **Document Management**: Upload, organize, and manage documents with support for multiple file types (PDF, Excel, Word, Images)
- **Document Sharing**: Create shareable links for documents with access controls
- **Analytics Dashboard**: Track document views, completion rates, and visitor statistics
- **Document Search**: Fast search functionality to find documents by name or type
- **View Statistics**: Detailed analytics for each document including view counts, completion rates, and duration
- **Visitor Tracking**: Track who viewed your documents and their engagement metrics
- **Notion Integration**: Share Notion pages as documents
- **Responsive Design**: Fully responsive interface with collapsible sidebar
- **Document Details**: Comprehensive document detail pages with charts and metrics
- **Link Management**: Manage multiple shareable links per document with status tracking

## Technologies

This project is built with the following technologies:

- **Framework**: [Next.js](https://nextjs.org) 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: [Base UI](https://base-ui.com) / [shadcn/ui](https://ui.shadcn.com)
- **Charts**: [Recharts](https://recharts.org) - Data visualization library
- **Icons**: [Hugeicons](https://hugeicons.com) & [Lucide React](https://lucide.dev)
- **Utilities**: 
  - `class-variance-authority` - Component variants
  - `clsx` & `tailwind-merge` - Class name utilities

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **pnpm** 8.0 or higher (recommended package manager)

If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
```

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:

```bash
cd templates/base-ui/doc
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start the development server**:

```bash
pnpm dev
```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload when you make changes to the code.

## Available Scripts

- `pnpm dev` - Start the development server on [http://localhost:3000](http://localhost:3000)
- `pnpm build` - Create an optimized production build
- `pnpm start` - Start the production server (requires `pnpm build` first)
- `pnpm lint` - Run ESLint to check for code quality issues

## Project Structure

```
doc/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page with analytics
│   ├── documents/         # Documents section
│   │   ├── page.tsx       # Documents list page
│   │   └── [id]/          # Dynamic route for document details
│   │       └── page.tsx   # Document detail page with statistics
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui style)
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── sidebar.tsx
│   │   └── ...           # Other UI components
│   ├── app-sidebar.tsx   # Main application sidebar
│   ├── nav-main.tsx      # Navigation main component
│   ├── nav-user.tsx      # User navigation component
│   ├── nav-usage.tsx     # Usage statistics component
│   ├── team-switcher.tsx # Team switcher component
│   └── upload-document-dialog.tsx # Document upload dialog
├── lib/                  # Utility functions
│   └── utils.ts         # Utility functions (cn helper, etc.)
├── hooks/               # Custom React hooks
│   └── use-mobile.ts    # Mobile detection hook
├── public/              # Static assets
├── components.json      # shadcn/ui configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── tailwind.config     # Tailwind CSS configuration (via CSS)
```

## Usage

### Uploading a Document

1. Click the **"Add document"** button in the documents page
2. Choose between uploading a document or sharing a Notion page
3. For documents:
   - Drag and drop a file or click to select
   - Supported formats: PDF, Excel (XLS, XLSX, CSV, TSV, ODS), Images (PNG, JPEG, JPG)
   - Click **"Upload document"** to complete
4. For Notion pages:
   - Enter your public Notion page URL
   - Click **"Save Notion link"** to create a shareable document

### Managing Documents

- **View Documents**: Browse all documents in the documents list page
- **Search**: Use the search bar to filter documents by name or type
- **View Details**: Click on any document to see detailed statistics and analytics
- **Delete Documents**: Use the options menu to delete documents (with confirmation dialog)
- **Share Documents**: Create shareable links from the document detail page

### Document Analytics

Each document includes comprehensive analytics:

- **View Statistics**: Bar chart showing views over time periods
- **Total Views**: Overall view count
- **Average Completion Rate**: Percentage of document completion
- **Average View Duration**: Average time spent viewing the document
- **Shared Links**: List of all shareable links with their status and view counts
- **Visitors**: Detailed visitor information including email, view duration, and completion rate

### Dashboard

The main dashboard provides:

- **Overview Statistics**: Total links, documents, visitors, and views
- **View Trends**: Chart showing document views over time
- **Recent Links**: List of recently created shareable links
- **Quick Actions**: Easy access to create new links and upload documents

### Filtering and Search

- **Search**: Type in the search bar to filter documents by name or file type
- **Document Counter**: Shows the number of filtered documents
- **Real-time Filtering**: Results update as you type

## Customization

### Modifying Navigation

To customize the sidebar navigation, edit the `data` object in `components/app-sidebar.tsx`:

```typescript
const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: ChartPie,
      url: "/",
      isActive: true,
    },
    // Add your custom navigation items
  ],
}
```

### Customizing File Types

To add support for additional file types, modify the `getFileColor` function in `app/documents/page.tsx`:

```typescript
function getFileColor(type: string) {
  switch (type) {
    case "pdf":
      return "text-red-600"
    // Add your custom file types here
  }
}
```

### UI Components

This project uses shadcn/ui style components. You can add new components using:

```bash
npx shadcn@latest add [component-name]
```

Component configuration is stored in `components.json`.

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your app will be live

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Other Deployment Options

This application can be deployed to any platform that supports Next.js:

- **Netlify**: Connect your Git repository and configure the build command as `pnpm build`
- **Railway**: Deploy directly from GitHub with automatic detection
- **Docker**: Create a Dockerfile and deploy to any container platform

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com) - Learn about the UI components
- [Recharts Documentation](https://recharts.org) - Learn about data visualization

## License

This project is part of a template collection. Please refer to the main repository for license information.
