"use strict";
exports.__esModule = true;
exports.ModalOrder = void 0;
var react_modal_1 = require("react-modal");
var style_module_scss_1 = require("./style.module.scss");
var fi_1 = require("react-icons/fi");
var image_1 = require("next/image");
function ModalOrder(_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, order = _a.order, handleFinishOrder = _a.handleFinishOrder;
    var customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    };
    return (React.createElement(react_modal_1["default"], { isOpen: isOpen, onRequestClose: onRequestClose, style: customStyles },
        React.createElement("button", { type: 'button', onClick: onRequestClose, className: "react-modal-close", style: { background: 'transparent', border: 0 } },
            React.createElement(fi_1.FiX, { size: 45, color: '#f34748' })),
        React.createElement("div", { className: style_module_scss_1["default"].conteiner },
            React.createElement("h2", null, "Detalhes do pedido"),
            React.createElement("span", { className: style_module_scss_1["default"].table },
                "mesa : ",
                React.createElement("strong", null, order[0].pedido.table)),
            order.map(function (item) { return (React.createElement("section", { key: item.id, className: style_module_scss_1["default"].containerItem },
                React.createElement(image_1["default"], { src: item.product.banner, alt: 'Foto do produto', width: 120, height: 120 }),
                React.createElement("span", null,
                    item.amount,
                    " - ",
                    React.createElement("strong", null, item.product.name)),
                React.createElement("span", { className: style_module_scss_1["default"].description }, item.product.description))); }),
            React.createElement("button", { className: style_module_scss_1["default"].buttonOrder, onClick: function () { return handleFinishOrder(order[0].pedido_id); } }, "concluir pedido"))));
}
exports.ModalOrder = ModalOrder;
