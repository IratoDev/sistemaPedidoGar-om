import { Router} from "express";
import multer from "multer";

import {CreateUserController} from '../src/controlers/user/CreateUserController'
import { AuthUserController } from "./controlers/user/AuthUserCrontroller";
import { DetailUserController } from "./controlers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controlers/category/CreateCategoryController";
import { ListCategoryController } from "./controlers/category/ListCategoryController";

import { CreateProductController } from "./controlers/product/CreateProductController";
import { ListByCategoryController } from "./controlers/product/ListByCategoryController";
import uploadConfig from "./config/multer"

import { CreatePedidoController } from "./controlers/pedido/CreatePedidoController";
import { RemovePedidoController } from "./controlers/pedido/RemovePedidoController";

import { AddItemController } from "./controlers/pedido/AddItemController";
import { RemoveItemController } from "./controlers/pedido/RemoveItemController";

import { SendPedidoController } from "./controlers/pedido/SendPedidoController";
import { ListPedidoController } from "./controlers/pedido/ListPedidoController";
import { DetailPedidoController } from "./controlers/pedido/DetailPedidoController";
import { FinishPedidoController } from "./controlers/pedido/FinishPedidoController";

//rotas user
const router = Router();
const upload = multer(uploadConfig.upload('./tmp'))

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

//rotas categoria

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle )

//rotas Produtos
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//rotas pedidos

router.post('/pedido', isAuthenticated, new CreatePedidoController().handle)
router.delete('/pedido', isAuthenticated, new RemovePedidoController().handle)

//pedidos item
router.post('/pedido/add', isAuthenticated, new AddItemController().handle)
router.delete('/pedido/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/pedido/send', isAuthenticated, new SendPedidoController().handle )
router.get('/pedidos', isAuthenticated, new ListPedidoController().handle)
router.get('/pedidos/detail', isAuthenticated, new DetailPedidoController().handle)
router.put('/pedido/finish', isAuthenticated, new FinishPedidoController().handle)

export {router};

//fim rotas user 