import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [symptoms, setSymptoms] = useState({});
  const [search, setSearch] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load symptoms from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/symptoms")
      .then(res => setSymptoms(res.data))
      .catch(err => console.error("Erro ao carregar sintomas:", err));
  }, []);

  // Toggle symptom
  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Toggle environment
  const handleEnvChange = (env) => {
    setEnvironment(prev =>
      prev.includes(env)
        ? prev.filter(e => e !== env)
        : [...prev, env]
    );
  };

  // Submit diagnosis
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/diagnose", {
        symptoms: selectedSymptoms,
        environmental_factors: environment
      });

      setResults(res.data.results || []);
    } catch (err) {
      console.error("Erro ao diagnosticar:", err);
      setResults([]);
    }
    setLoading(false);
  };

  // Filter symptoms by search
  const filteredSymptoms = Object.entries(symptoms).filter(
    ([key, desc]) =>
      desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>🌿 LeafGuard: Uma Ferramenta para diagnóstico de doenças de plantações</h1>

      {/* SEARCH */}
      <h2>Sintomas</h2>
      <input
        type="text"
        placeholder="🔍 Buscar sintoma..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      {/* SYMPTOMS LIST */}
      <div style={{
        maxHeight: "300px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        padding: "10px"
      }}>
        {filteredSymptoms.length === 0 && <p>Nenhum sintoma encontrado.</p>}

        {filteredSymptoms.map(([key, desc]) => (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(key)}
                onChange={() => handleSymptomChange(key)}
              />
              {desc}
            </label>
          </div>
        ))}
      </div>

      {/* ENVIRONMENT */}
      <h2>Fatores Ambientais</h2>
      {[
        { key: "high_humidity", label: "Alta umidade" },
        { key: "hotter_temperatures", label: "Temperaturas altas" },
        { key: "rain", label: "Chuva" },
        { key: "plagues", label: "Pragas" }
      ].map((env) => (
        <div key={env.key}>
          <label>
            <input
              type="checkbox"
              checked={environment.includes(env.key)}
              onChange={() => handleEnvChange(env.key)}
            />
            {env.label}
          </label>
        </div>
      ))}

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: loading ? "#999" : "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Diagnosticando..." : "Diagnosticar"}
      </button>

      {/* RESULTS */}
      <h2>Resultados</h2>

      {results.length === 0 && !loading && (
        <p>Nenhum resultado encontrado.</p>
      )}

      {results.map((r, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9"
          }}
        >
          <h3>{r.disease}</h3>

          <p>
            <strong>Confiança:</strong>{" "}
            {(r.confidence * 100).toFixed(1)}%
          </p>

          <p><strong>Sintomas relacionados:</strong></p>
          <ul>
            {r.symptoms?.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>

          <p><strong>Fatores ambientais:</strong></p>
          <ul>
            {r.environmental_factors?.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;