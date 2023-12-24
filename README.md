# @m7kra/color-theme

React hooks that make color theme management easy

## What?

When styling a react app, it's handy to detect the system's color theme and adapt the UI accordingly. On the other, hand, you'll want to give the user the option to override the system's theme and choose their own. This package provides hooks that make it easy to do both.

You can set choose you theme from `light`, `dark` or `system`. The package will resolve that to `light` or `dark` and use that. Changes to the system theme will be refleted in you app without the need to reload.

## Installation

```bash
npm install @m7kra/color-theme
```

## Usage

The simplest way to use this package is to use a standalone hook. This will give you the current theme and a function to set it. Here's an example:

```js
import { useColorTheme } from '@m7kra/color-theme';

function App() {
    const [theme, setTheme] = useColorTheme('dark');

    return (
        <div className={theme}>
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('system')}>System</button>
        </div>
    );
};
```

However, you probably want to use the theme in multiple places in your app. In that case, you can use the `ColorThemeProvider` component. This will make the theme available to all child components via the `useContextColorTheme` hook.

```js
import { ColorThemeProvider, useContextColorTheme } from '@m7kra/color-theme';

function App() {
    return (
        <ColorThemeProvider>
            <ChildComponent1 />
            <ChildComponent2 />
        </ColorThemeProvider>
    );
};

function ChildComponent1() {
    const [theme, setTheme] = useContextColorTheme();

    return (
        <div className={theme}>
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('system')}>System</button>
        </div>
    );
};

function ChildComponent2() {
    const [theme] = useContextColorTheme();

    return (
        <div className={theme}>
            <p>Current theme: {theme}</p>
        </div>
    );
};
```

## API

### `function useColorTheme(defaultTheme: ColorTheme = 'system')`

Returns the current theme and a function to set it. The `defaultTheme` argument is optional and defaults to `system`.

### `function ColorThemeProvider(props: ColorThemeProviderProps)`

A component that makes the theme available to all child components via the `useContextColorTheme` hook. The `ColorThemeProviderProps` can include a `defaultTheme` property that defaults to `system`.

### `function useContextColorTheme()`

Returns the current theme and a function to set it.
