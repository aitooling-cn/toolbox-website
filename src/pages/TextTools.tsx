import { useState } from 'react';
import { Copy, Check, Type, Hash, AlignLeft, AtSign, Shield, ArrowRight, Trash2 } from 'lucide-react';

export default function TextTools() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('uppercase');

  const tools = [
    { id: 'uppercase', label: '转大写', icon: Type, description: '将文本转换为全部大写' },
    { id: 'lowercase', label: '转小写', icon: Type, description: '将文本转换为全部小写' },
    { id: 'capitalize', label: '首字母大写', icon: AlignLeft, description: '每个单词首字母大写' },
    { id: 'reverse', label: '反转文本', icon: ArrowRight, description: '反转文本顺序' },
    { id: 'remove-spaces', label: '移除空格', icon: Hash, description: '移除所有空格' },
    { id: 'base64-encode', label: 'Base64编码', icon: Shield, description: '文本Base64编码' },
    { id: 'base64-decode', label: 'Base64解码', icon: Shield, description: 'Base64解码文本' },
    { id: 'url-encode', label: 'URL编码', icon: AtSign, description: 'URL编码' },
    { id: 'url-decode', label: 'URL解码', icon: AtSign, description: 'URL解码' },
  ];

  const applyTool = (toolId: string) => {
    setActiveTool(toolId);
    let result = inputText;

    switch (toolId) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'capitalize':
        result = inputText.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'reverse':
        result = inputText.split('').reverse().join('');
        break;
      case 'remove-spaces':
        result = inputText.replace(/\s/g, '');
        break;
      case 'base64-encode':
        result = btoa(encodeURIComponent(inputText));
        break;
      case 'base64-decode':
        try {
          result = decodeURIComponent(atob(inputText));
        } catch {
          result = '解码失败，请检查输入';
        }
        break;
      case 'url-encode':
        result = encodeURIComponent(inputText);
        break;
      case 'url-decode':
        try {
          result = decodeURIComponent(inputText);
        } catch {
          result = '解码失败，请检查输入';
        }
        break;
    }

    setOutputText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const stats = {
    characters: inputText.length,
    words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
    lines: inputText.split('\n').length,
    paragraphs: inputText.split(/\n\n+/).filter(p => p.trim()).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          文本工具
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          文本转换、编码解码、格式化，多种文本处理工具一键使用。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => applyTool(tool.id)}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  activeTool === tool.id
                    ? 'gradient-card border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <tool.icon className={`w-6 h-6 mx-auto mb-2 ${activeTool === tool.id ? 'text-blue-400' : 'text-gray-400'}`} />
                <div className={`text-sm font-medium ${activeTool === tool.id ? 'text-white' : 'text-gray-300'}`}>
                  {tool.label}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">输入文本</h3>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  清空
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  applyTool(activeTool);
                }}
                placeholder="请输入文本..."
                className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
              />
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                <span>字符: <span className="text-white">{stats.characters}</span></span>
                <span>单词: <span className="text-white">{stats.words}</span></span>
                <span>行数: <span className="text-white">{stats.lines}</span></span>
                <span>段落: <span className="text-white">{stats.paragraphs}</span></span>
              </div>
            </div>

            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">输出结果</h3>
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-sm ${
                    copied
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={outputText}
                readOnly
                className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
              />
              <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                <span>字符: <span className="text-white">{outputText.length}</span></span>
                <span>当前工具: <span className="text-blue-400">{tools.find(t => t.id === activeTool)?.label}</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">工具说明</h3>
            <div className="text-sm text-gray-400">
              {tools.find(t => t.id === activeTool)?.description}
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">使用技巧</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>输入文本后自动实时处理</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>点击工具按钮切换处理方式</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>支持中英文混合文本处理</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>数据仅在本地处理，不会上传服务器</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}