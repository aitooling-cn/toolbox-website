import { useState, useCallback } from 'react';
import { Upload, Download, Trash2, Image as ImageIcon, Minimize2, RotateCw, FlipVertical, FlipHorizontal } from 'lucide-react';

export default function ImageTools() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [imageSize, setImageSize] = useState({ original: 0, compressed: 0 });
  const [isCompressing, setIsCompressing] = useState(false);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageSize({ original: file.size, compressed: 0 });
      setCompressedUrl('');
      setRotateAngle(0);
      setFlipH(false);
      setFlipV(false);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!uploadedFile) return;

    setIsCompressing(true);
    try {
      const img = new Image();
      img.src = previewUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotateAngle * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = uploadedFile.type;
      const compressedBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else throw new Error('Compression failed');
        }, mimeType, compressionQuality);
      });

      setCompressedUrl(URL.createObjectURL(compressedBlob));
      setImageSize((prev) => ({ ...prev, compressed: compressedBlob.size }));
    } catch (error) {
      console.error('Compression error:', error);
    } finally {
      setIsCompressing(false);
    }
  }, [uploadedFile, previewUrl, compressionQuality, rotateAngle, flipH, flipV]);

  const handleDownload = useCallback(() => {
    if (!compressedUrl || !uploadedFile) return;

    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed_${uploadedFile.name}`;
    a.click();
  }, [compressedUrl, uploadedFile]);

  const handleRemove = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setUploadedFile(null);
    setPreviewUrl('');
    setCompressedUrl('');
    setImageSize({ original: 0, compressed: 0 });
  }, [previewUrl, compressedUrl]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          图片工具
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          图片压缩、旋转、翻转，支持多种格式，一键处理并下载。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {!uploadedFile ? (
            <div
              className="p-12 rounded-xl gradient-card border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors cursor-pointer text-center"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">点击或拖拽上传图片</h3>
              <p className="text-gray-400">支持 JPG、PNG、WebP 等格式</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl gradient-card border border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{uploadedFile.name}</div>
                    <div className="text-sm text-gray-400">{formatSize(uploadedFile.size)}</div>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl gradient-card border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">原始图片</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                      style={{
                        transform: `rotate(${rotateAngle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-400">
                    {formatSize(imageSize.original)}
                  </div>
                </div>

                <div className="p-4 rounded-xl gradient-card border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">处理后图片</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    {compressedUrl ? (
                      <img
                        src={compressedUrl}
                        alt="Compressed"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-500">等待处理...</div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    {compressedUrl ? (
                      <div className="text-sm">
                        <span className="text-green-400">{formatSize(imageSize.compressed)}</span>
                        <span className="text-gray-500 mx-2">-</span>
                        <span className="text-blue-400">
                          节省 {(1 - imageSize.compressed / imageSize.original) * 100}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">未处理</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isCompressing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Minimize2 className="w-5 h-5" />
                  )}
                  {isCompressing ? '处理中...' : '开始处理'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!compressedUrl}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  下载
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Minimize2 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">压缩质量</h3>
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>质量</span>
                <span className="text-white">{Math.round(compressionQuality * 100)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>小文件</span>
                <span>高质量</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <RotateCw className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">旋转角度</h3>
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>角度</span>
                <span className="text-white">{rotateAngle}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotateAngle}
                onChange={(e) => setRotateAngle(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex items-center justify-center gap-2 mt-4">
                {[0, 90, 180, 270].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setRotateAngle(angle)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      rotateAngle === angle
                        ? 'gradient-primary text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <FlipHorizontal className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">翻转</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFlipH(!flipH)}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
                  flipH
                    ? 'gradient-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FlipHorizontal className="w-5 h-5" />
                <span>水平翻转</span>
              </button>
              <button
                onClick={() => setFlipV(!flipV)}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
                  flipV
                    ? 'gradient-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FlipVertical className="w-5 h-5" />
                <span>垂直翻转</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}