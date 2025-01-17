'use client';
import DashboardEvento from '@/components/evento/DashboardEvento';
import FormSenhaEvento from '@/components/evento/FormSenhaEvento';
import useAPI from '@/data/hooks/useAPI';
import { Convidado, Evento, eventos } from 'core';
import { use, useCallback, useEffect, useState } from 'react';

export default function PaginaAdminEvento(props: any) {
  const params: any = use(props.params);
  const { httpPost } = useAPI();
  const id = params.todos[0];
  const [evento, setEvento] = useState<Evento | null>(null);
  const [senha, setSenha] = useState<string>(params.todos[1] ?? '');

  const presentes = evento?.convidados.filter((c) => c.confirmado) ?? [];
  const ausentes = evento?.convidados.filter((c) => !c.confirmado) ?? [];

  const totalGeral =
    presentes?.reduce((total: number, convidado: Convidado) => {
      return total + convidado.qtdeAcompanhantes + 1;
    }, 0) ?? 0;

  // carrega do mock de dados
  function carregarEvento() {
    const evento = eventos.find((ev) => ev.id === id && ev.senha === senha);
    setEvento(evento ?? null);
  }

  //carrega do servidor de banco de dados
  const obterEvento = useCallback(async () => {
    if (!id || !senha) return;
    const evento = await httpPost('/eventos/acessar', { id, senha });
    setEvento(evento);
  }, [httpPost, id, senha]);

  useEffect(() => {
    carregarEvento();
  }, [id, senha]);

  // useEffect(() => {
  //   obterEvento();
  // }, [obterEvento]);

  return (
    <div className="flex flex-col items-center">
      {evento ? (
        <DashboardEvento
          evento={evento}
          presentes={presentes}
          ausentes={ausentes}
          totalGeral={totalGeral}
          atualizarListaConvidados={obterEvento}
        />
      ) : (
        <FormSenhaEvento
          acessarEvento={obterEvento}
          senha={senha}
          setSenha={setSenha}
        />
      )}
    </div>
  );
}
