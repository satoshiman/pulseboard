# Antipatterns

## React Antipatterns

### 1. Prop Drilling

**Problem:** Passing props through multiple component layers to reach a deeply nested child.

**Solution:** Use context API, state management (Redux, Zustand), or component composition.

### 2. useEffect for Everything

**Problem:** Using useEffect for data transformations, computations, or event handlers that should be in render or event handlers.

**Solution:** Move derived state to render, use useMemo for expensive computations, keep event handlers as regular functions.

### 3. Massive Components

**Problem:** Components that handle too many responsibilities (UI, logic, data fetching, state management).

**Solution:** Split into smaller, focused components. Separate presentational from container components.

### 4. Anonymous Functions in Props

**Problem:** Creating new function instances on every render when passing to child components.

```tsx
// Bad
<Button onClick={() => handleClick(id)} />

// Good
const handleClick = useCallback(() => {
  // handle click
}, [id])
<Button onClick={handleClick} />
```

### 5. Direct State Mutation

**Problem:** Mutating state directly instead of creating new references.

```tsx
// Bad
state.items.push(newItem);
setState(state);

// Good
setState((prev) => ({ ...prev, items: [...prev.items, newItem] }));
```

## TypeScript Antipatterns

### 1. Excessive Use of `any`

**Problem:** Using `any` bypasses type checking and defeats TypeScript's purpose.

**Solution:** Use specific types, `unknown` for truly dynamic data, or proper type guards.

### 2. Type Assertions Over Type Guards

**Problem:** Using `as` to force types instead of proper type checking.

**Solution:** Use type guards, discriminators, or proper type narrowing.

### 3. Missing Return Types

**Problem:** Relying on type inference for function return types in public APIs.

**Solution:** Explicitly declare return types for exported functions and methods.

## State Management Antipatterns

### 1. Global State for Local State

**Problem:** Storing component-specific state in global state management.

**Solution:** Keep local state in components, use global state only for shared data.

### 2. Unnecessary Re-renders

**Problem:** Causing unnecessary re-renders by not memoizing or optimizing component updates.

**Solution:** Use React.memo, useMemo, useCallback, and proper dependency arrays.

### 3. State Synchronization

**Problem:** Keeping multiple state sources in sync manually.

**Solution:** Use single source of truth or derived state patterns.

## Performance Antipatterns

### 1. Inline Object/Array Creation in Dependencies

**Problem:** Creating new objects/arrays in dependency arrays causing infinite loops.

```tsx
// Bad
useEffect(() => {
  // effect
}, [config]); // config is a new object every render

// Good
const config = useMemo(() => ({ id: 1 }), []);
useEffect(() => {
  // effect
}, [config]);
```

### 2. Large Bundle Sizes

**Problem:** Importing entire libraries when only using a small portion.

**Solution:** Use tree-shaking, import specific functions, or use lighter alternatives.

### 3. Unoptimized Lists

**Problem:** Rendering large lists without virtualization or key optimization.

**Solution:** Use proper keys, virtualization for long lists, pagination, or infinite scroll.

## Code Organization Antipatterns

### 1. God Components

**Problem:** Single component handling multiple unrelated features.

**Solution:** Split by feature, use composition, and follow single responsibility principle.

### 2. Tight Coupling

**Problem:** Components depending on specific implementation details of other components.

**Solution:** Use props, context, or events for communication. Keep components loosely coupled.

### 3. Inconsistent File Structure

**Problem:** Random file organization making code hard to find.

**Solution:** Follow consistent structure (e.g., feature-based, type-based, or domain-driven).

## Testing Antipatterns

### 1. Testing Implementation Details

**Problem:** Testing internal implementation rather than behavior.

**Solution:** Test user-facing behavior and outcomes, not implementation details.

### 2. Fragile Tests

**Problem:** Tests that break on minor refactors due to tight coupling to implementation.

**Solution:** Focus on testing contracts and public APIs, use meaningful assertions.

### 3. Mocking Everything

**Problem:** Over-mocking leads to tests that don't verify real behavior.

**Solution:** Mock only external dependencies, integrate with real implementations when possible.
