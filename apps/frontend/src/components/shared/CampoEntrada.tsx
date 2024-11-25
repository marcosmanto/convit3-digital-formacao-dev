export interface CampoEntradaProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (event: any) => void;
  descricao?: string;
  observacao?: string;
  erro?: string;
  outterClassName?: string;
}

function CampoEntrada(props: CampoEntradaProps) {
  function propsInput() {
    const propsInput = { ...props };
    delete propsInput.descricao;
    delete propsInput.observacao;
    delete propsInput.erro;
    delete propsInput.outterClassName;
    return propsInput;
  }
  return (
    <div className={`flex flex-col gap-2 ${props.outterClassName ?? ''}`}>
      <div className="flex flex-col">
        <label htmlFor="123" className="text-lg font-black text-white">
          {props.label}

          {props.descricao && (
            <p className="text-sm font-light text-zinc-400 -mt-1">
              {props.descricao}
            </p>
          )}
        </label>
      </div>
      <input
        id={props.label}
        {...propsInput()}
        type={props.type ?? 'text'}
        className="w-full px-3 py-2 border focus:border-white/30
        border-white/20
        focus:bg-zinc-500/20 bg-black/50 rounded-md"
      />
      {props.erro && (
        <span className="pl-2 text-sm text-red-500">{props.erro}</span>
      )}
      {!props.erro && props.observacao && (
        <span className="pl-2 text-sm text-yellow-200/60">
          {props.observacao}
        </span>
      )}
    </div>
  );
}

export default CampoEntrada;
