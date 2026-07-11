import { Link } from 'react-router-dom';
import { Wrench, Github, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg gradient-primary">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                全能工具箱
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              提供100+实用在线工具，涵盖二维码生成、图片处理、文本转换、开发调试等领域，帮助您高效完成日常任务。
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">工具分类</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/qr-code" className="text-gray-400 hover:text-blue-400 transition-colors">
                  二维码工具
                </Link>
              </li>
              <li>
                <Link to="/image-tools" className="text-gray-400 hover:text-blue-400 transition-colors">
                  图片工具
                </Link>
              </li>
              <li>
                <Link to="/text-tools" className="text-gray-400 hover:text-blue-400 transition-colors">
                  文本工具
                </Link>
              </li>
              <li>
                <Link to="/dev-tools" className="text-gray-400 hover:text-blue-400 transition-colors">
                  开发者工具
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">关于我们</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  关于网站
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  使用条款
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © 2024 全能工具箱. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            Made with <Heart className="w-4 h-4 text-red-500" /> by 全能团队
          </div>
        </div>
      </div>
    </footer>
  );
}