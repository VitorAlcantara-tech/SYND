"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Upload from "../Upload";

export default function Home() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [resposta, setResposta] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendedores, setVendedores]: any = useState([])
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function selecionarArquivo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setArquivo(null);
      setNomeArquivo("");
      return;
    }

    const formatosPermitidos = [".json", ".csv", ".txt"];
    const arquivoValido = formatosPermitidos.some((formato) =>
      file.name.toLowerCase().endsWith(formato)
    );

    if (!arquivoValido) {
      setErro("Selecione um arquivo .json, .csv ou .txt válido.");
      setArquivo(null);
      setNomeArquivo("");
      return;
    }

    setErro("");
    setArquivo(file);
    setNomeArquivo(file.name);
  }

  async function analisarReuniao() {
    if (!arquivo) {
      setErro("Selecione o arquivo transcricao.json antes de analisar.");
      return;
    }

    setLoading(true);
    setErro("");
    setResposta("");

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      const response = await fetch(`${apiUrl}/api/analisar-reuniao`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao analisar reunião.");
      }

      setResposta(data.resposta);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro inesperado ao conectar com o backend.");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() =>{
    setVendedores([
      { "nome": "Vitor Fernandes" }
    ]);
},[])

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
    <Upload/>
    </main>
  );
}