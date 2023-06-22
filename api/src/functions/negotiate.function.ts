import { BaseFunction, binding, functionName } from 'nammatham';
import { inject } from 'inversify';

const bindings = [
  binding.httpTrigger({
    name: 'req' as const,
    authLevel: 'anonymous',
    methods: ['post'],
    route: 'negotiate',
  }),
  binding.http({ name: 'res' as const }),
] as const;

const customBindings = [
  binding.custom({
    name: 'connectionInfo' as const,
    type: 'signalRConnectionInfo',
    direction: 'in',
    connectionStringSetting: 'AzureSignalRConnectionString',
    hubName: 'serverless',
  }),
] as const;

@functionName('negotiate', ...bindings, ...customBindings)
export class NegotiateFunction extends BaseFunction<typeof bindings> {
  public override execute() {
    // Send Azure SignalR connection info to client
    this.context.res.body = this.bindings.connectionInfo;
  }
}
