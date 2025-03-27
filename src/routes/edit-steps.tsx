import { createFileRoute } from '@tanstack/react-router'
import { EditSteps } from '../pages/edit'

export const Route = createFileRoute('/edit-steps')({
  component: EditSteps,
})
