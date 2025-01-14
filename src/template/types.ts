// src/template/types.ts

import { Content } from '@elizaos/core';

export interface ProviderConfig {
  required: { field: string };
  optional?: { field?: string };
}

export interface ProviderData {
  someField: string;
  optionalField?: string;
}

export interface ActionContent extends Content {
  text: string;
}

export interface EvalContent extends Content {
  text: string;
}

export interface EvalResponse {
  success: boolean;
  response: string;
}

export interface ProviderResponse {
  success: boolean;
  data?: ProviderData;
  error?: string;
}
