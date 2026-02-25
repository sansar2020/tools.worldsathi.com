import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Code, 
  BookOpen, 
  Wrench, 
  Package, 
  FileCode, 
  Layout, 
  Layers, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle,
  Server,
  Lock,
  Link2,
  Rocket,
  AlertCircle,
  FolderTree
} from 'lucide-react';

export default function DocsIndex() {
  const docSections = [
    {
      title: 'Project Specification',
      description: 'Complete overview of all implemented features, pages, tools, and functionality in the Worldsathi Tools Portal',
      icon: FileText,
      path: '/docs/specification',
      color: 'text-blue-600'
    },
    {
      title: 'Technical Architecture',
      description: 'Backend structure, frontend directory organization, file paths, and immutable components',
      icon: Code,
      path: '/docs/architecture',
      color: 'text-purple-600'
    },
    {
      title: 'Development Guidelines',
      description: 'Implementable vs non-implementable features, technology stack limitations, dos and don\'ts',
      icon: BookOpen,
      path: '/docs/guidelines',
      color: 'text-green-600'
    },
    {
      title: 'Features Implementation',
      description: 'User profiles, authentication, favorites, usage tracking, admin functions, and placeholder features',
      icon: Wrench,
      path: '/docs/features',
      color: 'text-orange-600'
    },
    {
      title: 'Tools Catalog',
      description: 'Complete list of 125+ tools with metadata, categories, FAQs, guides, and implementation status',
      icon: Package,
      path: '/docs/tools-catalog',
      color: 'text-red-600'
    },
    {
      title: 'Static Pages Content',
      description: 'Content for About Us, Contact Us, Terms of Service, Privacy Policy, Cookie Policy, and Data Rights',
      icon: FileCode,
      path: '/docs/static-pages',
      color: 'text-indigo-600'
    },
    {
      title: 'Dynamic Pages',
      description: 'Homepage, Category pages, Tool pages, Dashboard, and all Admin pages with their functionality',
      icon: Layout,
      path: '/docs/dynamic-pages',
      color: 'text-pink-600'
    },
    {
      title: 'Technology Stack',
      description: 'Motoko backend, React frontend, Tailwind CSS, Shadcn UI, React Query, Three.js, and Internet Identity',
      icon: Layers,
      path: '/docs/technology-stack',
      color: 'text-teal-600'
    },
    {
      title: 'Credit System',
      description: 'Credit tracking architecture, backend data model, migration strategy, hooks, and admin interface',
      icon: CreditCard,
      path: '/docs/credit-system',
      color: 'text-emerald-600'
    },
    {
      title: 'Improvement Areas',
      description: 'Placeholder implementations, missing features, incomplete admin pages, and enhancement opportunities',
      icon: AlertTriangle,
      path: '/docs/improvement-areas',
      color: 'text-amber-600'
    },
    {
      title: 'Best Practices',
      description: 'Guidelines for adding tools, modifying code, backend constraints, immutable paths, and consistency',
      icon: CheckCircle,
      path: '/docs/best-practices',
      color: 'text-cyan-600'
    }
  ];

  const icDevSections = [
    {
      title: 'IC Platform Setup',
      description: 'DFX SDK installation, project initialization, dfx.json configuration, and local replica deployment',
      icon: Server,
      path: '/docs/ic-platform-setup',
      color: 'text-blue-600'
    },
    {
      title: 'Internet Identity Authentication',
      description: 'AuthClient integration, useInternetIdentity hook, login/logout flows, and context setup',
      icon: Lock,
      path: '/docs/internet-identity-auth',
      color: 'text-purple-600'
    },
    {
      title: 'Frontend-Backend Integration',
      description: 'useActor hook, React Query setup, TypeScript typing, and authenticated canister calls',
      icon: Link2,
      path: '/docs/frontend-backend-integration',
      color: 'text-green-600'
    },
    {
      title: 'Canister Deployment',
      description: 'Local and mainnet deployment, canister upgrades, cycle management, and accessing deployed apps',
      icon: Rocket,
      path: '/docs/canister-deployment',
      color: 'text-orange-600'
    },
    {
      title: 'Project Structure',
      description: 'Directory organization, file naming conventions, configuration files, and frontend/backend separation',
      icon: FolderTree,
      path: '/docs/project-structure',
      color: 'text-indigo-600'
    },
    {
      title: 'Troubleshooting Guide',
      description: 'Common development issues, error solutions, debugging techniques, and state clearing procedures',
      icon: AlertCircle,
      path: '/docs/troubleshooting',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Project Documentation</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive documentation for the Worldsathi Tools Portal covering architecture, features, 
            implementation details, and development guidelines for building and maintaining similar projects.
          </p>
        </div>
      </div>

      {/* Internet Computer Development Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Internet Computer Development
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Step-by-step technical implementation guides for building on the Internet Computer with Motoko, 
            React, and Internet Identity authentication.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {icDevSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={section.path}
                  className="bg-white dark:bg-gray-800 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-8 w-8 ${section.color}`} />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={section.path}>View Guide</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Project Documentation Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Project Documentation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Detailed documentation of the Worldsathi Tools Portal architecture, features, and implementation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={section.path}
                  className="bg-white dark:bg-gray-800 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-8 w-8 ${section.color}`} />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={section.path}>View Documentation</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg border-2 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About This Documentation
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This documentation serves as both a comprehensive reference for the existing Worldsathi Tools Portal 
              and a blueprint for building similar projects. It captures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-4">
              <li>All implemented features including 125+ tools across 11 categories</li>
              <li>Complete technical architecture with single-actor Motoko backend and React frontend</li>
              <li>Development constraints and best practices for the Caffeine platform</li>
              <li>Detailed implementation status of all pages and features</li>
              <li>Credit tracking system with admin management capabilities</li>
              <li>Step-by-step Internet Computer development guides with code examples</li>
              <li>Areas for improvement and future enhancement opportunities</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              Use this documentation to understand the current state of the project, maintain existing features, 
              add new tools, or build similar applications following proven patterns and avoiding known pitfalls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
