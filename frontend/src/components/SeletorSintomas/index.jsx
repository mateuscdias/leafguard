import React from 'react';
import { symptoms, envFactors } from '../../data';
import './style.css';

export default function SeletorSintomas({
  selectedSymptoms,
  toggleSymptom,
  selectedEnv,
  toggleEnv,
  activeTab,
  setActiveTab,
  runDiagnosis,
  clearAll,
  isDiagnosing
}) {
  return (
    <div className="panel">
      <div className="panel-title">Observações de Campo</div>
      <div className="panel-subtitle">Selecione os sintomas visíveis na planta e as condições ambientais recentes.</div>

      <div className="category-tabs">
        <button className={`tab-btn ${activeTab === 'folhas' ? 'active' : ''}`} onClick={() => setActiveTab('folhas')}>🍃 Folhas</button>
        <button className={`tab-btn ${activeTab === 'caule' ? 'active' : ''}`} onClick={() => setActiveTab('caule')}>🌿 Caule & Raízes</button>
        <button className={`tab-btn ${activeTab === 'frutos' ? 'active' : ''}`} onClick={() => setActiveTab('frutos')}>🍅 Flores & Frutos</button>
        <button className={`tab-btn ${activeTab === 'planta' ? 'active' : ''}`} onClick={() => setActiveTab('planta')}>🌱 Planta Toda</button>
      </div>

      <div className={`symptom-group ${activeTab === 'folhas' ? 'visible' : ''}`}>
        <div className="symptom-group-label">Sintomas nas folhas</div>
        <div className="symptom-grid">
          {symptoms.folhas.map(s => (
            <div key={s.id} className={`symptom-item ${selectedSymptoms.includes(s.id) ? 'checked' : ''}`} onClick={() => toggleSymptom(s.id)}>
              <div className="symptom-checkbox"></div>
              <span className="symptom-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`symptom-group ${activeTab === 'caule' ? 'visible' : ''}`}>
        <div className="symptom-group-label">Sintomas no caule e raízes</div>
        <div className="symptom-grid">
          {symptoms.caule.map(s => (
            <div key={s.id} className={`symptom-item ${selectedSymptoms.includes(s.id) ? 'checked' : ''}`} onClick={() => toggleSymptom(s.id)}>
              <div className="symptom-checkbox"></div>
              <span className="symptom-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`symptom-group ${activeTab === 'frutos' ? 'visible' : ''}`}>
        <div className="symptom-group-label">Sintomas em flores e frutos</div>
        <div className="symptom-grid">
          {symptoms.frutos.map(s => (
            <div key={s.id} className={`symptom-item ${selectedSymptoms.includes(s.id) ? 'checked' : ''}`} onClick={() => toggleSymptom(s.id)}>
              <div className="symptom-checkbox"></div>
              <span className="symptom-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`symptom-group ${activeTab === 'planta' ? 'visible' : ''}`}>
        <div className="symptom-group-label">Sintomas gerais da planta</div>
        <div className="symptom-grid">
          {symptoms.planta.map(s => (
            <div key={s.id} className={`symptom-item ${selectedSymptoms.includes(s.id) ? 'checked' : ''}`} onClick={() => toggleSymptom(s.id)}>
              <div className="symptom-checkbox"></div>
              <span className="symptom-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="env-section">
        <div className="env-title">🌦 Fatores Ambientais</div>
        <div className="env-pills">
          {envFactors.map(e => (
            <button key={e.id} className={`env-pill ${selectedEnv.includes(e.id) ? 'active' : ''}`} onClick={() => toggleEnv(e.id)}>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className="selection-bar">
        <span className="selected-count">
          <strong>{selectedSymptoms.length}</strong> sintomas selecionados
        </span>
        <button className="clear-btn" onClick={clearAll}>Limpar seleção</button>
      </div>

      <button className="diagnose-btn" onClick={runDiagnosis} disabled={selectedSymptoms.length === 0 || isDiagnosing}>
        🔍 Diagnosticar
      </button>
    </div>
  );
}
