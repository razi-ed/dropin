import { createFileRoute } from '@tanstack/react-router'
import { EditFlow } from '../pages/edit'

export const Route = createFileRoute('/edit-flow')({
  component: EditFlow,
})

