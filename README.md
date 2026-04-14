# liangziyuan-homepage

你的一页式个人主页第一版（含：过去 / 现在 / 未来 / 彩蛋 / 背景音乐）。

## 本地预览

在当前目录运行：

```bash
python3 -m http.server 8080
```

然后打开：`http://localhost:8080`

## 先补齐这几项

1. 把你的背景音乐文件命名为 `my-theme.mp3`，放到 `assets/music/` 目录。
2. 在 `index.html` 中替换占位内容：
   - 学习和工作时间线
   - 真实项目成绩数据
   - 个人社交媒体链接（目前是 `#`）
3. 如需放视频，建议在“现在的我”模块加上你的视频链接（B站 / 抖音 / YouTube）。

## 部署到 `liangziyuan.me`（GitHub Pages 方案）

1. 新建 GitHub 仓库并推送此目录代码。
2. 仓库设置里开启 GitHub Pages（部署分支选 `main`）。
3. 在域名服务商后台把 `liangziyuan.me` 的 DNS 按 GitHub Pages 文档配置好（A 记录和 `www` 的 CNAME）。
4. 等待 DNS 生效后，访问：`https://liangziyuan.me`

## 文件结构

```text
.
├── assets
│   ├── images
│   │   ├── day-girl.jpg
│   │   ├── night-couple.png
│   │   └── night-girl.png
│   └── music
├── index.html
├── script.js
└── style.css
```
