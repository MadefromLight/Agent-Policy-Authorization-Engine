import test from "node:test";
import assert from "node:assert/strict";
import {authorize} from "../src/index.js";
import type {Policy} from "../src/types.js";
const policy:Policy={id:"payments",version:"1",rules:[
{id:"small-payment",effect:"allow",agents:["billing-agent"],actions:["payment.create"],resources:["merchant:*"],conditions:{amount_lte:50}},
{id:"block-high-risk",effect:"deny",agents:["billing-agent"],actions:["payment.create"],resources:["merchant:risky"]}
]};
test("allows matching low-value action",()=>assert.equal(authorize({agent:"billing-agent",action:"payment.create",resource:"merchant:acme",context:{amount:25}},policy).allowed,true));
test("defaults to deny",()=>assert.equal(authorize({agent:"unknown",action:"payment.create",resource:"merchant:acme",context:{amount:25}},policy).allowed,false));
test("explicit deny overrides allow",()=>{const d=authorize({agent:"billing-agent",action:"payment.create",resource:"merchant:risky",context:{amount:25}},policy);assert.equal(d.allowed,false);});
