import {matchesRule} from "./matcher.js";
import type {AuthorizationRequest,Decision,Policy} from "./types.js";

export function authorize(request:AuthorizationRequest,policy:Policy):Decision {
  const matched=policy.rules.filter(rule=>matchesRule(request,rule));
  const denied=matched.filter(rule=>rule.effect==="deny");
  const allowed=matched.filter(rule=>rule.effect==="allow");
  if(denied.length) return {effect:"deny",allowed:false,matchedRules:matched.map(r=>r.id),reasons:denied.map(r=>r.reason ?? "Denied by rule "+r.id),policyId:policy.id,policyVersion:policy.version};
  if(allowed.length) return {effect:"allow",allowed:true,matchedRules:matched.map(r=>r.id),reasons:allowed.map(r=>r.reason ?? "Allowed by rule "+r.id),policyId:policy.id,policyVersion:policy.version};
  const effect=policy.defaultEffect ?? "deny";
  return {effect,allowed:effect==="allow",matchedRules:[],reasons:["No policy rule matched the request"],policyId:policy.id,policyVersion:policy.version};
}
