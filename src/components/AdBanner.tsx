import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'sidebar';
}

export default function AdBanner({ position = 'top' }: AdBannerProps) {
  if (position === 'sidebar') {
    return (
      <div className="sticky top-24 p-4 rounded-xl bg-gray-800 border border-gray-700">
        <div className="text-xs text-gray-500 mb-2">广告</div>
        <div className="aspect-[300/600] rounded-lg overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-lg font-bold text-blue-400 mb-2">加入广告联盟</div>
            <div className="text-sm text-gray-400 mb-4">获取流量变现收益</div>
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
              了解详情
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">AD</span>
          </div>
          <div>
            <div className="text-white font-semibold">推广您的产品或服务</div>
            <div className="text-sm text-gray-400">精准触达目标用户，提升品牌曝光</div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
          立即投放
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}