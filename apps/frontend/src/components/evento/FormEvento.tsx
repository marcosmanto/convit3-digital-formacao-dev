import useEvento from '@/data/hooks/useEvento';
import Passos from '../shared/Passos';
import CampoEntrada from '../shared/CampoEntrada';
import { Alias, Data } from 'core';

function FormEvento() {
  const { evento, aliasValido, alterarEvento, salvarEvento } = useEvento();
  const labels = [
    'Identificação do Evento',
    'Local e Data',
    'Informações Finais',
  ];

  const permiteProximoPasso: boolean[] = [
    evento.alias !== undefined && evento.nome !== undefined && aliasValido,
    // => !!evento.alias && !!evento.nome && aliasValido (same as above) //
    !!evento.data && !!evento.local, // precisa das duas informações (data e local) para liberar o passo seguinte
    !!evento.descricao && (evento.publicoEsperado ?? 0) > 0,
  ];
  return (
    <div>
      <Passos
        labels={labels}
        labelAcao="Salvar"
        acao={salvarEvento}
        permiteProximoPasso={permiteProximoPasso}
      >
        <div className="flex flex-col gap-5">
          <CampoEntrada
            label="Identificador"
            descricao="Identificador único e exclusivo para o evento (usado na URL)"
            observacao="O identificador deve ser único e não pode ser alterado"
            erro={aliasValido ? '' : 'Alias já foi utilizado em outro evento'}
            value={Alias.formatar(evento.alias ?? '')}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                alias: e.target.value,
              })
            }
          />
          <CampoEntrada
            label="Nome"
            descricao='Nome do evento (ex.: "Festa de Aniversário do João")'
            value={evento.nome ?? ''}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                nome: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <CampoEntrada
            label="Data"
            descricao="Data e hora em que o evento ocorrerá"
            value={Data.formatar(evento.data ?? new Date())}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                data: Data.desformatar(e.target.value),
              })
            }
            type="datetime-local"
          />
          <CampoEntrada
            label="Local"
            descricao="Local onde o evento será realizado"
            value={evento.local ?? ''}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                local: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <CampoEntrada
            label="Descrição"
            descricao='Descrição do evento (ex.: "Só entra se trouxer presente!")'
            value={evento.descricao ?? ''}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                descricao: e.target.value,
              })
            }
          />
          <CampoEntrada
            label="Imagem"
            descricao="URL da imagem que será exibida no convite"
            observacao="Campo opcional"
            value={evento.imagem ?? ''}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                imagem: e.target.value,
              })
            }
          />
          <CampoEntrada
            label="Background"
            descricao="URL da imagem que será exibida como background no convite"
            observacao="Campo opcional"
            value={evento.imagemBackground ?? ''}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                imagemBackground: e.target.value,
              })
            }
          />
          <CampoEntrada
            label="Público Esperado"
            descricao="Total de convidados e acompanhantes esperados"
            value={evento.publicoEsperado ?? 1}
            onChange={(e) =>
              alterarEvento({
                ...evento,
                publicoEsperado: Number(e.target.value),
              })
            }
            type="number"
            min={1}
          />
        </div>
      </Passos>
    </div>
  );
}

export default FormEvento;
