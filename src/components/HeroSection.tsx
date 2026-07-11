import { Link } from 'react-router-dom';
import { Zap, Shield, Clock, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">100+ 实用工具，免费使用</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">一站式</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> 在线工具</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            二维码生成、图片处理、文本转换、开发调试，所有工具一网打尽。无需下载，即用即走。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/qr-code"
              className="group px-8 py-4 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2"
            >
              立即使用
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/image-tools"
              className="px-8 py-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-semibold hover:bg-gray-700 hover:text-white transition-all"
            >
              浏览全部工具
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">安全可靠</div>
                <div className="text-xs text-gray-400">数据本地处理，隐私无忧</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">极速响应</div>
                <div className="text-xs text-gray-400">毫秒级处理，无需等待</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">永久免费</div>
                <div className="text-xs text-gray-400">基础功能不限次数使用</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}