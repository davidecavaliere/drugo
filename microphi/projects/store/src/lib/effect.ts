import { getDebugger } from '@microgamma/loggator';
import { Subscription } from 'rxjs';


/**
 * Should hijack the decorated method so that the returned observable is piped
 * @param onAction
 * @param dispatchAction
 * @param errorAction
 */
export function Effect(onAction: string, dispatchAction: string, errorAction: string) {

  // const subscriptions: Subscription[] = [];

  return (target, key, descriptor) => {

    const d = getDebugger(`microphi:@Effect:${target.constructor.name}:${key}`);

    d('decorating', target.constructor.name, ':', key);

    const effects = Reflect.getMetadata('@Effect', target) || {};

    const effectsForThisAction = effects[onAction] || [];
    effectsForThisAction.push(key);

    effects[onAction] = effectsForThisAction;



    // originalFn should return an observable
    const originalFn = descriptor.value;
    //
    descriptor.value = function(...args) {

      d(`running Effect for ${key} with`, args);

      // subscriptions.push(
        originalFn.apply(this, args).subscribe((resp) => {
          // pass response down triggering type to alert data arrived
          d('got data', resp);
          this.dispatch(dispatchAction, resp);
        }, (err) => {
          // dispatch type with error
          d('got error', err);
          this.dispatch(`${errorAction}`, err);

        })
      // );

      // d('total subscriptions', subscriptions);
      // subscriptions.forEach((sub) => {
      //   if (!sub.closed) {
      //     d('subscriptions active', sub);
      //   }
      //
      // });
    };

    return Reflect.defineMetadata('@Effect', effects, target);
  }
}
