import { createFileRoute } from '@tanstack/react-router'
import { Edit } from '../pages/edit'

export const Route = createFileRoute('/edit')({
  component: Edit,
})

