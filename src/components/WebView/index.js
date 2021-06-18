/** @format */

import React, { PureComponent } from 'react';
import { View, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { fontSizeSet, colorSet } from '../../AppStyles';
// import { log } from '../../utils/Omni';

const { width, height, scale } = Dimensions.get('window');

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const html = this.props.html;
    const { textColor, fontSize } = this.props;
    const color = textColor || colorSet.Text;
    const fSize = fontSize || fontSizeSet.subNormal;

    const tagsStyles = {
      p: { margin: 0, marginBottom: 10, padding: 0, color, fontSize: fSize },
      li: { color },
    };

    let htmlContent = html;
    if (html.indexOf('<table') >= 0) {
      const tableStyle = `<style>
      table { font-size: ${scale * 11}px; max-width: ${scale * width}px; }
      tr { margin: 0 }
      td {
        border: 1px solid black;
        margin: 0;
      }
      td table td { border: none; }</style>`;
      htmlContent = `<iframe height="${height /
        scale}" srcdoc="${tableStyle} ${htmlContent}"></iframe>`;
    }

    return (
      <View style={{ padding: 10 }}>
        <HTML
          html={`${htmlContent}<div style="width: ${width - 40}"></div>`}
          tagsStyles={tagsStyles}
          renderers={{
            img: htmlAttribs => {
              const { src, width, height } = htmlAttribs;
              if (!src) {
                return false;
              }
              const newWidth = Dimensions.get('window').width - 20;
              const newHeight = (height * newWidth) / width;
              return (
                <Image
                  source={{ uri: src }}
                  style={{
                    width: newWidth,
                    height: newHeight,
                    resizeMode: 'contain',
                  }}
                />
              );
            },
          }}
        />
      </View>
    );
  }
}
