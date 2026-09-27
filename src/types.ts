export type Effect = "allow" | "deny";
export interface PolicyConditions { amount_lte?: number; amount_gte?: number; equals?: Record<string,unknown>; in?: Record<string,unknown[]>; exists?: string[]; [key:string]:unknown; }
export interface PolicyRule { id:string; effect:Effect; agents?:string[]; actions?:string[]; resources?:string[]; conditions?:PolicyConditions; reason?:string; }
export interface Policy { id:string; version:string; defaultEffect?:Effect; rules:PolicyRule[]; }
export interface AuthorizationRequest { agent:string; action:string; resource:string; context?:Record<string,unknown>; }
export interface Decision { effect:Effect; allowed:boolean; matchedRules:string[]; reasons:string[]; policyId:string; policyVersion:string; }
