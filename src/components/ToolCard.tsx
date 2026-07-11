import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  category: string;
}

export default function ToolCard({ icon: Icon, title, description, path, category }: ToolCardProps) {
  return (
    <Link
      to={path}
      className="group block p-6 rounded-xl gradient-card border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg gradient-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}