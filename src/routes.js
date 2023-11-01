const express = require('express');
const router = express.Router();


const ClientesController = require('./controllers/ClientesController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');
const DividirContaController = require ('./controllers/DividirContaController');
const RelatorioDeProducaoController = require ('./controllers/RelatorioDeProducaoController');
const usuarioController = require('./controllers/usuarioController');
const sessaoController = require ('./controllers/sessaoController');
const { usuarioAutenticado } = require ('./middlewares/usuarioAutenticado')

//sessão
router.post('/sessao', sessaoController.criar)

//usuario
router.get('/usuarios', usuarioAutenticado, usuarioController.buscarTodos)
router.post('/usuarios', usuarioController.inserir)

router.get('/clientes',  usuarioAutenticado, ClientesController.buscarTodos);
router.get('/cliente/:cliente_id', usuarioAutenticado, ClientesController.buscarUm);
router.post('/cliente', usuarioAutenticado, ClientesController.inserir);
router.put('/cliente/:cliente_id', usuarioAutenticado, ClientesController.alterar);
router.delete('/cliente/:cliente_id', usuarioAutenticado, ClientesController.excluir);

router.get('/funcionarios', usuarioAutenticado, FuncionarioController.buscarTodosFunc);
router.get('/funcionario/:func_id', usuarioAutenticado, FuncionarioController.buscarUmFunc);
router.post('/funcionario', usuarioAutenticado, FuncionarioController.inserirFunc);
router.put('/funcionario/:func_id', usuarioAutenticado, FuncionarioController.alterarFunc);
router.delete('/funcionario/:func_id', usuarioAutenticado, FuncionarioController.excluirFunc);


router.get('/produtos', usuarioAutenticado, ProdutoController.buscarTodosProd);
router.get('/produto/:prod_id', usuarioAutenticado, ProdutoController.buscarUmProdu);
router.post('/produtos', usuarioAutenticado, ProdutoController.inserirProd);
router.put('/produto/:prod_id', usuarioAutenticado, ProdutoController.alterarProdu);
router.delete('/produto/:prod_id', usuarioAutenticado, ProdutoController.excluirProdu);


router.get('/pedidos', usuarioAutenticado, PedidoController.buscarTodosPedi);
router.post('/pedidos', usuarioAutenticado, PedidoController.inserirProdnoPedi);

router.get('/contas/:conta_id', usuarioAutenticado, DividirContaController.buscarUmaConta);

router.get('/DiviContasPediPag/:conta_id', usuarioAutenticado, DividirContaController.DividirUmaContaPediPag);
router.get('/DividirContaIgual/:conta_id', usuarioAutenticado, DividirContaController.DividirContaIgual);

router.get('/RelatorioTotalParaCozinha', usuarioAutenticado, RelatorioDeProducaoController.RelatorioTotalParaCozinha);
router.get('/RelatorioUnicoParaCozinha/:pedido_id', usuarioAutenticado, RelatorioDeProducaoController.RelatorioUnicoParaCozinha);



module.exports = router;

