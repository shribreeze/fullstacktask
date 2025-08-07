import Link from 'next/link';

export default function Home() {
  const tasks = [
    { title: 'Roman Numerals', href: '/roman', description: 'Convert numbers to Roman numerals' },
    { title: 'Pagination', href: '/pagination', description: 'Paginated product listing' },
    { title: 'Debounced Search', href: '/search', description: 'Search with debounced API calls' },
    { title: 'Authentication', href: '/auth/signin', description: 'NextAuth.js with role-based access' },
    { title: 'Infinite Scroll', href: '/infinite-scroll', description: 'Infinite scrolling product list' },
    { title: 'Toast Demo', href: '/toast-demo', description: 'Custom toast notification system' },
    { title: 'File Upload', href: '/upload', description: 'Image upload with preview' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Full Stack Next.js Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Link
              key={task.href}
              href={task.href}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}