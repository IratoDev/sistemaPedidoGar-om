"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("../src/controlers/user/CreateUserController");
const AuthUserCrontroller_1 = require("./controlers/user/AuthUserCrontroller");
const DetailUserController_1 = require("./controlers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategoryController_1 = require("./controlers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controlers/category/ListCategoryController");
const CreateProductController_1 = require("./controlers/product/CreateProductController");
const ListByCategoryController_1 = require("./controlers/product/ListByCategoryController");
const multer_2 = __importDefault(require("./config/multer"));
const CreatePedidoController_1 = require("./controlers/pedido/CreatePedidoController");
const RemovePedidoController_1 = require("./controlers/pedido/RemovePedidoController");
const AddItemController_1 = require("./controlers/pedido/AddItemController");
const RemoveItemController_1 = require("./controlers/pedido/RemoveItemController");
const SendPedidoController_1 = require("./controlers/pedido/SendPedidoController");
const ListPedidoController_1 = require("./controlers/pedido/ListPedidoController");
const DetailPedidoController_1 = require("./controlers/pedido/DetailPedidoController");
const FinishPedidoController_1 = require("./controlers/pedido/FinishPedidoController");
//rotas user
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserCrontroller_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//rotas categoria
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//rotas Produtos
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
//rotas pedidos
router.post('/pedido', isAuthenticated_1.isAuthenticated, new CreatePedidoController_1.CreatePedidoController().handle);
router.delete('/pedido', isAuthenticated_1.isAuthenticated, new RemovePedidoController_1.RemovePedidoController().handle);
//pedidos item
router.post('/pedido/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/pedido/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/pedido/send', isAuthenticated_1.isAuthenticated, new SendPedidoController_1.SendPedidoController().handle);
router.get('/pedidos', isAuthenticated_1.isAuthenticated, new ListPedidoController_1.ListPedidoController().handle);
router.get('/pedidos/detail', isAuthenticated_1.isAuthenticated, new DetailPedidoController_1.DetailPedidoController().handle);
router.put('/pedido/finish', isAuthenticated_1.isAuthenticated, new FinishPedidoController_1.FinishPedidoController().handle);
//fim rotas user 
