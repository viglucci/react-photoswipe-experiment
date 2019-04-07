import React, { Component } from 'react';

class ArticleTile extends Component {
  render() {
    const { parentRef, src } = this.props;
    return (
      <div className="ArticleTile ArticleTile--ocho" ref={parentRef}>
        <div className="ArticleTile-content">
          <div className="Tile ArticleTile-tile">
            <div className="Tile-area">
              {/* <img src={src} /> */}
              <div
                className="Tile-bg"
                style={{
                  backgroundImage: `url(${src})`
                }}
              />
              <div className="Tile-content" />
            </div>
          </div>
          <div className="ArticleTile-fade" />
        </div>
      </div>
    );
  }
}

export default ArticleTile;
