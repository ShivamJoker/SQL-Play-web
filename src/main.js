"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("@styles/index.scss");
var App_1 = require("@components/App");
var AppContext_1 = require("@contexts/AppContext");
var virtual_pwa_register_1 = require("virtual:pwa-register");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("./utils/db");
var updateSW = (0, virtual_pwa_register_1.registerSW)({
    onNeedRefresh: function () { },
    onOfflineReady: function () { }
});
react_dom_1["default"].render(<react_1["default"].StrictMode>
    <AppContext_1.AppProvider>
      <App_1["default"] />
      <react_toastify_1.ToastContainer />
    </AppContext_1.AppProvider>
  </react_1["default"].StrictMode>, document.getElementById('root'));
