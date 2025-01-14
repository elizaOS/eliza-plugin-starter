// src/template/index.ts

import { Plugin } from '@elizaos/core';
import { templateAction } from './action.ts';
import { templateEvaluator } from './evaluator.ts';

export const templatePlugin: Plugin = {
  name: 'template-plugin',
  description: 'Description of plugin functionality',
  actions: [templateAction],
  evaluators: [templateEvaluator],
  providers: [] // Only add providers array if your plugin needs them
};

export * from './types.ts';

// Optional: Only include these if your plugin needs provider initialization
// import { initializeProvider, provider } from './provider';
// import { ProviderConfig } from './types';
// export const initialize = (config: ProviderConfig): void => {
//   initializeProvider(config);
// };
// providers: [provider]
