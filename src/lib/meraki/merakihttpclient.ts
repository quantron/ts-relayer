
import {isJsonRpcErrorResponse, parseJsonRpcResponse} from '@cosmjs/json-rpc';
import type {JsonRpcRequest, JsonRpcSuccessResponse} from '@cosmjs/json-rpc'
import axios from 'axios';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function http(method: 'GET' | 'POST', url: string, body: any, headers: Headers) {
    return axios.request({url, method, data: body, headers}).then((res) => res.data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type Headers = {[key: string]: string};
type GetHeadersParams = {url: string, body?: string};
type GetHeaders = (params: GetHeadersParams) => Promise<Headers>;
type Options = {
    getHeaders?: GetHeaders;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function defaultGetHeaders(_: GetHeadersParams): Promise<Headers> {
    return Promise.resolve({});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MerakiHttpClient {
    url: string;
    getHeaders: GetHeaders;

    constructor(url: string, options: Options) {
        this.url = url;
        this.getHeaders = options?.getHeaders || defaultGetHeaders;
    }
    disconnect() {
        // nothing to be done
    }
    async get(url: string) {
        const headers = await this.getHeaders({url});
        console.log('GET', this.url, url);
        return await http('GET', this.url + url, undefined, headers);
    }
    async post(url: string, params: JsonRpcRequest['params']) {
        const body = JSON.stringify(params);
        console.log('POST', this.url);
        const headers = await this.getHeaders({url: url || '/', body});
        return await http('POST', this.url + url, params, headers);
    }

    async execute(request: JsonRpcRequest) : Promise<JsonRpcSuccessResponse> {
        const body = request ? JSON.stringify(request) : undefined;
        console.log('execute', this.url, body);
        const headers = await this.getHeaders({
            url: '/',
            body
        });
        const response = await http('POST', this.url, request, headers);    
        
        const jsonrpcResponse = parseJsonRpcResponse(response);
        if(isJsonRpcErrorResponse(jsonrpcResponse)) {
            throw new Error(JSON.stringify(jsonrpcResponse.error));
        }
        return jsonrpcResponse;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default MerakiHttpClient;
export {
    GetHeadersParams
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
