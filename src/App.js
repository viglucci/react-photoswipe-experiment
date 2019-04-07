import 'react-photoswipe/lib/photoswipe.css';
import React, { Component, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { PhotoSwipeGallery } from 'react-photoswipe';
import ArticleTile from './ArticleTile';
import Rect, { useRect } from '@reach/rect';

const LightBox = () => {
  return (
    <div
      className="Lightbox Lightbox--video"
      data-thumb="//bnetcmsus-a.akamaihd.net/cms/gallery/W667UH2UXTYF1533270195847.jpg"
      data-video="https://www.youtube.com/watch?v=aW_h0qf9vpA"
    >
      <div className="Lightbox-back" title="Back">
        <div className="List">
          <div className="List-item">
            <span className="Icon Icon--back Icon--small Lightbox-icon" />
          </div>
          <div className="List-item">
            <div className="Lightbox-back-text">Back</div>
          </div>
        </div>
      </div>
      <div className="Lightbox-close pswp__close" title="Close (Esc)">
        <span className="Icon Icon--close Icon--small Lightbox-icon" />
      </div>
      <div className="Lightbox-content" />
      <iframe
        className="Lightbox-video"
        src="https://www.youtube.com/embed/gYo8SH63EHU"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="1"
      />
    </div>
  );
};

const items = [
  {
    src: '//bnetcmsus-a.akamaihd.net/cms/gallery/4NX2VS7NTGGM1539125914249.jpg',
    w: 2550,
    h: 1440,
    title: 'Image 1'
  },
  {
    src: '//bnetcmsus-a.akamaihd.net/cms/gallery/WB5461WFD3XF1539118170712.jpg',
    w: 2550,
    h: 1440,
    title: 'Image 2'
  },
  {
    src: '//bnetcmsus-a.akamaihd.net/cms/gallery/5RJ1IMMOU99B1539119521749.jpg',
    w: 2550,
    h: 1440,
    title: 'Image 3'
  },
  {
    html: renderToString(<LightBox />)
  }
];

class App extends Component {
  state = {
    items
  };

  onGalleryItemRectChange = (rect, item) => {
    const items = this.state.items;
    const index = items.indexOf(item);
    items[index].rect = JSON.parse(JSON.stringify(rect));
    this.setState({
      items: [...items]
    });
  };

  getThumbnailContent = (item) => {
    return (
      <Rect
        observe={true}
        onChange={(rect) => this.onGalleryItemRectChange(rect, item)}
      >
        {({ rect, ref }) => (
          <div ref={ref}>
            <ArticleTile {...item} parentRef={ref} />
          </div>
        )}
      </Rect>
    );
  };

  getThumbBoundsFn = (itemIndex) => {
    const { rect } = this.state.items[itemIndex];
    const pageYScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const bounds = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    return bounds;
  };

  render() {
    return (
      <div className="layout-page">
        <main className="layout-main">
          <div className="container">
            <h2>PhotoSwipeGallery</h2>
            <hr />
            <PhotoSwipeGallery
              items={this.state.items}
              thumbnailContent={this.getThumbnailContent}
              options={{
                getThumbBoundsFn: this.getThumbBoundsFn
              }}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
