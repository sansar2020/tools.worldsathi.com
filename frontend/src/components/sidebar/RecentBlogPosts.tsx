import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

// Mock blog posts data - replace with actual data when blog is implemented
const recentPosts = [
  {
    id: 1,
    title: '10 Essential Online Tools for Productivity',
    thumbnail: '/assets/generated/blog-featured-1.dim_800x450.png',
    path: '#',
  },
  {
    id: 2,
    title: 'How to Choose the Right Calculator Tool',
    thumbnail: '/assets/generated/blog-featured-2.dim_800x450.png',
    path: '#',
  },
  {
    id: 3,
    title: 'Security Best Practices for Password Generation',
    thumbnail: '/assets/generated/blog-featured-1.dim_800x450.png',
    path: '#',
  },
];

export default function RecentBlogPosts() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Recent Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <a key={post.id} href={post.path}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-2 aspect-video">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </p>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
