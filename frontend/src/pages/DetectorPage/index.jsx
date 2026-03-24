import React, { useState } from 'react';
import Header from '../../components/Header';
import SeletorSintomas from '../../components/SeletorSintomas';
import Resultados from '../../components/Resultados';
import { mockDiagnose } from '../../data';

export default function DetectorPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState([]);
  const [activeTab, setActiveTab] = useState('folhas');
  const [results, setResults] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(sym => sym !== id) : [...prev, id]
    );
  };

  const toggleEnv = (id) => {
    setSelectedEnv(prev => 
      prev.includes(id) ? prev.filter(env => env !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setSelectedEnv([]);
    setResults(null);
  };

  const handleDiagnose = async () => {
    setIsDiagnosing(true);
    setResults(null);
    try {
      const res = await mockDiagnose(selectedSymptoms, selectedEnv);
      setResults(res);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <>
      <Header />
      <main className="detector-main">
        <SeletorSintomas
          selectedSymptoms={selectedSymptoms}
          toggleSymptom={toggleSymptom}
          selectedEnv={selectedEnv}
          toggleEnv={toggleEnv}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          runDiagnosis={handleDiagnose}
          clearAll={clearAll}
          isDiagnosing={isDiagnosing}
        />
        <Resultados 
          results={results} 
          isDiagnosing={isDiagnosing} 
        />
      </main>
    </>
  );
}
