import {
  DndContext as OrigDndContext,
  type DndContextProps,
} from '@dnd-kit/core'
import { useContext, useMemo } from 'react'
import DndSensorsContext from '../../contexts/DndSensorsContext'

// <DndContext> that propagates sensors.
const DndContext: React.FC<DndContextProps> = ({
  sensors,
  children,
  ...props
}) => {
  const currentSensors = useContext(DndSensorsContext)
  const newSensors = useMemo(
    () => sensors ?? currentSensors,
    [sensors, currentSensors],
  )

  // NOTE: Don’t swap the order of <OrigDndContext> and <DndSensor>. If you do so, <OrigDndContext> will be re-rendered for each newSensors changes.
  return (
    <OrigDndContext sensors={newSensors} {...props}>
      <DndSensorsContext.Provider value={newSensors}>
        {children}
      </DndSensorsContext.Provider>
    </OrigDndContext>
  )
}

export default DndContext
