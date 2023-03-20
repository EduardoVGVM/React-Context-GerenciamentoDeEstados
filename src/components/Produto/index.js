import { Container } from './styles';
import { memo, useContext, useEffect} from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CarrinhoContext } from 'common/context/Carrinho';
import { PagamentoContext } from 'common/context/Pagamento';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { carrinho, setCarrinho,
    quantidadeProdutos, setQuantidadeProdutos,
    valorTotalCarrinho, setValorTotalCarrinho } = useContext(CarrinhoContext);

  const { formaPagamento } = useContext(PagamentoContext)
    const produtoNoCarrinho = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)

  function mudarQuantidade(id, quantidade) {
    return carrinho.map(itemDoCarrinho => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    })
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id);
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho(carrinhoAnterior =>
        [...carrinhoAnterior, novoProduto]
      )
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1))
  }

  function removerProduto(id) {
    const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id);
    const oUltimo = produto.quantidade === 1;
    if (oUltimo) {
      return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho =>
        itemDoCarrinho.id !== id));
    }
    setCarrinho(mudarQuantidade(id, -1))
  }

  useEffect(() => {
    const { novoTotal, novaQuantidade } = carrinho.reduce((contador, produto) =>
    ({
      novaQuantidade: contador.novaQuantidade + produto.quantidade,
      novoTotal: contador.novoTotal + (produto.valor * produto.quantidade)
    }), {
      novaQuantidade: 0,
      novoTotal: 0
    });

    setQuantidadeProdutos(novaQuantidade);
    setValorTotalCarrinho(novoTotal * formaPagamento.juros);

  }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento]
  )

  return (
    <Container>
      <div>
        <img
          src={`/assets/${foto}.png`}
          alt={`foto de ${nome}`}
        />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          color="secondary"
          onClick={() => removerProduto(id)}
          disabled={!produtoNoCarrinho}
        >
          <RemoveIcon />
        </IconButton>
        {produtoNoCarrinho?.quantidade || 0}
        <IconButton
          color="primary"
          onClick={() => adicionarProduto({ nome, foto, id, valor })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)