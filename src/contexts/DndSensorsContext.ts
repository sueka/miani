import type { SensorDescriptor, SensorOptions } from '@dnd-kit/core'
import React from 'react'

export default React.createContext<SensorDescriptor<SensorOptions>[]>([])
