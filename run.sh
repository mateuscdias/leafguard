#!/bin/bash

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

echo "Ativando ambiente virtual..."
source ./venv/bin/activate

echo  "Instalando dependências..."
pip install -r requirements.txt

echo "🚀 Iniciando backend..."
uvicorn src.app:app --reload &

# Aguarda backend subir (importante!)
sleep 3

echo "Iniciando frontend..."
cd frontend
npm start