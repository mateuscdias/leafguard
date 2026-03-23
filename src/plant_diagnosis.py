import os
import json
from pyswip import Prolog, Functor, Variable, Query
from typing import List, Dict, Tuple, Optional
from exceptions import LoadingError,NotDiagnosisError,NotGettingInformationError

class PlantDiagnoser:

    '''Python API class for plant diseases inference using PROLOG'''

    def __init__(self,prolog_file:str = "diagnoser.pl"):

        '''
        Initialize the diagnosis system

        Args:

            prolog_file Path to the PROLOG file containing the diagnoser code
        '''
        self.prolog = Prolog()
        self.load_knowledge_base(prolog_file)
        self.symptom_descriptions = self._load_symptoms_descriptions()


    def load_knowledge_base(self, prolog_file:str):

        '''Load the PROLOG knowledge base'''

        try:

            self.prolog.consult(prolog_file)
        except Exception as e:
            raise LoadingError(f"Could not load: {prolog_file}, {e}")
    
    def _load_symptoms_descriptions(self) -> Dict[str,str]:
        '''Load Symptoms descriptions from PROLOG'''

        descriptions = {}

        try:
            for result in self.prolog.query("symptom(Symptom,Description)"):
                descriptions[result['Symptom']] = result['Description']
        except Exception as e:

            raise LoadingError("Could not load the symptoms")
    
        return descriptions

    def diagnose(self,symptoms: List[str],environmental_factors: List[str] = None, min_confidence:float = 0.5) -> List[Dict]:

        '''Diagnose plant diseases based on symptoms and environmental factors

            Args:
            
                symptoms: List of observed symptoms,
                environmental_factors: List of environmental conditions
                min_confidence: Minimum confidence threshold (0-1)
            
            Returns: 
                List of dictionaries with diagnosis results
        '''

        if environmental_factors is None:
            environmental_factors = []

        results = []

        try:
            symptoms_str = self._list_to_prolog(symptoms)
            env_str = self._list_to_prolog(environmental_factors)

            query = f'diagnose({symptoms_str},{env_str},Disease,Confidence)'
            
            for result in self.prolog.query(query):

                if result['Confidence'] >= min_confidence:
                    suggested = self.suggest_additional_symptoms(result['Disease'],symptoms)

                    results.append({
                            'disease': result['Disease'],
                            'confidence': result['Confidence'],
                            'symptoms': self.get_disease_symptoms(result['Disease']),
                            'environmental_factors': self.get_disease_environment(result['Disease']),
                            'suggested_symptoms': suggested
                        })
                    
                    results.sort(key=lambda x: x['confidence'],reverse=True)
        except Exception as e:
            
            raise NotDiagnosisError(f"Could not diagnose: {e}")
    
    def diagnose_with_weights(self, symptoms:List[str],environmental_factors: List[str] = None, min_score:float = 0.6):

        """
        Diagnose using weighted scoring (70% symptoms, 30% environment)
        
        Args:
            symptoms: List of observed symptoms
            environmental_factors: List of environmental conditions
            min_score: Minimum confidence threshold (0-1)
            
        Returns:
            List of dictionaries with diagnosis results
        """

        if environmental_factors is None:
            environmental_factors = []
        
        results = []

        try:
            symptoms_str = self._list_to_prolog(symptoms)
            env_str = self._list_to_prolog(environmental_factors)

            for result in self.prolog.query(f"diagnose_weighted({symptoms_str},{env_str},Disease,Score)"):

                if result['Score'] >= min_score:
                    results.append({
                        'disease': result['Disease'],
                        'score': result['Score']
                    })

            results.sort(key=lambda x: x['score'], reverse=True)
        except Exception as e:

            raise NotDiagnosisError(f"Could not diagnose: {e}")
        
        return results

    def get_possible_diseases(self, symptoms: List[str]) -> List[dict]:

        """
        Get all possible diseases based on symptoms only
        
        Args:
            symptoms: List of observed symptoms
            
        Returns:
            List of possible diseases with confidence scores
        """

        results = []

        try:
            symptoms_str = self._list_to_prolog(symptoms)
            
            for result in self.prolog.query(f"possible_diseases({symptoms_str},Disease,Confidence)"):

                results.append({
                    'disease': result['Disease'],
                    'confidence': result['Confidence']
                })

            results.sort(key=lambda x: x['confidence'], reverse= True)
        
        except Exception as e:

            raise NotDiagnosisError(f"Error getting possible disease: {e}")

        return results

    def get_disease_symptoms(self,disease:str) -> List[str]:
        """Get symptoms for a specific disease"""

        symptoms = []

        try:
            for result in self.prolog.query(f"disease_symptoms({disease}, Symptoms)"):

                symptoms = result["Symptoms"]
                break
        except Exception as e:
                raise NotGettingInformationError(f"Could not get the symptoms of the disease: {e}")
        
        return symptoms
    
    def get_disease_type(self, disease:str):

        """Get the type of disease (fungal, bacterial, viral)"""
        try:
            for result in self.prolog.query(f"disease_type({disease}, Type)"):
                return result['Type']
        except Exception as e:
            raise NotGettingInformationError(f"Error getting disease type: {e}")
        return "Unknown"
    
    def get_disease_environment(self, disease: str) -> List[str]:
        """Get environmental factors for a specific disease"""
        environment = []
        try:
            for result in self.prolog.query(f"disease_environment({disease}, Environment)"):
                environment = result['Environment']
                break
        except Exception as e:
            raise NotGettingInformationError(f"Error getting disease environment: {e}")
        return environment
    
    def list_all_diseases(self) -> List[str]:
        """List all diseases in the knowledge base"""
        diseases = []
        try:
            for result in self.prolog.query("list_all_diseases(Diseases)"):
                diseases = result['Diseases']
                break
        except Exception as e:
            print(f"Error listing diseases: {e}")
        return diseases
    
    def get_available_symptoms(self) -> Dict[str,str]:
        """Get all available symptoms with descriptions"""
        return self.symptom_descriptions
    
    def _list_to_prolog(self, lst: List[str]) -> str:

        '''Convert Python list to PROLOG list syntax'''
        
        if not lst:
            return "[]"
        
        escaped_items = []

        for item in lst:

            escaped_item = item.replace("'", "\\'")
            escaped_items.append(f"'{escaped_item}'")
        
        return "[" + ", ".join(escaped_items) + "]"
    
    def suggest_additional_symptoms(self, disease: str, observed_symptoms: List[str]) -> List[str]:
        """Suggest additional symptoms to check for a suspected disease"""
        all_symptoms = self.get_disease_symptoms(disease)
        return [s for s in all_symptoms if s not in observed_symptoms]