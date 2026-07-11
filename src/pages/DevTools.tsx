import { useState } from 'react';
import { Copy, Check, Code, Hash, Braces, Layers, Trash2, ArrowRightLeft } from 'lucide-react';

export default function DevTools() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('json-format');
  const [indentSize, setIndentSize] = useState(2);

  const tools = [
    { id: 'json-format', label: 'JSON格式化', icon: Braces, description: '格式化压缩的JSON数据' },
    { id: 'json-minify', label: 'JSON压缩', icon: Code, description: '压缩JSON数据，移除空格和换行' },
    { id: 'json-validate', label: 'JSON校验', icon: Hash, description: '校验JSON格式是否正确' },
    { id: 'xml-format', label: 'XML格式化', icon: Layers, description: '格式化XML数据' },
    { id: 'xml-minify', label: 'XML压缩', icon: Code, description: '压缩XML数据' },
    { id: 'escape-html', label: 'HTML转义', icon: Code, description: '转义HTML特殊字符' },
    { id: 'unescape-html', label: 'HTML还原', icon: Code, description: '还原HTML转义字符' },
    { id: 'diff', label: '文本对比', icon: ArrowRightLeft, description: '对比两段文本差异' },
  ];

  const applyTool = (toolId: string) => {
    setActiveTool(toolId);
    let result = inputText;

    switch (toolId) {
      case 'json-format':
        try {
          const parsed = JSON.parse(inputText);
          result = JSON.stringify(parsed, null, indentSize);
        } catch {
          result = 'JSON格式错误，请检查输入';
        }
        break;
      case 'json-minify':
        try {
          const parsed = JSON.parse(inputText);
          result = JSON.stringify(parsed);
        } catch {
          result = 'JSON格式错误，请检查输入';
        }
        break;
      case 'json-validate':
        try {
          JSON.parse(inputText);
          result = '✓ JSON格式正确';
        } catch (e: any) {
          result = `✗ JSON格式错误: ${e.message}`;
        }
        break;
      case 'xml-format':
        result = formatXml(inputText);
        break;
      case 'xml-minify':
        result = inputText.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
        break;
      case 'escape-html':
        result = inputText
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        break;
      case 'unescape-html':
        result = inputText
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        break;
      case 'diff':
        result = '请在下方输入框中输入第二段文本进行对比';
        break;
    }

    setOutputText(result);
  };

  const formatXml = (xml: string): string => {
    const reg = /(>)(<)(\/*)/g;
    let formatted = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    const lines = formatted.split('\r\n');
    formatted = lines.map((line) => {
      let indent = 0;
      if (line.match(/^<\/\w/)) {
        pad -= 1;
      } else if (line.match(/^<\w[^>]*[^/]>$/)) {
        indent = pad;
        pad += 1;
      } else {
        indent = pad;
      }
      return ' '.repeat(indent * indentSize) + line;
    }).join('\r\n');
    return formatted;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          开发者工具
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          JSON/XML格式化、HTML转义、文本对比，提升开发效率的必备工具。
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

          {(activeTool === 'json-format' || activeTool === 'xml-format') && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
              <span className="text-gray-400 text-sm">缩进大小:</span>
              <div className="flex items-center gap-2">
                {[2, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setIndentSize(size);
                      applyTool(activeTool);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      indentSize === size
                        ? 'gradient-primary text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {size} 空格
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">输入</h3>
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
                placeholder="请输入代码或数据..."
                className="w-full h-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
              />
            </div>

            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">输出</h3>
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
                className={`w-full h-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none font-mono text-sm ${
                  outputText.startsWith('✗') ? 'text-red-400' : outputText.startsWith('✓') ? 'text-green-400' : 'text-gray-100'
                }`}
              />
            </div>
          </div>

          {activeTool === 'diff' && (
            <div className="p-6 rounded-xl gradient-card border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">文本对比模式</h3>
              <p className="text-gray-400 text-sm mb-4">
                在两个输入框中分别输入要对比的文本，系统将高亮显示差异。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <textarea
                  placeholder="第一段文本..."
                  className="w-full h-48 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
                />
                <textarea
                  placeholder="第二段文本..."
                  className="w-full h-48 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
                />
              </div>
              <button className="mt-4 w-full px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
                开始对比
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">工具说明</h3>
            <div className="text-sm text-gray-400">
              {tools.find(t => t.id === activeTool)?.description}
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">使用示例</h3>
            <div className="text-sm">
              {activeTool.includes('json') && (
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-xs text-gray-400">
                  <p className="text-gray-500 mb-2">输入示例:</p>
                  <p>{"{\"name\":\"test\",\"value\":123}"}</p>
                </div>
              )}
              {activeTool.includes('xml') && (
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-xs text-gray-400">
                  <p className="text-gray-500 mb-2">输入示例:</p>
                  <p>&lt;root&gt;&lt;item&gt;test&lt;/item&gt;&lt;/root&gt;</p>
                </div>
              )}
              {activeTool.includes('html') && (
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-xs text-gray-400">
                  <p className="text-gray-500 mb-2">输入示例:</p>
                  <p>&lt;div class="test"&gt;</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-xl gradient-card border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">快捷键</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center justify-between">
                <span>复制</span>
                <kbd className="px-2 py-1 rounded bg-gray-700 text-xs">Ctrl+C</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>粘贴</span>
                <kbd className="px-2 py-1 rounded bg-gray-700 text-xs">Ctrl+V</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>清空</span>
                <kbd className="px-2 py-1 rounded bg-gray-700 text-xs">Ctrl+X</kbd>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}