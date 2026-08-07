import React, { useState } from "react";
import { Sparkles, Wand2, Tag } from "lucide-react";
import { C, FONT } from "../theme.js";
import { generateIdeas } from "../data/aiIdeas.js";
import TopBar from "../components/TopBar.jsx";

export default function AiScreen({ t, lang, dir, onBack }) {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    // Tiny artificial delay so it feels like it's "thinking" — the actual
    // generation is instant and fully offline (see src/data/aiIdeas.js).
    setTimeout(() => {
      setIdeas(generateIdeas(topic, lang));
      setLoading(false);
    }, 500);
  }

  return (
    <>
      <TopBar title={t.aiTitle} subtitle={t.aiSubtitle} onBack={onBack} dir={dir} />
      <div className="cf-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px" }}>
        <div
          style={{
            borderRadius: 20,
            padding: 18,
            background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.accent} 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Sparkles size={20} color="#fff" />
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, marginTop: 8 }}>{t.aiInputLabel}</div>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.aiInputPh}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: 10,
              border: "none",
              borderRadius: 12,
              padding: "12px 14px",
              fontSize: 13,
              fontFamily: FONT,
              outline: "none",
              color: C.inkFixed,
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            className="cf-btn-press"
            style={{
              marginTop: 12,
              width: "100%",
              background: "#fff",
              color: C.inkFixed,
              border: "none",
              borderRadius: 12,
              padding: "11px",
              fontSize: 13,
              fontFamily: FONT,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: topic.trim() ? "pointer" : "not-allowed",
              opacity: topic.trim() ? 1 : 0.7,
            }}
          >
            <Wand2 size={15} />
            {loading ? t.aiThinking : ideas.length ? t.aiRegenerateBtn : t.aiGenerateBtn}
          </button>
        </div>

        {!ideas.length && !loading && (
          <div style={{ textAlign: "center", color: C.inkSoft, fontSize: 12.5, fontWeight: 600, marginTop: 40, lineHeight: 1.9, padding: "0 10px" }}>
            {t.aiEmptyState}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", color: C.inkSoft, fontSize: 12.5, fontWeight: 600, marginTop: 40 }}>{t.aiThinking}</div>
        )}

        {!loading && ideas.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
            {ideas.map((idea) => (
              <div key={idea.id} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: C.ink, lineHeight: 1.6 }}>{idea.title}</div>
                <div style={{ marginTop: 8, fontSize: 11.5, color: C.inkSoft, fontWeight: 600 }}>{t.aiHookLabel}</div>
                <div style={{ marginTop: 3, fontSize: 12, color: C.ink, fontWeight: 500, lineHeight: 1.7 }}>{idea.hook}</div>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                  <Tag size={12} color={C.blueDark} />
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{ fontSize: 10.5, fontWeight: 700, color: C.blueDark, background: C.selectBg, borderRadius: 999, padding: "3px 9px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
