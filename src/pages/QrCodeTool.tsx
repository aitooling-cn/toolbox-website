import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check, ImageIcon, Palette, Maximize2 } from 'lucide-react';

export default function QrCodeTool() {
  const [inputValue, setInputValue] = useState('https://example.com');
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);

  const handleDownload = (format: 'svg' | 'png') => {
    const svgElement = document.querySelector('svg') as SVGElement;
    if (!svgElement) return;

    if (format === 'svg') {
      const blob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = qrSize;
      canvas.height = qrSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, qrSize, qrSize);

      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        a.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgElement.outerHTML)}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          二维码生成器
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          将文本、网址等内容转换为二维码，支持自定义颜色、尺寸，一键下载。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              输入内容
            </label>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入网址、文本或其他内容..."
              className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-400">{inputValue.length} 字符</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">样式设置</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>二维码尺寸</span>
                  <span className="text-white">{qrSize}px</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">前景色</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">背景色</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-8 rounded-xl gradient-card border border-gray-700 mb-6">
            <div className="p-4 bg-white rounded-xl inline-block">
              <QRCodeSVG
                value={inputValue}
                size={qrSize}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
                includeMargin
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDownload('png')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              下载 PNG
            </button>
            <button
              onClick={() => handleDownload('svg')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              下载 SVG
            </button>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Maximize2 className="w-4 h-4" />
              <span className="text-sm">提示：调整尺寸后重新下载以获得最佳效果</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}