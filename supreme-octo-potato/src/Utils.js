export function grabImages(url) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      try {

        const $doc = $(data);
        const imageTags = $doc.find('img');
        if (!imageTags.length) {
          throw new Error('no images found');
        }

        const miImageTags = imageTags.filter((i, v) => {
          const src = $(v).attr('data-src');
          return src.indexOf('.com/p/rp') > -1;
        });
        if (!miImageTags.length) {
          alert('no mi images found');
          throw new Error('no mi images found');
        }

        const images = $.map(miImageTags, (v, i) => {
          return $(v).attr('data-src');
        });

        this.setState({images});

      } catch(e) {
        console.log(e);
      }

    });
}
