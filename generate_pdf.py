# -*- coding: utf-8 -*-
import markdown
import os

md_file = r'c:\AI\珠海博瑞通电子科技有限公司组织架构与职责分工.md'
html_file = r'c:\AI\珠海博瑞通电子科技有限公司组织架构与职责分工.html'
pdf_file = r'c:\AI\珠海博瑞通电子科技有限公司组织架构与职责分工.pdf'

with open(md_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

org_chart_text = '''
## 四、组织架构图

<pre>
股东
    ↓
┌──────────────────────────────────────────────────────────┐
│                        综 合 办                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│                    总经理                                │
│             （人事·财务·采购·工程·行政）                  │
│                                                          │
│     ┌───────────────┬───────────────┬───────────────┐    │
│     │               │               │               │    │
│   总经理助理      计划主管       生产主管                │
│  （品质·业务）  （计划·物料）  （生产·领料·出货）      │
│     │               │               │               │    │
│     │            仓管员        ┌────┴────┐        │    │
│     │          （物料收发）    │         │        │    │
│     │                        插件车间   贴片车间    │    │
│     │                        （13人）   （18人）    │    │
│     │                          │          │        │    │
│     │                       ┌──┴──┐  ┌──┴──┐     │    │
│     │                       │     │  │     │     │    │
│     │                     组长×1  白班   夜班    │    │
│     │                     技术员×1 (9人) (9人)   │    │
│     │                     检验员×2  │      │    │    │
│     │                     插件员×4  │      │    │    │
│     │                     焊锡员×4  │      │    │    │
│     │                     IPQC×1    │      │    │    │
│     │                                │      │    │    │
│     │                         技术员×1  技术员×1 │    │
│     │                         操作员×4  操作员×4 │    │
│     │                         星级工×1  星级工×1 │    │
│     │                         检验员×2  检验员×2 │    │
│     │                         IPQC×1   IPQC×1   │    │
│     └──────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────┘

品质模块（4人）：IPQC×3、IQC兼OQC×1
</pre>
'''

lines = md_content.split('\n')
new_lines = []
skip_mermaid = False
mermaid_skipped = False
skip_heading_4 = False

for line in lines:
    if '```mermaid' in line:
        skip_mermaid = True
        continue
    if skip_mermaid and line.strip() == '```':
        skip_mermaid = False
        if not mermaid_skipped:
            new_lines.append(org_chart_text)
            mermaid_skipped = True
            skip_heading_4 = True
        continue
    if skip_mermaid:
        continue
    if skip_heading_4 and line.strip() == '## 四、组织架构图':
        skip_heading_4 = False
        continue
    if skip_heading_4 and line.strip().startswith('---'):
        skip_heading_4 = False
        new_lines.append(line)
        continue
    new_lines.append(line)

md_content_clean = '\n'.join(new_lines)

html_content = markdown.markdown(md_content_clean, extensions=['tables', 'fenced_code'])

html_template = f'''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>珠海博瑞通电子科技有限公司组织架构与职责分工</title>
<style>
    @page {{
        size: A4;
        margin: 2cm 1.5cm;
    }}
    body {{
        font-family: "SimSun", "宋体", "Microsoft YaHei", sans-serif;
        font-size: 12px;
        line-height: 1.6;
        color: #333;
        max-width: 100%;
        margin: 0;
        padding: 0;
    }}
    h1 {{
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 8px;
    }}
    h2 {{
        font-size: 16px;
        font-weight: bold;
        border-bottom: 2px solid #333;
        padding-bottom: 4px;
        margin-top: 18px;
        margin-bottom: 8px;
    }}
    h3 {{
        font-size: 14px;
        font-weight: bold;
        margin-top: 12px;
        margin-bottom: 6px;
    }}
    h4 {{
        font-size: 13px;
        font-weight: bold;
        margin-top: 8px;
        margin-bottom: 4px;
    }}
    table {{
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0;
        font-size: 11px;
    }}
    th, td {{
        border: 1px solid #666;
        padding: 5px 7px;
        text-align: center;
        vertical-align: middle;
    }}
    th {{
        background-color: #f0f0f0;
        font-weight: bold;
    }}
    td:first-child {{
        text-align: center;
    }}
    td:last-child {{
        text-align: left;
    }}
    p {{
        margin: 6px 0;
        text-indent: 2em;
    }}
    strong {{
        font-weight: bold;
    }}
    hr {{
        border: none;
        border-top: 1px solid #ccc;
        margin: 12px 0;
    }}
    blockquote {{
        margin: 8px 0;
        padding: 8px 12px;
        background-color: #f9f9f9;
        border-left: 4px solid #666;
    }}
    blockquote p {{
        text-indent: 0;
        margin: 3px 0;
    }}
    pre {{
        background-color: #f5f5f5;
        padding: 12px;
        border: 1px solid #ddd;
        font-family: "Consolas", "Courier New", "宋体", monospace;
        font-size: 10px;
        line-height: 1.5;
        white-space: pre;
        overflow-x: auto;
    }}
    code {{
        font-family: "Consolas", "Courier New", monospace;
    }}
    em {{
        font-style: italic;
    }}
    ul, ol {{
        margin: 6px 0;
        padding-left: 2em;
    }}
    li {{
        margin: 3px 0;
    }}
</style>
</head>
<body>
{html_content}
</body>
</html>
'''

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f'HTML file generated: {html_file}')

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
output_dir = r'c:\AI'

import subprocess

cmd = [
    edge_path,
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    f'--print-to-pdf={pdf_file}',
    f'file:///{html_file}'
]
print(f'Running: {" ".join(cmd)}')
result = subprocess.run(cmd, capture_output=True, text=True)
print(f'Return code: {result.returncode}')
if result.stdout:
    print(f'Stdout: {result.stdout}')
if result.stderr:
    print(f'Stderr: {result.stderr}')

if os.path.exists(pdf_file):
    print(f'PDF generated successfully: {pdf_file}')
else:
    print('PDF generation may have failed, checking...')
