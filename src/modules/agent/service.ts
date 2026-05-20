import { Agent } from "@mastra/core/agent";

const agent = new Agent({
  id: "my-agent",
  name: "My Agent",
  instructions: "You are a helpful assistant",
  model: "deepseek/deepseek-reasoner",
});

export async function generateAgentMessage(prompt: string) {
  return agent.generate(prompt);
}
