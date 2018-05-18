import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from './middlewares/promise';
import { reducer as loginReducer } from './login/';
import { reducer as loadingReducer } from './components/loading';
import { reducer as personalReducer } from './personal/';
import { reducer as registReducer } from './regist/';
import { reducer as orderReducer } from './order';
import { reducer as teacherReducer } from './teacher';

const reducer = combineReducers({
    login: loginReducer,
    loading: loadingReducer,
    personal: personalReducer,
    regist: registReducer,
    order: orderReducer,
    teacher: teacherReducer
})

const win = window;

const middlewares = [promiseMiddleware];

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,    //redux devtool 启用
);

export default createStore(reducer, {}, storeEnhancers);