import type { Edge } from 'reactflow';
import type { OnboardingNode, Step } from '../store/onboardingStore';

// Sample steps
export const sampleSteps: Step[] = [
  {
    id: 'step1',
    title: 'Setup Development Environment',
    description: 'Install all required tools and software for your development environment',
    phase: 'day1',
    cluster: 'Development environment',
    content: {
      type: 'document',
      url: 'https://confluence.example.com/page/dev-environment-setup'
    },
    status: 'todo'
  },
  {
    id: 'step2',
    title: 'Get GitHub Access',
    description: 'Request access to the company GitHub organization and repositories',
    phase: 'day1',
    cluster: 'Tool Access',
    content: {
      type: 'checklist',
      items: [
        { id: 'item1', text: 'Create GitHub account if you don\'t have one', checked: false },
        { id: 'item2', text: 'Email your GitHub username to IT', checked: false },
        { id: 'item3', text: 'Accept invitation to the organization', checked: false }
      ]
    },
    status: 'todo'
  },
  {
    id: 'step3',
    title: 'Architecture Overview',
    description: 'Learn about the company\'s overall architecture and systems',
    phase: 'day7',
    cluster: 'Company Architecture',
    content: {
      type: 'document',
      url: 'https://confluence.example.com/page/architecture-overview'
    },
    status: 'todo'
  },
  {
    id: 'step4',
    title: 'Connect to CI/CD Pipeline',
    description: 'Set up access to CI/CD pipeline and learn deployment process',
    phase: 'day7',
    cluster: 'CI/CD workflow',
    content: {
      type: 'document',
      url: 'https://confluence.example.com/page/cicd-setup'
    },
    status: 'todo'
  },
  {
    id: 'step5',
    title: 'Team Standup Process',
    description: 'Learn about the team\'s daily standup process and expectations',
    phase: 'day1',
    cluster: 'Team Processes',
    content: {
      type: 'checklist',
      items: [
        { id: 'item1', text: 'Attend first standup meeting', checked: false },
        { id: 'item2', text: 'Set up calendar reminders', checked: false },
        { id: 'item3', text: 'Prepare your first update', checked: false }
      ]
    },
    status: 'todo'
  },
  {
    id: 'step6',
    title: 'Code Review Process',
    description: 'Understand the team\'s code review process and expectations',
    phase: 'day7',
    cluster: 'Team Processes',
    content: {
      type: 'document',
      url: 'https://confluence.example.com/page/code-review-guidelines'
    },
    status: 'todo'
  },
  {
    id: 'step7',
    title: 'Access to Production',
    description: 'Request and set up access to production systems and monitoring',
    phase: 'day21',
    cluster: 'Tool Access',
    content: {
      type: 'checklist',
      items: [
        { id: 'item1', text: 'Submit production access request', checked: false },
        { id: 'item2', text: 'Set up VPN if required', checked: false },
        { id: 'item3', text: 'Configure monitoring tools', checked: false }
      ]
    },
    status: 'todo'
  },
  {
    id: 'step8',
    title: 'Deployment Process',
    description: 'Learn how to deploy code to production environments',
    phase: 'day21',
    cluster: 'CI/CD workflow',
    content: {
      type: 'document',
      url: 'https://confluence.example.com/page/deployment-process'
    },
    status: 'todo'
  }
];

// Sample nodes for the flow based on the steps
export const sampleNodes: OnboardingNode[] = sampleSteps.map((step, index) => ({
  id: step.id,
  type: 'onboardingNode',
  data: { step },
  position: { 
    x: 100 + (index % 4) * 300, 
    y: 100 + Math.floor(index / 4) * 200 
  }
}));

// Sample edges connecting the steps
export const sampleEdges: Edge[] = [
  {
    id: 'edge1-2',
    source: 'step1',
    target: 'step2',
    animated: true,
  },
  {
    id: 'edge2-3',
    source: 'step2',
    target: 'step3',
    animated: true,
  },
  {
    id: 'edge3-4',
    source: 'step3',
    target: 'step4',
    animated: true,
  },
  {
    id: 'edge4-7',
    source: 'step4',
    target: 'step7',
    animated: true,
  },
  {
    id: 'edge5-6',
    source: 'step5',
    target: 'step6',
    animated: true,
  },
  {
    id: 'edge7-8',
    source: 'step7',
    target: 'step8',
    animated: true,
  }
]; 