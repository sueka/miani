import { TouchSensor as OrigTouchSensor } from '@dnd-kit/core'
import { handler } from './MouseSensor'

// biome-ignore lint/complexity/noStaticOnlyClass: Same as in ./MouseSensor.ts
export default class TouchSensor extends OrigTouchSensor {
  static override activators = [{ eventName: 'onTouchStart' as const, handler }]
}
