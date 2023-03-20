import { createContext, useState } from 'react';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
  return (
    <CarrinhoContext.Provider value={{
      carrinho, setCarrinho,
      quantidadeProdutos, setQuantidadeProdutos,
      valorTotalCarrinho, setValorTotalCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}