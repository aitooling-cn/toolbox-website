import { QrCode, Image, Type, Code, Hash, Shield, Clock, Zap, TrendingUp } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import HeroSection from '../components/HeroSection';
import AdBanner from '../components/AdBanner';

export default function Home() {
  const tools = [
    {
      id: 'qr-code',
      icon: QrCode,
      title: '二维码生成器',
      description: '将文本、网址等内容转换为二维码，支持自定义颜色和尺寸',
      path: '/qr-code',
      category: '二维码',
    },
    {
      id: 'image-compress',
      icon: Image,
      title: '图片压缩',
      description: '压缩图片大小，支持旋转、翻转等操作，保持图像质量',
      path: '/image-tools',
      category: '图片',
    },
    {
      id: 'text-transform',
      icon: Type,
      title: '文本转换',
      description: '大小写转换、首字母大写、文本反转等多种文本处理功能',
      path: '/text-tools',
      category: '文本',
    },
    {
      id: 'json-format',
      icon: Code,
      title: 'JSON格式化',
      description: '格式化压缩的JSON数据，支持校验和压缩功能',
      path: '/dev-tools',
      category: '开发',
    },
    {
      id: 'base64',
      icon: Hash,
      title: 'Base64编解码',
      description: '文本和数据的Base64编码解码工具',
      path: '/text-tools',
      category: '文本',
    },
    {
      id: 'url-encode',
      icon: Shield,
      title: 'URL编解码',
      description: 'URL编码解码工具，处理特殊字符',
      path: '/text-tools',
      category: '开发',
    },
    {
      id: 'xml-format',
      icon: Clock,
      title: 'XML格式化',
      description: '格式化和压缩XML数据，便于阅读和传输',
      path: '/dev-tools',
      category: '开发',
    },
    {
      id: 'html-escape',
      icon: Zap,
      title: 'HTML转义',
      description: 'HTML特殊字符转义和还原，防止XSS攻击',
      path: '/dev-tools',
      category: '开发',
    },
  ];

  const categories = ['全部', '二维码', '图片', '文本', '开发'];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">热门工具</h2>
                <p className="text-gray-400">精选实用工具，满足您的日常需求</p>
              </div>
              <div className="flex items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      category === '全部'
                        ? 'gradient-primary text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>

            <div className="mt-12">
              <AdBanner />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl gradient-card border border-gray-700 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">每日更新</h3>
                <p className="text-gray-400 text-sm">每周新增实用工具，持续丰富功能</p>
              </div>
              <div className="p-6 rounded-xl gradient-card border border-gray-700 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">极速体验</h3>
                <p className="text-gray-400 text-sm">本地处理，秒级响应，无需等待</p>
              </div>
              <div className="p-6 rounded-xl gradient-card border border-gray-700 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">隐私保护</h3>
                <p className="text-gray-400 text-sm">数据本地处理，不上传服务器</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AdBanner position="sidebar" />

            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">使用统计</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">今日使用</span>
                    <span className="text-white font-medium">12,847</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">本周使用</span>
                    <span className="text-white font-medium">89,234</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">累计使用</span>
                    <span className="text-white font-medium">1,234,567</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}