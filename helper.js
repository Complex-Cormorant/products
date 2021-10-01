const getStyles = (unformatted) => {
  let flags = {};
  let styles = unformatted.filter(item => {
      if (flags[item.style_id]) return false;
      flags[item.style_id] = true;
      return true;
  }).map(item => {
       const {url, thumbnail_url, size, quantity, ...style} = item;
       style.photos = [];
       style.skus = [];
       return style
  })
  return styles
}

const getPhotos = (unformatted, style_id) => {
  let flags = {};
  let photos = unformatted.filter(item => {
      if (flags[item.url] || item.style_id != style_id) return false;
      flags[item.url] = true;
      return true
  }).map(item => {
      const {thumbnail_url, url} = item;
      return {thumbnail_url: thumbnail_url, url: url}
  })
  return photos;
}

const getSkus = (unformatted, style_id) => {
  let flags = {};
  let skus = unformatted.filter(item => {
      if (flags[item.size] || item.style_id != style_id) return false;
      flags[item.size] = true;
      return true;
  }).map(item => {
      let {size, quantity} = item;
      console.log('size', size, 'quantity', quantity)
      return {size: size, quantity: quantity}
  })
  return skus;
}

const fixData = (unformatted) => {
    let styles = getStyles(unformatted);
    for (let i = 0; i < styles.length; i++) {
        let photos = getPhotos(unformatted, styles[i].style_id);
        let skus = getSkus(unformatted, styles[i].style_id);
        styles[i].photos = photos;
        styles[i].skus = skus;
    }
    return styles;
}

module.exports = fixData;