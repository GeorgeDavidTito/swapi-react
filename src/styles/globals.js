import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

const fontFamily = 'Source Sans Pro, sans-serif'

const globalStyle = createGlobalStyle`
    ${styledNormalize}

    html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    }

    *, *:before, *:after {
    box-sizing: inherit;
    }

    body {
    padding: 0;
    font-family: ${fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    }

    html, body{
        height: 100%;
        margin: 0;
    }

    #root{
      height: 100%;
    }

    input, textarea, select, button {
    font-family: ${fontFamily};
    }

    button,
    a {
        &:hover {
            cursor: pointer;
        }
    }
`

export default globalStyle
