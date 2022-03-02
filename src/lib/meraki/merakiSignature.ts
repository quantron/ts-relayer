////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) Quantron Systems LLC.
//  All Rights Reserved.
//
//  This file is part of the private project.
//  For conditions of distribution and use,
//  please contact sales@quantron-systems.com
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import {TextEncoder} from 'util';

import {encodeSecp256k1Signature} from '@cosmjs/amino';
import {Secp256k1, sha256} from '@cosmjs/crypto';
import _ from 'lodash';

import type {GetHeadersParams} from './merakihttpclient';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function generateSignature(account: any, {url, body}: GetHeadersParams) {
    const encoder = new TextEncoder();
    const urlBytes = encoder.encode(url);
    const dataBytes = encoder.encode(body);
    const hash = sha256(new Uint8Array([...urlBytes, 0, ...dataBytes]));

    const signature = await Secp256k1.createSignature(hash, account.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    return encodeSecp256k1Signature(account.pubkey, signatureBytes);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getRequestSignatureHeaders(accessWallet: any, {url, body}: GetHeadersParams) {
    const accounts = await accessWallet?.getAccountsWithPrivkeys();
    const account = _.first(accounts);

    const signature = await generateSignature(account, {url, body});

    return {
        ['Meraki-PubKey']: signature?.pub_key?.value || '',
        ['Meraki-Signature']: signature?.signature || ''
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {
    getRequestSignatureHeaders,
    GetHeadersParams
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
