
import axios from 'axios';

const requestMiddleware = store => next => action => {
    const _action = { ...action };
    if ( _action.uri) {
        _action.state = 'SENT';
        next(_action);
        const headers = Object.assign(
            {
            },
        );

        const axiosDefinition = {
            method: _action.method || 'GET',
            url: _action.uri,
            headers,
            data: {},
        };

        if (_action.method) {
            axiosDefinition.method =_action.method|| 'GET';
            axiosDefinition.url =_action.uri;
        }


        const config = Object.assign(
            {},
            axiosDefinition,
            _action.axios || {}
        );

        return axios(config)
            .then(response => {
                _action.state ='FINISHED';
                _action.response=response
                next(_action);
                return _action;
            })
            .catch(error => {
                if (error instanceof TypeError || !error.response) {
                    throw error;
                }
                return _action;
            });
    }

    return new Promise(resolve => {
        if (_action.type) { next(_action); }
        resolve();
    });
};


export default [requestMiddleware];
