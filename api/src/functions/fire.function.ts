import { BaseFunction, binding, functionName } from 'nammatham';
import { inject } from 'inversify';

const bindings = [
  binding.httpTrigger({
    name: 'req' as const,
    authLevel: 'anonymous',
  }),
  binding.http_withReturn(),
] as const;

const customBindings = [
  binding.custom({
    type: 'signalR',
    name: 'signalRMessages',
    hubName: 'serverless',
    connectionStringSetting: 'AzureSignalRConnectionString',
    direction: 'out',
  }),
] as const;

@functionName('fire', ...bindings, ...customBindings)
export class FireFunction extends BaseFunction<typeof bindings> {
  public override execute(): binding.inferReturn<typeof bindings> {
    // Send message to all clients
    this.bindings.signalRMessages = [
      {
        target: 'newMessage',
        arguments: [
          `Hello from FireFunction! ${new Date().toISOString()}`,
        ],
      },
    ];
    return {
      body: 'Hello from FireFunction!',
    };
  }
}
