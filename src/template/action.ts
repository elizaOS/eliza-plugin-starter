// src/template/action.ts

import { Action, IAgentRuntime, Memory, State } from '@elizaos/core';
import { provider } from './provider.ts';
import { ActionContent, ProviderData } from './types.ts';

export const templateAction: Action = {
  name: 'TEMPLATE_ACTION',
  description: 'Description of what this action does',
  similes: ['SIMILAR_ACTION_1', 'SIMILAR_ACTION_2', 'ALTERNATIVE_NAME_1'],
  examples: [[{ user: '{{user1}}', content: { text: 'Example user input' } as ActionContent }, {
    user: '{{agentName}}',
    content: { text: 'Example response', action: 'TEMPLATE_ACTION' }
  }]],

  validate: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<boolean> => {
    try {
      const content = message.content as ActionContent;
      return (typeof content.text === 'string' && content.text.toLowerCase().includes('trigger_word'));
    } catch {
      return false;
    }
  },

  handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<string> => {
    try {
      const response = await provider.get(runtime, message, state);

      if (!response.success || !response.data) {
        return `Error message template. ${response.error || ''}`;
      }

      const data: ProviderData = response.data;
      return `Response template using ${data.someField}`;
    } catch (error) {
      return `Error handling template: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
};
