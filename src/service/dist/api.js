"use strict";
exports.__esModule = true;
exports.setupApiClient = void 0;
var axios_1 = require("axios");
var nookies_1 = require("nookies");
//erros
var AuthTokenError_1 = require("./errors/AuthTokenError");
//função loginout
var AuthContext_1 = require("../contexts/AuthContext");
function setupApiClient(ctx) {
    if (ctx === void 0) { ctx = undefined; }
    var cookies = nookies_1.parseCookies(ctx); //pegar nosso cooke
    var api = axios_1["default"].create({
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
            Authorization: "Bearer " + cookies['@nextauth.token'] //se tiver algum cooke que tiver o nosso beares loga se não desloga
        }
    });
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            //qualquer erro 401 (não autorizado) devemos deslogar o usuario
            if (typeof window !== undefined) {
                //chamar a função para deslogar o usuario
                AuthContext_1.signOut();
            }
            else {
                return Promise.reject(new AuthTokenError_1.AuthTokenError());
            }
        }
        return Promise.reject(error);
    });
    return api;
}
exports.setupApiClient = setupApiClient;
