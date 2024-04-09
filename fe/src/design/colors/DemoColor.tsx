import { newTheme, Theme } from 'src/design/colors/index.ts';
import Palette from 'src/design/colors/Palette.tsx';
import Color from 'colorjs.io';
import { Component } from 'react';

class MainSidebar extends Component<{ theme: Theme }> {
  render() {
    return (
      <div
        style={{
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          borderRightColor: this.props.theme.borders.secondary,
          padding: 4,
          minWidth: 160,
          minHeight: '100%',
          background: this.props.theme.bg.secondary,
        }}
      >
        <p style={{ color: this.props.theme.fg.primary }}>Primary sidebar</p>
      </div>
    );
  }
}

class Content extends Component<{ theme: Theme }> {
  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          padding: 4,
          minHeight: '100%',
          background: this.props.theme.bg.primary,
        }}
      >
        <p style={{ color: this.props.theme.fg.primary }}>Content</p>
        <p style={{ color: this.props.theme.fg.secondary }}>Secondary text</p>
        <p style={{ color: this.props.theme.fg.tertiary }}>Tertiary text</p>
      </div>
    );
  }
}

class SubSidebar extends Component<{ theme: Theme }> {
  render() {
    return (
      <div
        style={{
          minWidth: 100,
          padding: 4,
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          borderLeftColor: this.props.theme.borders.tertiary,
          minHeight: '100%',
          background: this.props.theme.bg.tertiary,
        }}
      >
        <p style={{ color: this.props.theme.fg.primary }}>2nd sidebar</p>
        <p style={{ color: this.props.theme.fg.secondary }}>Secondary text</p>
        <p style={{ color: this.props.theme.fg.tertiary }}>Tertiary text</p>
      </div>
    );
  }
}

function MockApp() {
  const theme = newTheme({
    bg: new Color('#F9F9F9'),
    fg: new Color('blue'),
  });
  return (
    <div
      style={{
        borderRadius: 4,
        border: `1px solid ${theme.borders.primary}`,
        padding: 1,
        display: 'flex',
        flexDirection: 'row',
        background: theme.bg.primary,
        color: theme.fg.primary,
        flexGrow: 1,
        minHeight: 600,
      }}
    >
      <MainSidebar theme={theme} />
      <Content theme={theme} />
      <SubSidebar theme={theme} />
    </div>
  );
}

const Mock = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          background: 'white',
        }}
      >
        <MockApp />
      </div>

      <Palette color={'blue'} />
      <Palette color={'red'} />
      <Palette color={'orange'} />
      <Palette color={'gray'} />
      <hr />
    </div>
  );
};

export default Mock;
