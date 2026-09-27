import type {AuthorizationRequest,PolicyRule} from "./types.js";

function wildcardMatch(pattern:string,value:string):boolean {
  if(pattern==="*") return true;
  if(!pattern.includes("*")) return pattern===value;
  const escaped=pattern.split("*").map(part=>part.replaceAll(".","\\.")).join(".*");
  return new RegExp("^"+escaped+"$").test(value);
}
function fieldMatches(patterns:string[]|undefined,value:string):boolean {
  return !patterns || patterns.some(pattern=>wildcardMatch(pattern,value));
}
function getPath(obj:Record<string,unknown>,path:string):unknown {
  return path.split(".").reduce<unknown>((current,key)=>{
    if(current && typeof current==="object") return (current as Record<string,unknown>)[key];
    return undefined;
  },obj);
}
export function matchesRule(request:AuthorizationRequest,rule:PolicyRule):boolean {
  if(!fieldMatches(rule.agents,request.agent)) return false;
  if(!fieldMatches(rule.actions,request.action)) return false;
  if(!fieldMatches(rule.resources,request.resource)) return false;
  const context=request.context ?? {};
  const conditions=rule.conditions ?? {};
  if(conditions.amount_lte!==undefined && Number(context.amount)>Number(conditions.amount_lte)) return false;
  if(conditions.amount_gte!==undefined && Number(context.amount)<Number(conditions.amount_gte)) return false;
  for(const [path,expected] of Object.entries(conditions.equals ?? {})) if(getPath(context,path)!==expected) return false;
  for(const [path,allowed] of Object.entries(conditions.in ?? {})) if(!allowed.some(v=>Object.is(v,getPath(context,path)))) return false;
  for(const path of conditions.exists ?? []) if(getPath(context,path)===undefined) return false;
  return true;
}
