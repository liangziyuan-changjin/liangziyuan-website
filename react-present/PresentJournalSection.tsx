import React from "react";
import "./present-journal.css";

const PRESENT_IMAGE_COUNT = 18;

// Matches existing files: /assets/images/present/present-01.jpg.webp ... present-18.jpg.webp
const presentPhotos = Array.from({ length: PRESENT_IMAGE_COUNT }, (_, index) => {
  const seq = String(index + 1).padStart(2, "0");
  return `/assets/images/present/present-${seq}.jpg.webp`;
});

const presentTags = [
  "逻辑在线",
  "可甜可酷",
  "不服憋着",
  "city walk",
  "冷萃冰美式",
  "奶茶续命",
  "情绪稳定输出",
  "细节控",
  "镜头感",
  "灵感手帐",
  "执行力",
  "富士女孩"
];

const copy = {
  state:
    "白天在需求风暴里对线，晚上在情绪边缘蹦迪。\n我可以温柔，但今天真的不想当懂事大人。\n该扛的我会扛，不服憋着。",
  personality:
    "外表是奶香马卡龙，内核是冷萃冰美式。\n逻辑在线，脾气有棱角，爱美也爱赢。\n能把混乱理成路，也能把路走成舞台。",
  life:
    "我的续命公式：冷萃冰美式 + 奶茶续命 + 深夜散步。\n拍照、唱歌、city walk，都是我给灵魂充电的方式。\n如果今天有风和晚霞，我就原地复活。"
};

export default function PresentJournalSection() {
  return (
    <section id="present" className="present-journal" aria-label="现在的我灵感手帐">
      <div className="present-grid present-grid-12">
        <article className="present-card card-state drift-a" style={{ "--dy": "16px" } as React.CSSProperties}>
          <h3>我的状态</h3>
          <p className="preline">{copy.state}</p>
        </article>

        <article
          className="present-card card-personality drift-b"
          style={{ "--dy": "-12px" } as React.CSSProperties}
        >
          <h3>我的个性</h3>
          <p className="preline">{copy.personality}</p>
        </article>

        <article className="present-card card-life drift-c" style={{ "--dy": "24px" } as React.CSSProperties}>
          <h3>我的生活</h3>
          <p className="preline">{copy.life}</p>
        </article>

        <section className="present-card polaroid-zone drift-d" style={{ "--dy": "8px" } as React.CSSProperties}>
          <h3>生活影像墙</h3>

          <div className="polaroid-stack" aria-label="拍立得照片堆">
            {presentPhotos.map((src, index) => {
              const col = index % 6;
              const row = Math.floor(index / 6);
              const rotateBase = [-9, -5, 4, 8, -6, 6][col];
              const x = col * 72 + (row % 2 === 0 ? 0 : 14);
              const y = row * 94 + (col % 2 === 0 ? 0 : 10);
              const rotate = rotateBase + row;

              return (
                <figure
                  key={src}
                  className="polaroid"
                  style={{
                    "--x": `${x}px`,
                    "--y": `${y}px`,
                    "--r": `${rotate}deg`,
                    "--z": String(index + 1)
                  } as React.CSSProperties}
                >
                  <img src={src} alt={`现在的我 ${index + 1}`} loading="lazy" decoding="async" />
                </figure>
              );
            })}
          </div>

          <div className="bubble-cloud" aria-label="浮动标签云">
            {presentTags.map((tag, index) => (
              <span key={tag} className={`bubble bubble-${(index % 8) + 1}`}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
