import React, { useEffect, useState } from 'react';
import { DISEASE_INFO, typeLabels, symptoms as allSymptomsData } from '../../data';
import './style.css';

export default function Resultados({ results, isDiagnosing }) {
  // We use this little effect to trigger the CSS transition on the bars
  const [animatedResults, setAnimatedResults] = useState([]);

  useEffect(() => {
    if (results) {
      // Small timeout to allow the DOM to render the 0% width first before changing to target width
      const timer = setTimeout(() => {
        setAnimatedResults(results);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [results]);

  if (isDiagnosing) {
    return (
      <div className="results-panel" id="results-panel">
        <div className="loading-state">
          <div className="spinner"></div>
          <div className="loading-text">Consultando base de conhecimento...</div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-panel" id="results-panel">
        <div className="empty-state">
          <div className="empty-icon">🔬</div>
          <div className="empty-title">Aguardando observações</div>
          <div className="empty-text">Selecione ao menos um sintoma e clique em Diagnosticar para ver as hipóteses.</div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="results-panel" id="results-panel">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">Nenhuma hipótese encontrada</div>
          <div className="empty-text">Tente selecionar mais sintomas ou verificar fatores ambientais.</div>
        </div>
      </div>
    );
  }

  // Flatten the symptoms array to lookup labels easily
  const allSymptomsFlattened = Object.values(allSymptomsData).flat();
  const getSymptomLabel = (id) => {
    const found = allSymptomsFlattened.find(x => x.id === id);
    return found ? found.label : id;
  };

  return (
    <div className="results-panel" id="results-panel">
      <div className="results-header">
        <div className="results-title">Hipóteses Diagnósticas</div>
        <span className="results-count">{results.length} encontradas</span>
      </div>

      {results.map((r, i) => {
        const info = DISEASE_INFO[r.disease] || { type: 'fungal', treatment: 'Consulte um agrônomo.' };
        const pct = Math.round(r.confidence * 100);
        const type = info.type;

        // Note: we can't easily know exactly which ones were "present" since we don't pass selectedSymptoms to this component
        // but r.symptoms are the disease's symptoms, and r.suggested_symptoms are the ones NOT selected.
        // So present symptoms are r.symptoms minus r.suggested_symptoms
        const presentSyms = r.symptoms.filter(s => !r.suggested_symptoms.includes(s));

        return (
          <div key={r.disease} className={`result-card ${i === 0 ? 'top' : ''}`}>
            <div className="card-header">
              <div className="card-disease">{r.disease}</div>
              <span className="top-badge">Mais provável</span>
            </div>
            
            <div className={`type-badge ${type}`}>{typeLabels[type] || type}</div>
            
            <div className="confidence-bar-wrap">
              <div className="confidence-label">
                <span className="confidence-text">Confiança</span>
                <span className="confidence-value">{pct}%</span>
              </div>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: animatedResults === results ? `${pct}%` : '0%' }}
                ></div>
              </div>
            </div>

            {presentSyms.length > 0 && (
              <div className="card-section">
                <div className="card-section-title">Sintomas Identificados</div>
                <div className="symptom-tags">
                  {presentSyms.map(s => (
                    <span key={s} className="symptom-tag present">✓ {getSymptomLabel(s)}</span>
                  ))}
                </div>
              </div>
            )}

            {r.suggested_symptoms.length > 0 && (
              <div className="card-section">
                <div className="card-section-title">Verificar Também</div>
                <div className="symptom-tags">
                  {r.suggested_symptoms.slice(0, 3).map(s => (
                    <span key={s} className="symptom-tag suggested">? {getSymptomLabel(s)}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="card-section">
              <div className="card-section-title">Recomendação</div>
              <div style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                {info.treatment}
              </div>
            </div>
          </div>
        );
      })}

      <div className="disclaimer">
        <span className="disclaimer-icon">⚠️</span>
        <span>Este sistema é de <strong>apoio à decisão</strong> e não substitui laudo técnico, análise laboratorial ou recomendação agronômica oficial.</span>
      </div>
    </div>
  );
}
