import { createContext, useState } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName ="Pagamento";

export const PagamentoProvider = ({ children }) => {
    const tiposPagamento = [
    {
        nome: 'Boleto',
        juros: 1,
        id: 1
    },
    {
        nome: 'Cartão de Crédito',
        juros: 1.3,
        id: 2
    },
    {
        nome: 'PIX',
        juros: 1,
        id: 3
    },
    {
        nome: 'Crediário',
        juros: 1.5,
        id: 4
    }]

    const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0]);

    function mudarFormaPagamento(id) {
        const pagamentoAtual = tiposPagamento.find(pagamento => pagamento.id === id);

        setFormaPagamento(pagamentoAtual)
    }

    return(
        <PagamentoContext.Provider value={{
            tiposPagamento,
            formaPagamento,
            setFormaPagamento,
            mudarFormaPagamento
        }}>
            {children}
        </PagamentoContext.Provider>
    )
}