// src/types/react-beautiful-dnd.d.ts

declare module 'react-beautiful-dnd' {
  import * as React from 'react'

  export interface DraggableLocation {
    droppableId: string
    index: number
  }

  export interface DropResult {
    draggableId: string
    type: string
    source: DraggableLocation
    reason: 'DROP' | 'CANCEL'
    mode: 'FLUID' | 'SNAP'
    destination?: DraggableLocation | null
    combine?: {
      draggableId: string
      droppableId: string
    } | null
  }

  export interface DraggableProvided {
    innerRef: (element: HTMLElement | null) => void
    draggableProps: {
      style?: React.CSSProperties
      'data-rbd-draggable-context-id': string
      'data-rbd-draggable-id': string
      onTransitionEnd?: React.TransitionEventHandler
    }
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': string
      'data-rbd-drag-handle-context-id': string
      'aria-describedby': string
      role: string
      tabIndex: number
      draggable: boolean
      onDragStart: React.DragEventHandler
    } | null
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean
    isDropAnimating: boolean
    draggingOver: string | null
    dropAnimation: any
    mode: string | null
    combineWith: string | null
    combineTargetFor: string | null
  }

  export interface DraggableProps {
    draggableId: string
    index: number
    isDragDisabled?: boolean
    disableInteractiveElementBlocking?: boolean
    shouldRespectForcePress?: boolean
    children: (
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot,
    ) => React.ReactElement
  }

  export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void
    droppableProps: {
      'data-rbd-droppable-id': string
      'data-rbd-droppable-context-id': string
    }
    placeholder?: React.ReactElement | null
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean
    draggingOverWith: string | null
    draggingFromThisWith: string | null
    isUsingPlaceholder: boolean
  }

  export interface DroppableProps {
    droppableId: string
    type?: string
    mode?: 'standard' | 'virtual'
    isDropDisabled?: boolean
    isCombineEnabled?: boolean
    direction?: 'horizontal' | 'vertical'
    ignoreContainerClipping?: boolean
    renderClone?: any
    getContainerForClone?: () => HTMLElement
    children: (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot,
    ) => React.ReactElement
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void
    onDragStart?: (initial: any) => void
    onDragUpdate?: (initial: any) => void
    children?: React.ReactNode
  }

  export class DragDropContext extends React.Component<DragDropContextProps> {}
  export class Droppable extends React.Component<DroppableProps> {}
  export class Draggable extends React.Component<DraggableProps> {}

  export function resetServerContext(): void
}