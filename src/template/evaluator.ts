// src/template/evaluator.ts

import { Evaluator, IAgentRuntime, Memory, State } from '@elizaos/core';
import { EvalContent, EvalResponse } from './types.ts';

export const templateEvaluator: Evaluator = {
  name: 'TEMPLATE_EVALUATOR',
  description: 'Description of what this evaluator validates',
  similes: ['EVAL_TYPE_1', 'VALIDATOR_TYPE_1', 'CHECKER_TYPE_1'],
  examples: [{
    context: 'Example context for validation',
    messages: [{ user: '{{user1}}', content: { text: 'Example content to validate' } }],
    outcome: 'Expected validation outcome'
  }],

  validate: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<boolean> => {
    try {
      const content = message.content as EvalContent;
      return typeof content.text === 'string';
    } catch {
      return false;
    }
  },

  handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<EvalResponse> => {
    try {
      const content = message.content as EvalContent;
      const text = content.text.toLowerCase();

      // Validation logic here
      if (!text.includes('required_field')) {
        return { success: false, response: 'Missing required field' };
      }

      return { success: true, response: 'Validation successful' };
    } catch (error) {
      return { success: false, response: error instanceof Error ? error.message : 'Validation failed' };
    }
  },

  alwaysRun: true
};
