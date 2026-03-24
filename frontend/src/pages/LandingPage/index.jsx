import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const words = ['precisão', 'tecnologia', 'segurança', 'rapidez', 'Leaf Guard'];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    // Velocidade de digitação e deleção
    const typeSpeed = isDeleting ? 50 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        // Pausa quando a palavra está completa
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Próxima palavra quando termina de apagar
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // Adiciona ou remove 1 caractere
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="lp-root">
      {/* Subtle grain overlay */}
      <div className="lp-noise" />

      {/* ── Nav ── */}
      <header className="lp-header-fixed">
        <nav className="lp-nav">
          <a className="lp-logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <div className="lp-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 7c-2 0-3 1.5-3 3.5 0 2 3 4.5 3 4.5s3-2.5 3-4.5c0-2-1-3.5-3-3.5z" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="lp-logo-text">LeafGuard</span>
          </a>
          <ul className="lp-nav-links">
            <li><a href="#" className="lp-nav-cta" onClick={(e) => { e.preventDefault(); navigate('/detector'); }}>Começar agora</a></li>
          </ul>
        </nav>
      </header>

      {/* ── Hero ── */}
      <main className="lp-hero">
        {/* Left content */}
        <div className="lp-left">
          <div className="lp-eyebrow">Inteligência agrícola</div>

          <h1 className="lp-title">
            Proteja suas<br />
            plantações<br />
            com <span className="word-typist">{text}</span><span className="typing-cursor">|</span>
          </h1>

          <p className="lp-desc">
            Diagnostique doenças nas suas plantas em segundos usando análise visual inteligente de folhas, caule e frutos. A tecnologia do futuro, disponível agora no campo.
          </p>

          <div className="lp-actions">
            <button className="btn-primary" onClick={() => navigate('/detector')}>
              <span>Identificar Doença</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="lp-stats">
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Precisão diagnóstica</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Doenças identificadas</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">12s</span>
              <span className="stat-label">Tempo de análise</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="lp-right">
          <div className="blob-bg" />

          {/* Floating badges */}
          <div className="float-badge badge-tl">
            <div className="badge-icon green">✅</div>
            <div>
              <div className="badge-main">Análise concluída</div>
              <div className="badge-sub">há 2 segundos</div>
            </div>
          </div>

          <div className="float-badge badge-tr">
            <div className="badge-num">98%</div>
            <div className="badge-sub">Confiança</div>
          </div>

          <div className="float-badge badge-br">
            <div className="badge-icon gold">⚡</div>
            <div>
              <div className="badge-main">Resultado Rápido</div>
              <div className="badge-sub">diagnóstico em 12s</div>
            </div>
          </div>

          {/* Main card */}
          <div className="visual-card">
            <div className="vc-scan">
              <div className="scan-corners" />
              <div className="scan-leaf">🌱</div>
              <div className="scan-line" />
            </div>

            <div className="vc-results">
              <div className="result-row">
                <div className="result-dot dot-green" />
                <span className="result-label">Saudável</span>
                <span className="result-pct">94%</span>
              </div>
              <div className="result-row">
                <div className="result-dot dot-amber" />
                <span className="result-label">Míldio precoce</span>
                <span className="result-pct">4%</span>
              </div>
              <div className="result-row">
                <div className="result-dot dot-red" />
                <span className="result-label">Ferrugem</span>
                <span className="result-pct">2%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Feature strip ── */}
      <div className="lp-features">
        {[
          { icon: '🔬', title: 'Diagnóstico Preciso', desc: 'Identificação com 98% de acurácia usando visão computacional avançada.' },
          { icon: '🌾', title: 'Base Completa', desc: 'Cobertura de 50+ doenças em dezenas de culturas agrícolas.' },
          { icon: '💊', title: 'Tratamento Guiado', desc: 'Receba recomendações de defensivos e práticas culturais personalizadas.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="feature-item">
            <div className="fi-icon">{icon}</div>
            <div className="fi-body">
              <div className="fi-title">{title}</div>
              <div className="fi-desc">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
