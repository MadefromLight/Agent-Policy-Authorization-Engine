import {readFile} from "node:fs/promises";
import {authorize} from "./authorize.js";
import type {AuthorizationRequest,Policy} from "./types.js";
const [policyPath,requestJson]=process.argv.slice(2);
if(!policyPath || !requestJson){console.error("Usage: npm start -- policy.json '<request-json>'");process.exit(1);}
const policy=JSON.parse(await readFile(policyPath,"utf8")) as Policy;
const request=JSON.parse(requestJson) as AuthorizationRequest;
console.log(JSON.stringify(authorize(request,policy),null,2));
