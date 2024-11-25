import { useState } from 'react';

export interface PassosProps {
  labels: string[];
  labelAcao: string;
  permiteProximoPasso?: boolean[];
  acao: () => void;
  children: any;
}
function Passos(props: PassosProps) {
  const [passoAtual, setPassoAtual] = useState(0);

  const semPassoAnterior = passoAtual === 0;
  const semProximoPasso = passoAtual === props.labels.length - 1;
  const passoAnterior = () => {
    if (semPassoAnterior) return;
    setPassoAtual(passoAtual - 1);
  };
  const proximoPasso = () => {
    if (semProximoPasso) return;
    setPassoAtual(passoAtual + 1);
  };

  function renderizarLabels() {
    return (
      <div className="flex gap-4 select-none">
        {props.labels.map((label, i) => {
          const selecionado = passoAtual === i;
          return (
            <div className="flex gap-2 items-center" key={i}>
              <span
                className={`
                    w-9 h-9 rounded-full
                    ${selecionado ? 'bg-white text-black' : 'bg-zinc-700 text-zinc-400'}
                    flex
                    justify-center
                    items-center
                  `}
              >
                {i + 1}
              </span>
              <span className={selecionado ? 'text-white' : 'text-zinc-600'}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  const permiteProximoPasso = props.permiteProximoPasso?.[passoAtual] ?? true;

  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="self-center">{renderizarLabels()}</div>
      <div>{props.children[passoAtual]}</div>
      <div className="flex justify-between">
        <button
          className={`botao
            ${
              semPassoAnterior
                ? 'bg-zinc-400 cursor-not-allowed opacity-50'
                : 'bg-zinc-700 hover:bg-zinc-600 text-white'
            }`}
          onClick={passoAnterior}
          disabled={semPassoAnterior}
        >
          <span>Anterior</span>
        </button>
        {semProximoPasso ? (
          <button
            className={`botao
               ${
                 !permiteProximoPasso
                   ? 'bg-zinc-400 cursor-not-allowed opacity-50'
                   : 'bg-green-700 hover:bg-green-600 text-white'
               }


              `}
            disabled={!permiteProximoPasso}
            onClick={props.acao}
          >
            <span>{props.labelAcao}</span>
          </button>
        ) : (
          <button
            className={`botao
            ${
              semProximoPasso || !permiteProximoPasso
                ? 'bg-zinc-400 cursor-not-allowed opacity-50'
                : 'bg-green-700 hover:bg-green-600 text-white'
            }`}
            onClick={proximoPasso}
            disabled={semProximoPasso || !permiteProximoPasso}
          >
            <span>Próximo</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Passos;
