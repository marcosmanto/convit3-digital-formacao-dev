'use client';
import AcessarViaQrCode from '@/components/evento/AcessarViaQrCode';
import InformacoesEvento from '@/components/evento/InformacoesEvento';
import CopiarClipboard from '@/components/shared/CopiarClipboard';
import Janela from '@/components/shared/Janela';
import useEvento from '@/data/hooks/useEvento';
import { IconFingerprint, IconLink } from '@tabler/icons-react';
import { Evento } from 'core';
import { useEffect, useState } from 'react';

function EventoSucesso() {
  const { evento, carregarEvento } = useEvento();

  const [urlAtual, setUrlAtual] = useState('');

  useEffect(() => {
    setUrlAtual(window.location.origin);
    carregarEvento('aniversario-joao');
  }, []);

  return evento ? (
    <div>
      <Janela
        label="Seu evento foi criado:"
        titulo={evento.nome}
        imagem={evento.imagem}
        background={evento.imagemBackground}
      >
        <InformacoesEvento esconderNome={true} evento={evento as Evento} />
        <div className="flex gap-5 items-center py-6">
          <div className="flex-1 flex flex-col gap-5">
            <CopiarClipboard
              icone={IconLink}
              label="Link para convidar"
              texto={`${urlAtual}/convite/${evento.alias}`}
            />
            <CopiarClipboard
              icone={IconLink}
              label="Link administrador"
              texto={`${urlAtual}/evento/admin/${evento.id}`}
            />
            <CopiarClipboard
              icone={IconFingerprint}
              label="Senha administrador"
              texto={evento.senha ?? ''}
            />
          </div>
          <AcessarViaQrCode evento={evento as Evento} />
        </div>
      </Janela>
    </div>
  ) : null;
}

export default EventoSucesso;
