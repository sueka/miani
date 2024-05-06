import { MouseSensor as OrigMouseSensor } from '@dnd-kit/core'

type HandlerFunction = (typeof OrigMouseSensor.activators)[number]['handler']

// Inspired by https://github.com/clauderic/dnd-kit/issues/477#issuecomment-1713536492
export const handler: HandlerFunction = ({ nativeEvent: event }) => {
  if (!(event.target instanceof HTMLElement) && event.target !== null) {
    return false // Anything that is not an HTML element is not a handler.
  }

  let curr = event.target

  while (curr) {
    if (curr.dataset['noDnd']) {
      return false
    }

    curr = curr.parentElement
  }

  return true
}

// biome-ignore lint/complexity/noStaticOnlyClass: For simplicity
export default class MouseSensor extends OrigMouseSensor {
  static override activators = [{ eventName: 'onMouseDown' as const, handler }]
}
