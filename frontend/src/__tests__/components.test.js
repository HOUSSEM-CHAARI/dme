import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge, Button, Input, Alert, Avatar, Card, EmptyState } from '../components/ui';

// ── Badge ────────────────────────────────────────────────────
describe('Badge component', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies blue variant by default', () => {
    const { container } = render(<Badge>Test</Badge>);
    const span = container.querySelector('span');
    expect(span).toHaveStyle({ background: '#E6F1FB', color: '#0C44A0' });
  });

  it('applies green variant correctly', () => {
    const { container } = render(<Badge variant="green">OK</Badge>);
    const span = container.querySelector('span');
    expect(span).toHaveStyle({ background: '#EAF3DE', color: '#0F6E56' });
  });

  it('applies red variant correctly', () => {
    const { container } = render(<Badge variant="red">Danger</Badge>);
    const span = container.querySelector('span');
    expect(span).toHaveStyle({ background: '#FCEBEB', color: '#E24B4A' });
  });

  it('renders with large size', () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    const span = container.querySelector('span');
    expect(span).toHaveStyle({ fontSize: 13 });
  });
});

// ── Button ───────────────────────────────────────────────────
describe('Button component', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    const { container } = render(<Button loading>Saving</Button>);
    const spinner = container.querySelector('span[style]');
    expect(spinner).toBeInTheDocument();
  });

  it('renders secondary variant', () => {
    const { container } = render(<Button variant="secondary">Cancel</Button>);
    const btn = container.querySelector('button');
    expect(btn).toHaveStyle({ background: 'transparent' });
  });
});

// ── Input ────────────────────────────────────────────────────
describe('Input component', () => {
  it('renders with label', () => {
    render(<Input label="Email" placeholder="test@test.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test@test.com')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input label="Email" error="Email invalide" />);
    expect(screen.getByText('Email invalide')).toBeInTheDocument();
  });

  it('calls onChange handler', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    await userEvent.type(screen.getByPlaceholderText('Type here'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies red border on error', () => {
    const { container } = render(<Input error="Required" />);
    const input = container.querySelector('input');
    expect(input).toHaveStyle({ border: '1px solid #E24B4A' });
  });
});

// ── Alert ────────────────────────────────────────────────────
describe('Alert component', () => {
  it('renders message', () => {
    render(<Alert variant="error">Something went wrong</Alert>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders success variant', () => {
    const { container } = render(<Alert variant="success">Saved!</Alert>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ background: '#EAF3DE', color: '#0F6E56' });
  });

  it('renders warning variant', () => {
    const { container } = render(<Alert variant="warning">Warning!</Alert>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ background: '#FAEEDA' });
  });
});

// ── Avatar ───────────────────────────────────────────────────
describe('Avatar component', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Marie Dupont" />);
    expect(screen.getByText('MD')).toBeInTheDocument();
  });

  it('handles single name', () => {
    render(<Avatar name="Admin" />);
    expect(screen.getByText('AD')).toBeInTheDocument();
  });

  it('renders with default size 36', () => {
    const { container } = render(<Avatar name="Test User" />);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: 36, height: 36 });
  });

  it('renders with custom size', () => {
    const { container } = render(<Avatar name="Test User" size={56} />);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: 56, height: 56 });
  });
});

// ── Card ─────────────────────────────────────────────────────
describe('Card component', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    const { container } = render(<Card>X</Card>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ background: '#fff', borderRadius: 14 });
  });

  it('merges custom style', () => {
    const { container } = render(<Card style={{ marginTop: 20 }}>X</Card>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ marginTop: 20 });
  });
});

// ── EmptyState ───────────────────────────────────────────────
describe('EmptyState component', () => {
  it('renders title and message', () => {
    render(<EmptyState icon="📋" title="No items" message="Nothing here yet." />);
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
    expect(screen.getByText('📋')).toBeInTheDocument();
  });

  it('renders without message', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});
